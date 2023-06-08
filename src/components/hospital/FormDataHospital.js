import { useEffect, useState } from "react";
import {
    Input,
    Form,
    Select,
    Modal
} from "antd";
import ImageUpload from "../ImageUpload";
import hospitalApi from "../../api/hospitalApi";
import listAdress from "../../assets/address.json";
import uploadImageApi from "../../api/uploadImageApi";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


const { Option } = Select;




function FormDataHospital(props) {
    const [citySelected, setCitySelected] = useState();
    const [districtSelected, setDistrictSelected] = useState();
    const [wardSelected, setWardSelected] = useState();
    const [form] = Form.useForm();
    const [image, setImage] = useState();
    const [isGetDataForEdit, setIsGetDataForEdit] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const resetForm = () => {
        setCitySelected(null);
        setDistrictSelected(null);
        setWardSelected(null);
        form.resetFields();
    }

    useEffect(() => {
        if (props.item) {
            form.setFieldsValue(props.item);
            const city = listAdress.find(city => city.name === props.item?.city);
            const district = city?.districts.find(d => d.name === props.item?.district);
            setCitySelected(city);
            setDistrictSelected(district);
            setWardSelected(props.item?.ward);
            setIsGetDataForEdit(true);
        } else {
            resetForm();
        }
    }, [props.item]);

    useEffect(() => {
        if (!props.isShowForm) {
            setImage(null);
            setCitySelected(null);
            setDistrictSelected(null);
            setWardSelected(null);
            form.resetFields();
        }
    }, [props.isShowForm])

    useEffect(() => {
        if (!isGetDataForEdit) {
            setDistrictSelected(null);
            form.setFieldsValue({ "district": null })
        }
    }, [citySelected])

    useEffect(() => {
        if (isGetDataForEdit) {
            setIsGetDataForEdit(false);
        } else {
            setWardSelected(null);
            form.setFieldsValue({ "ward": null })
        }
    }, [districtSelected])

    const onAdd = async () => {
        const formData = form.getFieldsValue();
        hospitalApi.addHospital(formData).then((response) => {
            toast.success(response.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setIsLoading(false);
            resetForm();
            props.setIsShowForm(false)
            props.setIsAdding(false);
            props.getRecords();
        }).catch((error) => {
            setIsLoading(false);
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        });

    };
    const onEdit = async () => {
        const formData = form.getFieldsValue();
        formData.id = props.item.id;
        await hospitalApi.updateHospital(formData).then((response) => {
            toast.success(response.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            props.getRecords();
        }).catch((error) => {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        });
        setIsLoading(false);
        props.setIsShowForm(false)
        props.setIsEditing(false);
    };

    const uploadImage = async () => {
        try {
            const url = await uploadImageApi.upload(image);
            form.setFieldsValue({ imageUrl: url });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {isLoading && <LoadingSpinner />}
            <Modal forceRender

                title={props.isAdding ? "Add Hospital" : "Edit Hospital"}
                visible={props.isShowForm}
                okText="Submit"
                onCancel={() => {
                    props.setIsShowForm(false); props.setIsAdding(false); props.setIsEditing(false);
                    setCitySelected(null); setDistrictSelected(null); setWardSelected(null);
                }}
                onOk={() => {
                    form.validateFields().then(async () => {
                        setIsLoading(true);
                        if (image) await uploadImage();
                        props.isAdding ? onAdd() : onEdit();
                    });
                }}
            >
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 19 }}
                    layout="horizontal"
                >
                    {props.isEditing && <Form.Item name="id" label="Id" rules={[{ required: true }]}>
                        <Input disabled />
                    </Form.Item>}

                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="city" label="City" rules={[{ required: true }]}>
                        <Select
                            showSearch
                            placeholder="Select city"
                            allowClear
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            onChange={(value) => setCitySelected(listAdress.find(a => a.name === value))}
                        >
                            {listAdress?.map((city) => (
                                <Option value={city.name}
                                    key={city.code}
                                    label={city.name}>
                                    {city.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {citySelected && (<Form.Item name="district" label="District" rules={[{ required: true }]}>
                        <Select
                            showSearch
                            placeholder="Select district"
                            allowClear
                            optionFilterProp="children"
                            onChange={(value) => setDistrictSelected(citySelected.districts.find(a => a.name === value))}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {citySelected.districts?.map((districts) => (
                                <Option value={districts.name} key={districts.code} label={districts.name}>
                                    {districts.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>)}
                    {districtSelected && (<Form.Item name="ward" label="Ward" rules={[{ required: true }]}>
                        <Select
                            showSearch
                            placeholder="Select ward"
                            allowClear
                            onChange={(value) => setWardSelected(value)}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {districtSelected.wards?.map((ward) => (
                                <Option value={ward.name} key={ward.code} label={ward.name}>
                                    {ward.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>)}
                    {wardSelected && <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>}

                    <Form.Item name="imageUrl" label="Image">
                        <ImageUpload image={image} setImage={setImage} currentImage={props.item ? props.item?.imageUrl : null} />
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
}

export default FormDataHospital;