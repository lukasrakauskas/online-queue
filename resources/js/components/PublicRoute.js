import React from "react";
import PrivateRoute from "./PrivateRoute";

const PublicRoute = ({ ...props }) => {
    return <PrivateRoute loggedIn={false} {...props} />;
};

export default PublicRoute;
