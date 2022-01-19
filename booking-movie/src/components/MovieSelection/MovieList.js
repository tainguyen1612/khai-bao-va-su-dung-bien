import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Redirect, Link } from "react-router-dom";
import { getAllMoviesByStateAction } from "../../redux/actions/movieActions";
import { getMoviesSelector } from "../../redux/selectors/movieSelector";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import moment from "moment";

function Movie() {
    const { state } = useParams();
    const movies = useSelector(getMoviesSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMoviesByStateAction({ state: state }));

        return () => {
            dispatch({
                type: "REMOVE_MOVIES",
            });
        };
    }, [dispatch, state]);
    console.log(movies);
    if (state !== "now-showing" && state !== "coming-soon") {
        return <Redirect to="/movies/now-showing" />;
    }

    return (
        <Container>
            <h1 className="text-center movie__title my-3">
                {state === "now-showing" ? "PHIM ĐANG CHIẾU" : "PHIM SẮP CHIẾU"}
            </h1>
            <Row>
                {movies.length !== 0 ? (
                    movies.map((item, index) => {
                        const url = "/movies/detail/" + item.slug;
                        return (
                            <Col
                                xs={12}
                                sm={12}
                                md={4}
                                lg={3}
                                className="mb-4"
                                key={index}
                            >
                                <Card className="h-100">
                                    <Card.Img
                                        variant="top"
                                        src={item.poster}
                                        height={350}
                                    />
                                    <Card.Body>
                                        <Card.Title className="fw-bold text-justify">
                                            {item.title}
                                        </Card.Title>
                                        <Card.Text className="movie__content">
                                            <p className="fw-bold text-justify">
                                                Thể loại:
                                                <span className="fw-lighter">
                                                    {item.genre}
                                                </span>
                                            </p>
                                            <p className="fw-bold text-justify">
                                                Diễn viên:
                                                <span className="fw-lighter">
                                                    {item.actor}
                                                </span>
                                            </p>
                                            <p className="fw-bold text-justify">
                                                Thời lượng:
                                                <span className="fw-lighter">
                                                    {item.running_time} phút
                                                </span>
                                            </p>
                                            <p className="fw-bold text-justify">
                                                Khởi chiếu:
                                                <span className="fw-lighter">
                                                    {moment(
                                                        item.release_date
                                                    ).format("DD/MM/YYYY")}
                                                </span>
                                            </p>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-center">
                                        <Link
                                            className="btn btn-danger"
                                            to={url}
                                        >
                                            XEM THÊM
                                        </Link>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        );
                    })
                ) : (
                    <Row className="justify-content-center align-items-center">
                        <Spinner
                            animation="border"
                            variant="danger"
                            role="status"
                            style={{ width: "5rem", height: "5rem" }}
                        ></Spinner>
                    </Row>
                )}
            </Row>
        </Container>
    );
}

export default Movie;
