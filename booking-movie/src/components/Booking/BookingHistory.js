import React, { useEffect } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userGetBookingAction } from "../../redux/actions/bookingActions";
import { getUserSelector } from "../../redux/selectors/authSelector";
import { userGetBookingSelector } from "../../redux/selectors/bookingSelector";
import moment from "moment";

function BookingHistory() {
    const user = useSelector(getUserSelector);
    const bookings = useSelector(userGetBookingSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userGetBookingAction());
        return () => {
            dispatch({
                type: "REMOVE_USER_BOOKINGS",
            });
        };
    }, [dispatch]);

    if (!user) {
        return <Redirect to="/login" />;
    }

    return (
        <Container className="w-75">
            <Row>
                <h1 className="text-center fw-bold fs-2 mt-3">
                    LỊCH SỬ ĐẶT VÉ
                </h1>
            </Row>
            {bookings.length === 0 ? (
                <p className="text-center my-3">Chưa có lịch sử đặt vé</p>
            ) : (
                <>
                    {bookings.map((booking, i) => {
                        const barcode = `https://www.barcodesinc.com/generator/image.php?code=${booking.b_number}&style=196&type=C128B&width=180&height=60&xres=1&font=16`;
                        return (
                            <>
                                <Row
                                    className="mt-3 pb-3 border-bottom"
                                    key={i}
                                >
                                    <Col md={3} className="px-3">
                                        <Image
                                            className="w-100"
                                            src={booking.Showtime.Movie.poster}
                                            height={300}
                                        />
                                    </Col>
                                    <Col className="px-0">
                                        <div>
                                            <h5 className="fw-bold">
                                                {booking.Showtime.Movie.title} (
                                                {
                                                    booking.Showtime.Cinema
                                                        .CinemaType.name
                                                }
                                                )
                                            </h5>
                                        </div>
                                        <hr className="my-1" />
                                        <div className="booking__info">
                                            <p>
                                                Mã đặt vé:
                                                <span>{booking.b_number}</span>
                                            </p>
                                            <p>
                                                Thời gian đặt vé:
                                                <span>
                                                    {moment(
                                                        booking.createdAt
                                                    ).format(
                                                        "DD/MM/YYYY - HH:mm A"
                                                    )}
                                                </span>
                                            </p>
                                            <p>
                                                Suất chiếu:
                                                <span>
                                                    {moment(
                                                        booking.Showtime
                                                            .start_time
                                                    ).format("DD/MM/YYYY")}
                                                    {" - "}(
                                                    {moment(
                                                        booking.Showtime
                                                            .start_time
                                                    ).format("HH:mm A")}
                                                    {" ~ "}
                                                    {moment(
                                                        booking.Showtime
                                                            .end_time
                                                    ).format("HH:mm A")}
                                                    )
                                                </span>
                                            </p>
                                            <p>
                                                Rạp:
                                                <span>
                                                    {
                                                        booking.Showtime.Cinema
                                                            .Cineplex.name
                                                    }
                                                </span>
                                            </p>
                                            <p>
                                                Phòng chiếu:
                                                <span>
                                                    {
                                                        booking.Showtime.Cinema
                                                            .name
                                                    }
                                                </span>
                                            </p>
                                            <p>
                                                Ghế:
                                                <span>
                                                    {booking.Tickets.map(
                                                        (ticket, i) => {
                                                            return i === 0
                                                                ? ticket.seat_code
                                                                : ", " +
                                                                      ticket.seat_code;
                                                        }
                                                    )}
                                                </span>
                                            </p>

                                            <p>
                                                Giá vé:
                                                <span>
                                                    {booking.Tickets.length} x
                                                    {new Intl.NumberFormat(
                                                        "vi-VN",
                                                        {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }
                                                    ).format(
                                                        booking.Tickets[0].price
                                                    )}
                                                </span>
                                            </p>
                                            <p>
                                                Tổng cộng:
                                                <span>
                                                    {new Intl.NumberFormat(
                                                        "vi-VN",
                                                        {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }
                                                    ).format(booking.total)}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="mt-3">
                                            <p className="fs-5 fw-bolder booking__code">
                                                Mã quét vé
                                            </p>
                                            <Image
                                                className="img-cover"
                                                src={barcode}
                                                height={80}
                                                width={330}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        );
                    })}
                </>
            )}
        </Container>
    );
}

export default BookingHistory;
