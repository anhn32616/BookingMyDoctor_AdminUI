import { useEffect, useState } from "react";
import {
    Input,
    Form,
    Modal
} from "antd";
import ImageUpload from "../ImageUpload";
import specialtyApi from "../../api/specialtyApi";
import uploadImageApi from "../../api/uploadImageApi";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";




function FormDataSpecialty(props) {
    const [form] = Form.useForm();
    const [image, setImage] = useState();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (props.item) {
            form.setFieldsValue(props.item);
        } else {
            form.resetFields();
        }
        // eslint-disable-next-line
    }, [props.item]);

    useEffect(() => {
        if (!props.isShowForm) {
            setImage(null);
            form.resetFields();
        }
        // eslint-disable-next-line
    }, [props.isShowForm])



    const onAdd = async () => {

        const formData = form.getFieldsValue();
        specialtyApi.addSpecialty(formData).then((response) => {
            setIsLoading(false);
            toast.success(response.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            props.getRecords();
            props.setIsShowForm(false)
            props.setIsAdding(false);
        }).catch((error) => {
            setIsLoading(false);
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        });

    };
    const onEdit = () => {
        const formData = form.getFieldsValue();
        formData.id = props.item.id;
        specialtyApi.updateSpecialty(formData).then((response) => {
            setIsLoading(false);
            toast.success(response.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            props.getRecords();
            props.setIsShowForm(false)
            props.setIsEditing(false);
        }).catch((error) => {
            setIsLoading(false);
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        });
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

                title={props.isAdding ? "Add Specialty" : "Edit Specialty"}
                visible={props.isShowForm}
                okText="Submit"
                onCancel={() => {
                    props.setIsShowForm(false); props.setIsAdding(false); props.setIsEditing(false);
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

                    <Form.Item name="imageUrl" label="Image">
                        <ImageUpload image={image} setImage={setImage} currentImage={props.item ? props.item?.imageUrl : null} />
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
}

export default FormDataSpecialty;