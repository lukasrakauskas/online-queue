import React from "react";

const AppointmentNumber = ({ number }) => {
    return (
        <p className="card-title display-4 mb-0">{("00" + number).slice(-3)}</p>
    );
};

export default AppointmentNumber;
