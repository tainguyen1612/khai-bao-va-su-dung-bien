import React from "react";
import { Col, Row } from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MovieList from "../../components/Showtime/Admin/MovieList";
import DetailMovie from "../../components/Showtime/Admin/Detail";

function ShowtimePage() {
    const match = useRouteMatch();
    console.log(match);
    return (
        <div className="content">
            <Row>
                <Col>
                    <h1 className="text-center fs-1 fw-bold my-3">Showtimes</h1>
                </Col>
            </Row>
            <Row>
                <Switch>
                    <Route exact path={`${match.url}`} component={MovieList} />
                    <Route
                        exact
                        path={`${match.url}/:movieId`}
                        component={DetailMovie}
                    />
                </Switch>
            </Row>
        </div>
    );
}

export default ShowtimePage;
