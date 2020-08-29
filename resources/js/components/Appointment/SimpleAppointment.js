import React from "react";
import { Col, Card, CardBody } from "reactstrap";
import AppointmentNumber from "./AppointmentNumber";

const SimpleAppointment = ({ ticketNumber }) => {
    return (
        <Col md={4}>
            <Card className="mb-4 shadow-sm">
                <CardBody>
                    <AppointmentNumber number={ticketNumber} />
                </CardBody>
            </Card>
        </Col>
    );
};

export default SimpleAppointment;
