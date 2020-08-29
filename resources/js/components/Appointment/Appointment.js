import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import AppointmentNumber from "./AppointmentNumber";

const Appointment = ({
    ticketNumber,
    onStartAppointment,
    onCancelAppointment
}) => {
    return (
        <Card className="mb-4 shadow-sm">
            <CardBody className="d-flex justify-content-between align-items-center">
                <AppointmentNumber number={ticketNumber} />
                <div>
                    <Button
                        color="success"
                        size="lg"
                        className="mr-1"
                        onClick={onStartAppointment}
                    >
                        Start
                    </Button>
                    <Button
                        color="danger"
                        size="lg"
                        outline
                        onClick={onCancelAppointment}
                    >
                        Cancel
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default Appointment;
