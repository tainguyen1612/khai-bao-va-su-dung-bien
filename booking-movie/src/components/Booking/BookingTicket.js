import moment from "moment";
import React, { useEffect } from "react";
import { Button, Container, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { getShowtimeDetailAction } from "../../redux/actions/showtimeActions";
import { getUserSelector } from "../../redux/selectors/authSelector";
import {
    getResetSeatsSelector,
    getShowtimeDetailSelector,
} from "../../redux/selectors/showtimeSelector";
import Seats from "../../components/Seats/Seats";
import { getBookingSelector } from "../../redux/selectors/bookingSelector";
import "./style.scss";
import { toast, Toaster } from "react-hot-toast";

function BookingTicket() {
    const { showtimeId } = useParams();
    console.log(showtimeId);
    const user = useSelector(getUserSelector);
    const showtime = useSelector(getShowtimeDetailSelector);

    const resetSeats = useSelector(getResetSeatsSelector);
    const booking = useSelector(getBookingSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    const onPreviousButton = () => {
        history.goBack();
    };

    const onNextButton = () => {
        if (booking.seats.length === 0) {
            return toast.error("Vui lòng chọn ghế!");
        }
        history.push({
            pathname: "/payment",
            state: { user, showtime, booking },
        });
    };

    useEffect(() => {
        dispatch(getShowtimeDetailAction(showtimeId, history));

        return () => {
            dispatch({
                type: "REMOVE_SHOWTIME_DETAIL",
            });
            dispatch({
                type: "REMOVE_BOOKING",
            });
        };
    }, [dispatch, showtimeId, history]);
    console.log(showtime);

    if (!user) {
        return <Redirect to="/login" />;
    }

    return (
        <Container>
            <Toaster />
            {showtime === undefined ? (
                <Row className="justify-content-center align-items-center">
                    <Spinner
                        animation="border"
                        variant="danger"
                        role="status"
                        style={{ width: "5rem", height: "5rem" }}
                    ></Spinner>
                </Row>
            ) : (
                <>
                    <h1 className="text-center fs-2 fw-bold my-3">
                        ĐẶT VÉ XEM PHIM
                    </h1>
                    <Row>
                        <p className="fw-bold mb-0">
                            {showtime.Cinema.Cineplex.name} |
                            {showtime.Cinema.name} | Số ghế ({resetSeats}/
                            {showtime.Cinema.horizontal_size *
                                showtime.Cinema.vertical_size}
                            )
                        </p>
                        <p className="fw-bold mb-0 my-3">
                            {moment(showtime.start_time).format(
                                "DD/MM/YYYY HH:mm A"
                            )}
                            ~
                            {moment(showtime.end_time).format(
                                "DD/MM/YYYY HH:mm A"
                            )}
                        </p>
                    </Row>
                    <Seats data={showtime} booking={booking} />
                    <h1 className="movie__title ms-2">Thanh toán</h1>
                    <div className="d-flex my-3 border-bottom pb-3">
                        <Col className="px-0 d-flex">
                            <div className="ms-1">
                                <p className="fw-bold mb-0">
                                    Phim:
                                    <span className="fw-normal">
                                        {showtime.Movie.title}
                                    </span>
                                </p>
                                <p className="mb-0">{showtime.Movie.genre}</p>
                                <p className="mb-0">
                                    {showtime.Cinema.CinemaType.name}
                                </p>
                            </div>
                        </Col>
                        <Col className="px-0 ms-5 d-flex justify-content-center border-start border-end">
                            <div>
                                <p className="mb-1">Rạp</p>
                                <p className="mb-1">Suất Chiếu</p>
                                <p className="mb-1">Phòng Chiếu</p>
                                {booking.seats.length > 0 ? (
                                    <>
                                        <p className="mb-1">Giá vé</p>
                                        <p className="mb-1">Ghế</p>
                                    </>
                                ) : (
                                    <p>Chưa chọn ghế</p>
                                )}
                            </div>
                            <div>
                                <p className="fw-bold mb-1 ms-2">
                                    {showtime.Cinema.Cineplex.name}
                                </p>
                                <p className="fw-bold mb-1 ms-2">
                                    {moment(showtime.start_time).format(
                                        "DD/MM/YYYY - HH:mm A"
                                    )}
                                </p>
                                <p className="fw-bold mb-1 ms-2">
                                    {showtime.Cinema.name}
                                </p>
                                {booking.seats.length > 0 ? (
                                    <>
                                        <p className="fw-bold mb-1 ms-2">
                                            {booking.seats.length} x
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(showtime.price)}
                                        </p>
                                        <p className="fw-bold mb-1 ms-2">
                                            {booking.seats.map((seat, i) => {
                                                return i === 0
                                                    ? seat
                                                    : ", " + seat;
                                            })}
                                        </p>
                                    </>
                                ) : (
                                    ""
                                )}
                            </div>
                        </Col>
                        <Col className="text-end px-0 me-1">
                            <p className="fw-bold mb-1">Tổng tiền</p>
                            <p className="fw-bold mb-1 booking__total">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(booking.total)}
                            </p>
                        </Col>
                    </div>
                    <h2 className="fw-bold text-end">Bạn có muốn tiếp tục?</h2>
                    <div className="d-flex justify-content-end my-3">
                        <Button variant="danger" onClick={onPreviousButton}>
                            Quay Lại
                        </Button>
                        <Button
                            className="ms-3"
                            variant="danger"
                            onClick={onNextButton}
                        >
                            Tiếp tục
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
}

export default BookingTicket;
