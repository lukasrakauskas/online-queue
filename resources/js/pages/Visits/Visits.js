import React from "react";
import { Container, Row, Col } from "reactstrap";
import Header from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import useRequest from "../../hooks/useRequest";
import { CurrentAppointment, Appointment } from "../../components/Appointment";
import axios from "axios";

const Visits = () => {
    const { user } = useAuth();

    const endCurrentAppointment = async () => {
        await axios.delete(`api/appointments/${currentAppointment.id}`);
        mutateCurrent();
    };

    const startAppointment = async appointmentId => {
        await axios.put(`api/appointments/${appointmentId}`, {
            active: true
        });

        mutateAll();
        mutateCurrent();
    };

    const cancelAppointment = async appointmentId => {
        await axios.delete(`api/appointments/${appointmentId}`);
        mutateAll();
    };

    const { data: appointmentsData, mutate: mutateAll } = useRequest(
        `/api/users/${user.id}/appointments?active=false`
    );

    const appointments = appointmentsData ? appointmentsData.data : [];

    const appointmentsList =
        appointments.length > 0 ? (
            appointments.map(({ id, display_number }) => (
                <Appointment
                    key={id}
                    ticketNumber={display_number}
                    appointmentId={id}
                    onStartAppointment={() => startAppointment(id)}
                    onCancelAppointment={() => cancelAppointment(id)}
                />
            ))
        ) : (
            <p>You have no upcoming appointments.</p>
        );

    const { data: currentAppointmentData, mutate: mutateCurrent } = useRequest(
        `/api/users/${user.id}/appointments?active=true`
    );

    const currentAppointment =
        currentAppointmentData &&
        currentAppointmentData.data &&
        currentAppointmentData.data[0];

    const currentAppointmentComponent =
        currentAppointment != null ? (
            <CurrentAppointment
                appointment={currentAppointment}
                onAppointmentEnd={() => endCurrentAppointment()}
            />
        ) : (
            <p>You have no active appointment.</p>
        );

    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col md={{ size: 8, offset: 2 }} className="mb-3">
                        <h2 className="mb-3">Visits</h2>
                        <h3 className="mb-3">Current</h3>
                        {currentAppointmentComponent}

                        <h3>In queue</h3>
                        {appointmentsList}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Visits;
