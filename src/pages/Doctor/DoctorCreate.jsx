import { useEffect, useState } from "react";

import {
    Row,
    Col,
    Card,
    Button,
    Radio,
    Form,
    Input,
    Select,
    DatePicker
} from "antd";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import listAdress from "../../assets/address.json";
import { toast } from "react-toastify";
import ImageUpload from "../../components/ImageUpload";
import uploadImageApi from "../../api/uploadImageApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import hospitalApi from "../../api/hospitalApi";
import clinicApi from "../../api/clinicApi";
import specialtyApi from "../../api/specialtyApi";
import doctorApi from "../../api/doctorApi";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
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


function DoctorCreate() {
    const history = useHistory();
    const [form] = Form.useForm();
    const [image, setImage] = useState();
    const [citySelected, setCitySelected] = useState();
    const [districtSelected, setDistrictSelected] = useState();
    const [wardSelected, setWardSelected] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [listHospital, setListHospital] = useState([]);
    const [listClinic, setListClinic] = useState([]);
    const [listSpecialty, setListSpecialty] = useState([]);
    const [content, setContent] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                var resHospital = await hospitalApi.getAllHospital();
                setListHospital(resHospital.data.listItem);
                var resClinic = await clinicApi.getAllClinic();
                setListClinic(resClinic.data.listItem);
                var resSpecialty = await specialtyApi.getAllSpecialty();
                setListSpecialty(resSpecialty.data.listItem);
            } catch (err) {
                toast.error(err.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        }
        fetchData();
    }, [])


    const uploadImage = async () => {
        try {
            const url = await uploadImageApi.upload(image);
            form.setFieldsValue({ image: url });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setDistrictSelected(null);
        form.setFieldsValue({ "district": null })
        // eslint-disable-next-line
    }, [citySelected])

    useEffect(() => {
        setWardSelected(null);
        form.setFieldsValue({ "ward": null })
        // eslint-disable-next-line
    }, [districtSelected])

    //Request API to update user 
    const onFinish = async () => {
        try {
            setIsLoading(true);
            if (image) await uploadImage();
            const formData = form.getFieldsValue();
            formData.birthDay = new Date(formData.birthDay);
            formData.birthDay.setHours(formData.birthDay.getHours() + 8);
            console.log(formData);
            let dataDoctor = {
                user: {
                    "email": formData.email,
                    "fullName": formData.fullName,
                    "image": formData.image,
                    "roleName": "ROLE_DOCTOR",
                    "phoneNumber": formData.phoneNumber,
                    "birthDay": formData.birthDay,
                    "city": formData.city,
                    "district": formData.district,
                    "ward": formData.ward,
                    "address": formData.address,
                    "gender": formData.gender,
                },
                "description": content,
                "hospitalId": formData.hospitalId,
                "clinicId": formData.clinicId,
                "specialtyId": formData.specialtyId
            };
            console.log('tesst', dataDoctor);
            var res = await doctorApi.addDoctor(dataDoctor)
            setIsLoading(false);
            toast.success(res.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            history.push('/doctor');
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }


    }

    return (
        <>
            {isLoading && <LoadingSpinner />}
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col span={24} xs="24" xl={24}>
                        <Card
                            bordered={false}
                            title={<h6 className="font-semibold m-0" style={{ fontSize: 20, fontWeight: 600 }}>Add Doctor</h6>}
                            className="header-solid h-full card-profile-information"
                            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                        >
                            <Form
                                form={form}
                                labelCol={{
                                    span: 12,
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                                layout="vertical"
                                onFinish={onFinish}
                            >
                                <Row gutter={[24, 0]}>
                                    <Col span={16} className="mb-24">
                                        <Row gutter={[24, 0]}>
                                            <Col span={12}>
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
                                                </Form.Item></Col>
                                            <Col span={12}>
                                                <Form.Item label="Phone" name="phoneNumber"
                                                    rules={[{ required: true },
                                                    {
                                                        type: 'string',
                                                        len: 10
                                                    }]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                        </Row>



                                        <Row gutter={[24, 0]}>
                                            <Col span={12}>
                                                <Form.Item name="birthDay" label="Dob"
                                                    rules={[
                                                        {
                                                            required: true,
                                                        }
                                                    ]}
                                                >
                                                    <DatePicker className="ant-input" style={{ display: 'flex', alignItems: 'center', width: '100%' }}
                                                        disabledDate={disabledDate}
                                                    />
                                                </Form.Item></Col>
                                            <Col span={12}>
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
                                            </Col>
                                        </Row>

                                        <Row gutter={[24, 0]}>

                                            <Col span={12}>
                                                <Form.Item name="hospitalId" label="Hospital" rules={[{ required: true }]}>
                                                    <Select
                                                        showSearch
                                                        placeholder="Select hospital"
                                                        allowClear
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                        }

                                                    >
                                                        {listHospital?.map((hospital) => (
                                                            <Option value={hospital.id}
                                                                key={hospital.id}
                                                                label={hospital.name}>
                                                                {hospital.name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name="clinicId" label="Clinic" rules={[{ required: true }]}>
                                                    <Select
                                                        showSearch
                                                        placeholder="Select clinic"
                                                        allowClear
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                        }

                                                    >
                                                        {listClinic?.map((clinic) => (
                                                            <Option value={clinic.id}
                                                                key={clinic.id}
                                                                label={clinic.name}>
                                                                {clinic.name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>

                                            </Col>
                                        </Row>
                                        <Row gutter={[24, 0]}>
                                            <Col span={12}>
                                                <Form.Item name="specialtyId" label="Specialty" rules={[{ required: true }]}>
                                                    <Select
                                                        showSearch
                                                        placeholder="Select specialty"
                                                        allowClear
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                        }

                                                    >
                                                        {listSpecialty?.map((specialty) => (
                                                            <Option value={specialty.id}
                                                                key={specialty.id}
                                                                label={specialty.name}>
                                                                {specialty.name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col span={12}>
                                                <Form.Item label="Gender" name="gender"
                                                    rules={[{ required: true }]}
                                                >
                                                    <Radio.Group>
                                                        <Radio value={true}> Male </Radio>
                                                        <Radio value={false}> FeMale </Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={[24, 0]}>
                                            <Col span={12}>
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
                                            </Col>
                                            <Col span={12}>
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
                                            </Col>
                                        </Row>
                                        <Row gutter={[24, 0]}>
                                            <Col span={12}>
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
                                            </Col>
                                            <Col span={12}>
                                                {wardSelected && <Form.Item name="address" label="Street" rules={[{ required: true }]}>
                                                    <Input />
                                                </Form.Item>}
                                            </Col>

                                        </Row>




                                    </Col>
                                    <Col span={7} style={{ marginLeft: 20, marginTop: 15 }} className="mb-24">
                                        <Row>
                                            <Col span={24} md={24}>
                                                <Card
                                                    style={{ border: '1px solid #00000045' }}
                                                    bordered={false}
                                                    className="header-solid h-full"
                                                    title="Avatar"
                                                >
                                                    <Row gutter={[24, 24]} style={{ textAlign: "center" }}>
                                                        <Col span={24} md={24}>
                                                            <Form.Item name='image'>
                                                                <ImageUpload image={image} setImage={setImage}></ImageUpload>
                                                            </Form.Item>
                                                            <div className="avatar-info" style={{ marginTop: 10 }}>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                                <Row>

                                    <Col span={24}><Form.Item label="Description">
                                        <RichTextEditor setContent={setContent} content={content} /></Form.Item>
                                    </Col>


                                </Row>
                                <Form.Item style={{ textAlign: "center" }}>
                                    <Button style={{ marginRight: 10 }} type="primary" danger onClick={history.goBack}>Back</Button>
                                    <Button htmlType="submit" type="primary">Save</Button>
                                </Form.Item>
                            </Form>

                        </Card>

                    </Col>
                </Row>
            </div>
        </>
    );
}

export default DoctorCreate;
