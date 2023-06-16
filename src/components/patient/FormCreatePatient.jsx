import {
    Radio,
    Modal,
    Form,
    DatePicker,
    Input,
    Select,
    Row,
    Col
} from "antd";
import listAdress from "../../assets/address.json";
import ImageUpload from "../ImageUpload";
import { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";
import uploadImageApi from "../../api/uploadImageApi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const { Option } = Select;

function disabledDate(current) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = current.startOf('day');
    if (selectedDate.isAfter(today) || today.getFullYear() - selectedDate.toDate().getFullYear() > 100) {
        return true;
    }
    return false;
}

function FormCreatePatient(props) {
    const [citySelected, setCitySelected] = useState();
    const [districtSelected, setDistrictSelected] = useState();
    const [wardSelected, setWardSelected] = useState();
    const [form] = Form.useForm();
    const [image, setImage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();


    const resetForm = () => {
        setCitySelected(null);
        setDistrictSelected(null);
        setWardSelected(null);
        setImage(null);
        form.resetFields();
    };

    useEffect(() => {
        setDistrictSelected(null);
        form.setFieldsValue({ "district": null })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [citySelected])

    useEffect(() => {
        setWardSelected(null);
        form.setFieldsValue({ "ward": null })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [districtSelected])

    useEffect(() => {
        if (!props.isModalOpen) {
            resetForm();
        }
        // eslint-disable-next-line
    }, [props.isModalOpen])


    //Request API to create new user when form submit 
    const handleOk = async () => {
        try {
            setIsLoading(true);
            var data = form.getFieldValue()
            data.roleName = "ROLE_PATIENT"
            console.log(data);
            var res = await userApi.addUser(data);
            setIsLoading(false);
            toast.success(res.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            props.setIsModalOpen(false);
            history.go(0)
        } catch (err) {
            setIsLoading(false);
            toast.error(err.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }

    };

    const uploadImage = async () => {
        try {
            const url = await uploadImageApi.upload(image);
            form.setFieldsValue({ image: url });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {isLoading && <LoadingSpinner />}
            <Modal title="Create patient"
                visible={props.isModalOpen}
                onOk={() => {
                    console.log(image);
                    form.validateFields().then(async() => {
                        if (image) await uploadImage();
                        handleOk()
                    });
                }}
                width={800}
                onCancel={() => props.setIsModalOpen(false)}>
                <Form
                    form={form}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    layout="vertical"

                >
                    <Row>
                        <Col span={10} offset={1}>
                            <Form.Item name="fullName" label="Name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    {
                                        type: 'string',
                                        min: 6,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="email" label="Email"
                                rules={[{ required: true },
                                {
                                    type: 'email',
                                },
                                {
                                    pattern: /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: 'Email format wrong',
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Phone" name="phoneNumber"
                                rules={[{ required: true },
                                {
                                    type: 'string',
                                    len: 10
                                }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Password"
                                rules={[{ required: true },
                                { type: 'string', min: 6 }]}
                            >
                                <Input value={"Abcd123@"} disabled />
                            </Form.Item>
                            <Form.Item style={{ display: "flex" }}>
                                <Form.Item label="Dob" name="birthDay"
                                    rules={[
                                        {
                                            required: true,
                                        }]
                                    }
                                >
                                    <DatePicker className="ant-input" style={{ display: 'flex', alignItems: 'center', width: '100%' }}
                                        disabledDate={disabledDate}
                                    />

                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="Gender" name="gender"
                                rules={[{ required: true }]}
                            >
                                <Radio.Group>
                                    <Radio value={true}> Male </Radio>
                                    <Radio value={false}> FeMale </Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={10} offset={2}>
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
                            {wardSelected && <Form.Item name="address" label="Street" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>}
                            <Form.Item name="image" label="Avatar">
                                <ImageUpload image={image} setImage={setImage} currentImage={null} />
                            </Form.Item>
                        </Col>
                    </Row>


                </Form>
            </Modal>
        </div>
    );
}

export default FormCreatePatient;