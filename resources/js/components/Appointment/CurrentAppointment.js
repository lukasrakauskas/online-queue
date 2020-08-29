import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import AppointmentNumber from "./AppointmentNumber";
import AppointmentWaitTime from "./AppointmentWaitTime";

const CurrentAppointment = ({ appointment, onAppointmentEnd }) => {
    return (
        <Card className="mb-4 shadow-sm">
            <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Current visit:</p>
                    <AppointmentWaitTime startedAt={appointment.started_at} />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <AppointmentNumber
                            number={appointment.display_number}
                        />
                    </div>
                    <div>
                        <Button
                            color="danger"
                            size="lg"
                            outline
                            onClick={onAppointmentEnd}
                        >
                            End visit
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default CurrentAppointment;
