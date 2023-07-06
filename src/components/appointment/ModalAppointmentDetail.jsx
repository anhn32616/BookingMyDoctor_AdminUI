import { Modal, Rate, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import './ModalAppointmentDetail.css'
import PatientInfo from '../patient/PatientInfo';
import rateApi from '../../api/rateApi';

const colorStatus = (status) => {
    switch (status) {
        case "Cancel":
            return 'gray'
        case "Pending":
            return '#108ee9'
        case "Confirm":
            return '#faae2b'
        case "Report":
            return '#f50'
        case 'Done':
            return '#87d068'
        case 'NotCome':
            return "#001858"
        default:
            break
    }
}

// Convert datetime Local to format YYYY-MM-DD HH:MM 
function convertDateTime(dateTimeStr) {
    const dateTime = new Date(dateTimeStr);
    const date = dateTime.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' });
    const time = dateTime.toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric' });
    return `${date} ${time}`;
}

function ModalAppointmentDetail({ appointment, setModalVisible, modalVisible }) {
    const [rate, setRate] = useState();

    useEffect(() => {
        const getRateOfAppointment = async () => {
            if (appointment?.status === "Done") {
                try {
                    var res = await rateApi.getRateByAppointmentId(appointment.id)
                    if (res?.data) setRate(res.data.point); else setRate(null)
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
        getRateOfAppointment();
    }, [appointment])

    return (
        <Modal
            title="Appointment details"
            visible={modalVisible}
            width={800}
            onCancel={() => setModalVisible(false)}
            footer={[]}
            className="appointment-modal"
            style={{
                top: 30,
            }}
        >
            <div className="appointment-info">
                {
                    rate && (
                        <p>
                            <span className='info-label'>Rate: </span>
                            <Rate disabled value={rate} />
                        </p>
                    )
                }
                <p>
                    <span className="info-label">ID:</span> {appointment?.id}
                </p>
                <p>
                    <span className="info-label">Status:</span>
                    <Tag style={{ marginLeft: 5, padding: 2, width: 80, textAlign: 'center' }} color={colorStatus(appointment?.status)}>{appointment?.status.toUpperCase()}</Tag>
                </p>
                <p>
                    <span className="info-label">Date:</span> {convertDateTime(appointment?.date)}
                </p>
                <p>
                    <span className="info-label">Symptoms:</span> {appointment?.symptoms}
                </p>
                {(appointment?.status !== "Cancel" && appointment?.status !== "NotCome") &&
                    (
                        <>
                            <p>
                                <span className="info-label">Cost:</span> {appointment?.schedule?.cost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </p>
                            {appointment?.rate && <Rate disabled allowHalf defaultValue={appointment?.rate} />}
                        </>
                    )}
                <span className="info-label">Patient:</span>
                <PatientInfo style={{ marginBottom: 5 }} patient={appointment?.patient}></PatientInfo>
                <p>
                    <span className="info-label">DoctorId:</span> {appointment?.schedule?.doctorId}
                </p>
                <p>
                    <span className="info-label">Doctor:</span> {appointment?.schedule?.doctorName}
                </p>

            </div>
        </Modal>

    );
}

export default ModalAppointmentDetail;