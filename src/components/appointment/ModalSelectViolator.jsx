import React from 'react';
import { Modal, Card } from 'antd';
import appointmentApi from '../../api/appointmentApi';
import { toast } from 'react-toastify';
import patientImage from '../../assets/images/patient-removebg-preview.png'

const ModalSelectViolator = ({ visible, setVisible, appointmentId, reloadData }) => {

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleReport = async (violator) => {
        try {
            var res = await appointmentApi.handleReportAppointment(appointmentId, violator);     
            toast.success(res.message, {
                position: toast.POSITION.BOTTOM_RIGHT
              })
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT
              })
        }
        reloadData();
        setVisible(false);
    }

    return (
        <div>
            <Modal
                title="Choose Violators"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer= {<></>}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            onClick={() => {handleReport("doctor")}}
                            cover={<img alt="example" src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000" />}
                        >
                            <h3 style={{textAlign: 'center'}}>Doctor</h3>
                        </Card>
                    </div>
                    <div>
                    <Card
                            hoverable
                            onClick={() => {handleReport("patient")}}
                            style={{ width: 240, marginLeft: 10 }}
                            cover={<img alt="example" src={patientImage} />}
                        >
                            <h3 style={{textAlign: 'center'}}>Patient</h3>
                        </Card>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ModalSelectViolator;
