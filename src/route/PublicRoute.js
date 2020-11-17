import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const {user} = useSelector((state) => ({...state}));
    return (
        <Route
            {...rest}
            render={(props) => (user && user.token && restricted ? <Redirect to="/books" /> : <Component {...props} />)}
        />
    );
};

export default PublicRoute;
