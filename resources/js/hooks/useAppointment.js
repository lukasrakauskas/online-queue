import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import storage from "../storage";

const AppointmentContext = createContext();

export function AppointmentContextProvider({ children }) {
    const appointment = useProvideAppointment();

    return (
        <AppointmentContext.Provider value={appointment}>
            {children}
        </AppointmentContext.Provider>
    );
}

export const useAppointment = () => useContext(AppointmentContext);

function useProvideAppointment() {
    const [appointment, setAppointment] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const registerAppointment = async specialistId => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                `api/users/${specialistId}/appointments`
            );

            setAppointment(response.data.data);
            storage.set("appointment", response.data.data);
            setIsLoading(false);
        } catch (err) {
            setError(err.response.data);
            setAppointment(null);
            setIsLoading(false);
        }
    };

    const loadAppointment = () => {
        setAppointment(storage.get("appointment"));
    };

    const cancelAppointment = async () => {
        const appointmentId = appointment.id;
        storage.remove("appointment");
        setAppointment(null);

        try {
            await axios.delete(`api/appointments/${appointmentId}`);
        } catch {}
    };

    useEffect(() => {
        loadAppointment();
    }, []);

    return {
        appointment,
        isLoading,
        error,
        registerAppointment,
        cancelAppointment
    };
}
