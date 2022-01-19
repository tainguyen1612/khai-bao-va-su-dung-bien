import moment from "moment";
import React, { useState } from "react";
import { Form, Row, Button, Col } from "react-bootstrap";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { getMovieShowtimesAction } from "../../redux/actions/movieActions";
import { Link } from "react-router-dom";

function BookingPopUp(props) {
    const { movieId, data } = props;
    const [isActive, setActive] = useState(0);
    const dispatch = useDispatch();

    const timeFrom = (x) => {
        let dates = [];
        for (let i = 0; i < Math.abs(x); i++) {
            const calTime = (x >= 0 ? i : -i) * 24 * 60 * 60 * 1000;
            const time = new Date().getTime() - calTime;
            const day = new Date(time).toISOString();

            dates.push(moment(day).format());
        }
        return dates;
    };

    const days = timeFrom(-9);

    const onChangeDay = (value, index) => {
        setActive(index);

        dispatch({
            type: "GET_MOVIE_SHOWTIMES_FAIL",
        });

        dispatch(
            getMovieShowtimesAction(movieId, {
                day: value,
            })
        );
    };

    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group className="m-0">
                        <div className="d-flex justify-content-between">
                            {days.map((day, index) => {
                                return (
                                    <Button
                                        key={index}
                                        onClick={() =>
                                            onChangeDay(
                                                moment(day).format(
                                                    "YYYY-MM-DD"
                                                ),
                                                index
                                            )
                                        }
                                        variant="outline-danger"
                                        className={
                                            index === isActive ? "active" : ""
                                        }
                                    >
                                        <p>
                                            {moment(day).format("ddd")}/
                                            {moment(day).format("D")}/
                                            {moment(day).format("M")}
                                        </p>
                                    </Button>
                                );
                            })}
                        </div>
                    </Form.Group>
                    <hr className="my-3" />
                </Col>
                <Col>
                    {data.map((item, index) =>
                        item.showtimes.length > 0 ? (
                            <Form.Group className="m-0 w-100" key={index}>
                                <strong>{item.name}</strong>
                                <div className="container text-center">
                                    <div className="row row-cols-auto d-flex flex-wrap">
                                        {item.showtimes.map((showtime) => {
                                            const hashId =
                                                CryptoJS.MD5(
                                                    showtime.start_time
                                                ).toString() + showtime.id;
                                            return (
                                                <Link
                                                    to={`/booking/tickets/${hashId}`}
                                                    key={showtime.id}
                                                    className="btn btn-outline-danger"
                                                >
                                                    <div
                                                        id={showtime.id}
                                                        className=""
                                                    >
                                                        {moment(
                                                            showtime.start_time
                                                        ).format("HH:mm A")}
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Form.Group>
                        ) : index === 0 ? (
                            <p>Không có lịch chiếu</p>
                        ) : (
                            ""
                        )
                    )}
                </Col>
            </Row>
        </Form>
    );
}

export default BookingPopUp;
