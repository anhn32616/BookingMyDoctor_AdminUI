import { Card } from 'antd';
import React from 'react';
import PatientInfo from '../patient/PatientInfo';


function CardAppointment({appointment}) {
    return (
        <div>
            <Card style={{backgroundColor: 'beige'}}>
                <PatientInfo patient={appointment?.patient}/>
                <p>
                    <span className="info-label">Symptoms:</span> {appointment?.symptoms}
                </p>
            </Card>
        </div>
    );
}

export default CardAppointment;