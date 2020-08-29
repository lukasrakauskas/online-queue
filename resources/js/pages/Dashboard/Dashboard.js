import React from "react";
import { Container, Row, Col } from "reactstrap";
import useRequest from "../../hooks/useRequest";
import Header from "../../components/Header";
import { SimpleAppointment } from "../../components/Appointment";

function Dashboard() {
    const { data } = useRequest("/api/dashboard", { refreshInterval: 5000 });

    let activeAppointments = [];
    let waitingAppointments = [];

    if (data && data.data) {
        activeAppointments = data.data.active.map(({ id, display_number }) => (
            <SimpleAppointment key={id} ticketNumber={display_number} />
        ));

        waitingAppointments = data.data.queue.map(({ id, display_number }) => (
            <SimpleAppointment key={id} ticketNumber={display_number} />
        ));
    }

    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col md={12}>
                        <h2>Current appointments</h2>
                    </Col>
                    {activeAppointments.length > 0 ? (
                        activeAppointments
                    ) : (
                        <Col md={12}>
                            <p>No current appointments.</p>
                        </Col>
                    )}

                    <Col md={12}>
                        <h2>Queue</h2>
                    </Col>
                    {waitingAppointments.length > 0 ? (
                        waitingAppointments
                    ) : (
                        <Col md={12}>
                            <p>Queue is empty.</p>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;
