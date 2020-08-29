import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setIsLoading(true);

        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("/login", { email, password });
            const response = await axios.get("/api/user");
            setUser(response.data);
            setIsAuthenticated(true);
            setIsLoading(false);
        } catch (err) {
            setError(err.response.data);
            setIsAuthenticated(false);
            setIsLoading(false);
        }
    };

    const logout = async () => {
        const response = await axios.post("/logout");

        if (response.status === 204) {
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const checkIfLoggedIn = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/user");
            setUser(response.data);
            setIsAuthenticated(true);
            setIsLoading(false);
        } catch (err) {
            setIsAuthenticated(false);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    return {
        user,
        login,
        logout,
        isLoading,
        error,
        isAuthenticated
    };
}
