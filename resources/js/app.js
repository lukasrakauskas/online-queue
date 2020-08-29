import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContextProvider } from "./hooks/useAuth";
import { AppointmentContextProvider } from "./hooks/useAppointment";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Visits from "./pages/Visits";
import Dashboard from "./pages/Dashboard";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.baseURL =
    process.env.NODE_ENV !== "production" ? "http://localhost:8000" : "";

function App() {
    return (
        <AppointmentContextProvider>
            <AuthContextProvider>
                <Router>
                    <Switch>
                        <PublicRoute path="/login" component={Login} />
                        <PrivateRoute path="/visits" component={Visits} />
                        <PrivateRoute path="/dashboard" component={Dashboard} />
                        <Route
                            path="/appointment/:appointmentId"
                            component={Appointment}
                        />
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
            </AuthContextProvider>
        </AppointmentContextProvider>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));
