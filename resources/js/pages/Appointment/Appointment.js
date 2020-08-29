import React from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import Header from "../../components/Header";
import { useAppointment } from "../../hooks/useAppointment";
import { Redirect } from "react-router-dom";
import { CustomerAppointment } from "../../components/Appointment";

const Appointment = () => {
    const { appointment, isLoading, cancelAppointment } = useAppointment();

    if (!isLoading && appointment === null) {
        return <Redirect to="/" />;
    }

    const onAppointmentEnd = async () => {
        cancelAppointment();
        return <Redirect to="/" />;
    };

    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col md={{ size: 8, offset: 2 }} className="mb-3">
                        <h2>Your appointment</h2>
                    </Col>
                    <Col md={{ size: 8, offset: 2 }}>
                        {isLoading && <Spinner type="grow" color="primary" />}
                        {appointment && (
                            <CustomerAppointment
                                appointment={appointment}
                                onAppointmentEnd={onAppointmentEnd}
                            />
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Appointment;
