import React from "react";
import useSWR from "swr";
import axios from "axios";
import { Card, CardBody, Button } from "reactstrap";
import AppointmentNumber from "./AppointmentNumber";
import { useAppointment } from "../../hooks/useAppointment";

const CustomerAppointment = ({ appointment, onAppointmentEnd }) => {
    const { cancelAppointment } = useAppointment();

    const { data } = useSWR(
        ["/api/time-left/", appointment.id],
        (url, id) => axios(`${url}${id}`).then(response => response.data),
        {
            refreshInterval: 5000,
            onError: error => {
                if (error.response.status === 404) {
                    cancelAppointment();
                }
            }
        }
    );

    const timeLeft = data && data.data && data.data.time_left;

    return (
        <Card className="mb-4 shadow-sm">
            <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Your number:</p>
                    <span>
                        {timeLeft &&
                            timeLeft !== "just now" &&
                            "Time left: " + timeLeft}
                    </span>
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
                            Cancel
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default CustomerAppointment;
