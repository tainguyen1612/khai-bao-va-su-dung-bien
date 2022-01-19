import React from "react";
import { Route } from "react-router-dom";
import NotFound from "../components/NotFound";

function UserLayout({ component: Component, ...props }) {
    const users = JSON.parse(localStorage.getItem("user"));
    return (users && users.isUser) || users === null ? (
        <Route
            {...props}
            render={(routerProps) => (
                <>
                    <Component {...routerProps} />
                </>
            )}
        />
    ) : (
        <Route component={NotFound} />
    );
}
export default UserLayout;
