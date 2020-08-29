import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const calculateTimeLeft = (date, appointmentTime) => {
    const startTime = Date.parse(date) + appointmentTime;
    const gmtHours = -(new Date().getTimezoneOffset() / 60);
    const difference = startTime - Date.now() + gmtHours * 60 * 60 * 1000;
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
};

const AppointmentWaitTime = ({ startedAt }) => {
    const { user } = useAuth();

    if (!user) return;

    const appointmentTime = user.appointment_time;

    const [timeLeft, setTimeLeft] = useState(
        calculateTimeLeft(startedAt, appointmentTime)
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(startedAt, appointmentTime));
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(" " + timeLeft[interval] + " " + interval);
    });

    return (
        <span>
            {timerComponents.length
                ? "Time left:" + timerComponents
                : "Time's up!"}
        </span>
    );
};

export default AppointmentWaitTime;
