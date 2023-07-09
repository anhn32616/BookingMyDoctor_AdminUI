import React, { useState } from 'react';
import { Modal, Card } from 'antd';
import appointmentApi from '../../api/appointmentApi';
import { toast } from 'react-toastify';
import patientImage from '../../assets/images/patient-removebg-preview.png'
import { addNotification } from '../../utils/firebase/NotificationFb';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const ModalSelectViolator = ({ visible, setVisible, appointmentId, reloadData }) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleReport = async (violator) => {
        setIsLoading(true);
        try {
            var res = await appointmentApi.handleReportAppointment(appointmentId, violator);     
            toast.success(res.message, {
                position: toast.POSITION.BOTTOM_RIGHT
              })
            res.data.forEach(item => {
                addNotification(item.userId, item.message)
            });
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT
              })
        }
        setIsLoading(false);
        reloadData();
        setVisible(false);
    }

    return (
        <div>
            {isLoading && (<LoadingSpinner/>)}
            <Modal
                title="Choose Violators"
                open={visible}
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
