import { Button, Col, Modal, Row } from 'antd';
import React from 'react';
import CardAppointment from './CardAppointment';

function ModalSelectAppointment({ listAppointment, setModalVisible, modalVisible }) {
    return (
        <Modal
            title="Appointments of schedule"
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            style={{maxHeight: 600, overflowY: 'auto', width: listAppointment.length > 1 ? 1000 : 500}}
            footer={[
                <Button key="close" onClick={() => setModalVisible(false)}>
                    Close
                </Button>
            ]}
        >
            <Row gutter={[12, 12]}>
                {listAppointment && listAppointment.length > 1 ? listAppointment.map((item, index) => (
                    <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
                        <CardAppointment appointment={item} />
                    </Col>
                )) : (<><CardAppointment appointment={listAppointment[0]} /></>)}
            </Row>
        </Modal>
    );
}

export default ModalSelectAppointment;