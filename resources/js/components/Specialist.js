import React from "react";
import { useAppointment } from "../hooks/useAppointment";
import { Col, Card, CardBody, CardTitle, Button } from "reactstrap";

const Specialist = ({ name, specialistId }) => {
    const { registerAppointment } = useAppointment();

    const handleClick = async () => {
        await registerAppointment(specialistId);
    };

    return (
        <Col md={4}>
            <Card className="mb-4 shadow-sm">
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <Button onClick={handleClick} color="primary" outline block>
                        Register
                    </Button>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Specialist;
