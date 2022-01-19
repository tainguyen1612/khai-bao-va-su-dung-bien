import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Navbar from "../../components/Header/NavBarAdmin";
import DashboardPage from "./Dashboard";
import MoviePage from "./Movie";
import UserPage from "./User";
import TicketPage from "./Ticket";
import CinemaPage from "./Cinema";
import CineplexPage from "./Cineplex";
import ShowtimePage from "./ShowTime";

function AdminPage() {
    const match = useRouteMatch();

    return (
        <Container fluid>
            <Row>
                <Col lg={2} className="m-0 p-0">
                    <Navbar />
                </Col>
                <Col lg={10}>
                    <Switch>
                        <Route
                            exact
                            path={`${match.url}`}
                            component={DashboardPage}
                        />
                        <Route
                            exact
                            path={`${match.url}/users`}
                            component={UserPage}
                        />
                        <Route
                            exact
                            path={`${match.url}/movies`}
                            component={MoviePage}
                        />
                        <Route
                            exact
                            path={`${match.url}/tickets`}
                            component={TicketPage}
                        />
                        <Route
                            exact
                            path={`${match.url}/cinemas`}
                            component={CinemaPage}
                        />
                        <Route
                            exact
                            path={`${match.url}/cineplexs`}
                            component={CineplexPage}
                        />
                        <Route
                            path={`${match.url}/showtimes`}
                            component={ShowtimePage}
                        />
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminPage;
