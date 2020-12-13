import React, { useContext } from 'react';
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./Auth";

const ProtectedRoute = ({ component: RouteComponent, ...props }) => {
    const { user } = useContext(AuthContext);



    return <Route {...props} render={routeProps => !!user ? (
        <RouteComponent {...routeProps} />
    ) : (<Redirect to={"/"} />)} />
}

export default ProtectedRoute;