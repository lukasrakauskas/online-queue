import React from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import useRequest from "../../hooks/useRequest";
import { useAppointment } from "../../hooks/useAppointment";
import Header from "../../components/Header";
import Specialist from "../../components/Specialist";
import { Redirect } from "react-router-dom";

function Home() {
    const { appointment } = useAppointment();

    if (appointment !== null) {
        return <Redirect to={`/appointment/${appointment.id}`} />;
    }

    const { data: specialistsData } = useRequest({
        url: "/api/users"
    });

    const specialists =
        specialistsData &&
        specialistsData.data.map(({ name, id }) => (
            <Specialist key={name} name={name} specialistId={id} />
        ));

    return (
        <>
            <Header />
            <Container>
                <Row className="justify-content-center">
                    <Col md={12} className="mb-3">
                        <h2>Register an appointment</h2>
                    </Col>
                    {specialistsData ? (
                        specialists
                    ) : (
                        <Spinner type="grow" color="primary" />
                    )}
                </Row>
            </Container>
        </>
    );
}

export default Home;
