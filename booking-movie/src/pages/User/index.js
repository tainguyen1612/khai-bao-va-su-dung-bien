import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import BookingPage from "./Booking";
import Cinema from "./Cinema";
import Home from "./Home";
import LoginPage from "./Login";
import MoviePage from "./Movie";
import MovieDetails from "./MovieDetail";
import NewsPage from "./New";
import NewsDetailPage from "./NewDetail";
import PaymentPage from "./Payment";
import RegisterPage from "./Register";
import ShowTimePage from "./ShowTime";
import PaymentDetailPage from "./PaymentDetail";
import ProfilePage from "./Profile";
import ChangePasswordPage from "./ChangePassword";
import HistoryBooking from "./HistoryBooking";

function UserPage() {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${match.url}`} component={Home} />
                <Route
                    exact
                    path={`${match.url}movies/:state`}
                    component={MoviePage}
                />
                <Route
                    exact
                    path={`${match.url}movies/detail/:slug`}
                    component={MovieDetails}
                />
                <Route
                    exact
                    path={`${match.url}cineplexs`}
                    component={Cinema}
                />
                <Route exact path={`${match.url}news`} component={NewsPage} />
                <Route
                    exact
                    path={`${match.url}news/detail/:id`}
                    component={NewsDetailPage}
                />
                <Route
                    exact
                    path={`${match.url}showtimes`}
                    component={ShowTimePage}
                />
                <Route exact path={`${match.url}login`} component={LoginPage} />
                <Route
                    exact
                    path={`${match.url}register`}
                    component={RegisterPage}
                />
                <Route
                    exact
                    path={`${match.url}booking/tickets/:showtimeId`}
                    component={BookingPage}
                />
                <Route
                    exact
                    path={`${match.url}payment`}
                    component={PaymentPage}
                />
                <Route
                    exact
                    path={`${match.url}payment/:id`}
                    component={PaymentDetailPage}
                />
                <Route
                    exact
                    path={`${match.url}profile`}
                    component={ProfilePage}
                />
                <Route
                    exact
                    path={`${match.url}change-password`}
                    component={ChangePasswordPage}
                />
                <Route
                    exact
                    path={`${match.url}history`}
                    component={HistoryBooking}
                />
            </Switch>
        </>
    );
}

export default UserPage;
