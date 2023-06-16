import React from 'react';
import './PatientInfo.css'
const PatientInfo = ({ patient }) => {
  return (
    <div className="patient-info">
      <div className="patient-image">
        <img src={patient.image} alt={patient.fullName} />
      </div>
      <div className="patient-details">
        <h2>{patient.fullName}</h2>
        <p>Email: {patient.email}</p>
        <p>Phone: {patient.phoneNumber}</p>
        <p>Address: {patient.address}, {patient.ward}, {patient.district}, {patient.city}</p>
        <p>Gender: {patient.gender ? 'Male' : 'Female'}</p>
      </div>
    </div>
  );
};

export default PatientInfo;
