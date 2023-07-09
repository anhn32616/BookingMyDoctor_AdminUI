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
    Typography,
    InputNumber,
    DatePicker
} from "antd";

import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
import listAdress from "../../assets/address.json";
import userApi from "../../api/userApi.js";
import { toast } from "react-toastify";
import ImageUpload from "../../components/ImageUpload";
import uploadImageApi from "../../api/uploadImageApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
const { Title } = Typography;
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


function PatientDetails() {
    const history = useHistory();
    const [form] = Form.useForm();
    const params = useParams();
    const [image, setImage] = useState();
    const [citySelected, setCitySelected] = useState();
    const [districtSelected, setDistrictSelected] = useState();
    const [wardSelected, setWardSelected] = useState();
    const [patientInfo, setPatientInfo] = useState();
    let isGetDataForEdit = true;
    const [isLoading, setIsLoading] = useState(false);



    const uploadImage = async () => {
        try {
            const url = await uploadImageApi.upload(image);
            form.setFieldsValue({ image: url });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        isGetDataForEdit = true;
        fetchData(params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!isGetDataForEdit) {
            setDistrictSelected(null);
            form.setFieldsValue({ "district": null })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [citySelected])

    useEffect(() => {
        if (isGetDataForEdit) {
            isGetDataForEdit = false;
        } else {
            setWardSelected(null);
            form.setFieldsValue({ "ward": null })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [districtSelected])


    //Get data when form load 
    const fetchData = async (id) => {
        try {
            setIsLoading(true);
            var res = await userApi.getDetailUser(id);
            setPatientInfo(res.data);
            console.log(res.data);
            res.data.birthDay = moment(new Date(res.data?.birthDay?.slice(0, 10)), "YYYY-MM-DD");
            const city = listAdress.find(city => city.name === res.data?.city);
            const district = city?.districts.find(d => d.name === res.data?.district);
            setCitySelected(city);
            setDistrictSelected(district);
            setWardSelected(res.data?.ward);
            form.setFieldsValue({
                ...res.data
            })
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }

    //Request API to update user 
    const onFinish = async () => {
        try {
            setIsLoading(true);
            if (image) await uploadImage();
            const formData = form.getFieldsValue();
            formData.birthDay = new Date(formData.birthDay);
            formData.birthDay.setHours(formData.birthDay.getHours() + 8);
            formData.id = params.id;
            console.log(formData);
            var res = await userApi.updateUser(formData)
            setIsLoading(false);
            toast.success(res.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            fetchData(params.id);
        } catch (error) {
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
                            title={<h6 className="font-semibold m-0" style={{ fontSize: 20, fontWeight: 600 }}>Patient Info</h6>}
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
                                                    // format={'YYYY-MM-DD'}
                                                    />
                                                </Form.Item></Col>
                                            <Col span={12}>
                                                <Form.Item label="Violation" name="countViolation"
                                                    rules={[{ required: true },
                                                    {
                                                        type: 'number',
                                                        min: 0,
                                                        max: 10
                                                    }]}
                                                >
                                                    <InputNumber className="ant-input" style={{ display: 'flex', alignItems: 'center', width: '100%' }} />
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
                                        <Form.Item label="Gender" name="gender"
                                            rules={[{ required: true }]}
                                        >
                                            <Radio.Group>
                                                <Radio value={true}> Male </Radio>
                                                <Radio value={false}> FeMale </Radio>
                                            </Radio.Group>
                                        </Form.Item>



                                    </Col>
                                    <Col span={7} style={{ marginLeft: 20, marginTop: 15 }} className="mb-24">
                                        <Row>
                                            <Col span={24} md={24}>
                                                <Card
                                                    style={{ border: '1px solid #00000045' }}
                                                    bordered={false}
                                                    className="header-solid h-full"
                                                    bodyStyle={{ paddingTop: 16, paddingBottom: 16 }}
                                                >
                                                    <Row gutter={[24, 24]} style={{ textAlign: "center" }}>
                                                        <Col span={24} md={24}>
                                                            <Form.Item name='image'>
                                                                <ImageUpload image={image} setImage={setImage} currentImage={patientInfo?.image}></ImageUpload>
                                                            </Form.Item>
                                                            <div className="avatar-info" style={{ marginTop: 10 }}>
                                                                <Title level={3} style={{ marginBottom: "0" }}>{patientInfo?.fullName}</Title>
                                                                <p>{patientInfo?.email}</p>
                                                                <p>{patientInfo?.address}, {patientInfo?.ward}, {patientInfo?.district}, {patientInfo?.city}</p>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                </Card>
                                            </Col>
                                        </Row>
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

export default PatientDetails;
