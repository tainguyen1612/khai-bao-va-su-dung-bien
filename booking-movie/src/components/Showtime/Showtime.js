import CryptoJS from "crypto-js";
import $ from "jquery";
import moment from "moment";
import React, { useEffect } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { getAllCineplexsAction } from "../../redux/actions/cineplexActions";
import {
    changeDayShowtimeAction,
    getAllShowtimesByCineplexAction,
} from "../../redux/actions/showtimeActions";
import { getCineplexsSelector } from "../../redux/selectors/cineplexSelector";
import { getAllShowtimesByCineplexSelector } from "../../redux/selectors/showtimeSelector";

function ShowTime() {
    const cineplexs = useSelector(getCineplexsSelector);
    const data = useSelector(getAllShowtimesByCineplexSelector);
    const message = useSelector((state) => state.showtime.message);
    const movies = useSelector((state) => state.showtime.movies);

    const dispatch = useDispatch();

    let options = [];

    useEffect(() => {
        dispatch(getAllCineplexsAction());
        return () => {
            dispatch({
                type: "REMOVE_CINEPLEXS",
            });
            dispatch({
                type: "REMOVE_ALL_SHOWTIMES",
            });
        };
    }, [dispatch]);

    $(".btn-outline-danger").click(function () {
        $(".btn-outline-danger").removeClass("active");
        $(this).addClass("active");
    });

    if (cineplexs.data.length > 0) {
        cineplexs.data.map((cineplex) => {
            const data = {
                value: cineplex.id,
                label: cineplex.name,
            };
            options.push(data);
        });
    }

    const handleChangeCineplexById = (item) => {
        dispatch(getAllShowtimesByCineplexAction({ cineplex_id: item.value }));
    };

    const handleChangeDay = (obj) => {
        dispatch(changeDayShowtimeAction(obj));
    };

    return (
        <Container>
            <h3 className="text-center fw-bold mt-3 fs-2">LỊCH CHIẾU</h3>
            <Row>
                <Col lg={12}>
                    <h1 className="movie__title ms-2">Chọn Cụm Rạp</h1>
                </Col>

                <Col lg={12} className="mt-3">
                    <Select
                        placeholder="Chọn cụm rạp"
                        options={options}
                        onChange={handleChangeCineplexById}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary25: "#d4d4d4",
                                primary: "#e71a0f",
                            },
                        })}
                    />
                </Col>
            </Row>

            <Row className="mt-3">
                <div className="fw-bold ms-1">{message}</div>
                {data.length > 0 ? (
                    <div>
                        <h1 className="movie__title fw-bold m-2">
                            Danh sách lịch chiếu
                        </h1>
                        {data.map((item, index) => {
                            const day = moment(
                                item.date,
                                "DD/MM/YYYY"
                            ).toDate();
                            return (
                                <Button
                                    key={index}
                                    onClick={() =>
                                        handleChangeDay({
                                            id: index,
                                            value: moment(day).format(
                                                "DD/MM/YYYY"
                                            ),
                                        })
                                    }
                                    variant={
                                        index === 0
                                            ? "outline-danger active"
                                            : "outline-danger"
                                    }
                                    className="my-3 me-3"
                                >
                                    <span>
                                        {moment(day).format("ddd")}/
                                        {moment(day).format("D")}/
                                        {moment(day).format("M")}
                                    </span>
                                </Button>
                            );
                        })}
                    </div>
                ) : (
                    ""
                )}
            </Row>

            {movies.length > 0 ? (
                <Row className="mb-3">
                    <Col>
                        <h1 className="movie__title fw-bold m-2">
                            Danh sách phim
                        </h1>
                    </Col>

                    {movies.map((movie, index) => {
                        const url = "/movies/detail/" + movie.slug;
                        return (
                            <Col className="col-12 mt-3" key={index}>
                                <Card className="news">
                                    <Card.Img
                                        variant="left"
                                        src={movie.poster}
                                        height={200}
                                        width="15%"
                                    />
                                    <Card.Body className="news__body">
                                        <Card.Title className="fw-bold">
                                            <Link
                                                className="fw-bold link-dark"
                                                to={url}
                                            >
                                                {movie.title}
                                            </Link>
                                        </Card.Title>
                                        <Card.Text>
                                            <p className="fw-cold mb-2">
                                                Lịch chiếu
                                            </p>
                                            {movie.showtimes.map(
                                                (showtime, index) => {
                                                    return (
                                                        <Row key={index}>
                                                            {showtime.list.map(
                                                                (
                                                                    showtimeItem,
                                                                    index
                                                                ) => {
                                                                    const hashId =
                                                                        CryptoJS.MD5(
                                                                            showtimeItem.start_time
                                                                        ).toString() +
                                                                        showtimeItem.id;
                                                                    return (
                                                                        <Col
                                                                            key={
                                                                                index
                                                                            }
                                                                            lg={
                                                                                3
                                                                            }
                                                                        >
                                                                            <Link
                                                                                to={`/booking/tickets/${hashId}`}
                                                                                className="btn btn-outline-danger"
                                                                            >
                                                                                {moment(
                                                                                    showtimeItem.start_time
                                                                                ).format(
                                                                                    "HH:mm A"
                                                                                )}
                                                                            </Link>
                                                                        </Col>
                                                                    );
                                                                }
                                                            )}
                                                        </Row>
                                                    );
                                                }
                                            )}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            ) : (
                ""
            )}
        </Container>
    );
}

export default ShowTime;
