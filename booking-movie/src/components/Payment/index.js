import React, { useState } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { Container, Row, Image, Col, Button } from "react-bootstrap";
import moment from "moment";
import { useDispatch } from "react-redux";
import { createBookingAction } from "../../redux/actions/bookingActions";

function Payment() {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [valueRadio, setValueRadio] = useState("atm");

    if (!location.state) {
        return <Redirect to="/movies/now-showing" />;
    }

    const { user = {}, showtime = {}, booking = {} } = location.state;

    const onPreviousButtonClick = () => {
        history.goBack();
    };

    const onPaymentButtonClick = () => {
        dispatch(createBookingAction({ user, showtime, booking }, history));
    };

    const onChangeRadioCheckbox = (e) => {
        setValueRadio(e.target.value);
    };

    return (
        <Container>
            <Row>
                <h1 className="text-center fs-1 mt-3">THANH TOÁN</h1>
            </Row>
            <Row>
                <Col lg={12}>
                    <h2 className="movie__title ms-2 my-3">THÔNG TIN ĐẶT VÉ</h2>
                </Col>
                <Col className="d-flex">
                    <div>
                        <Image
                            className="booking-movie-img"
                            src={showtime.Movie.poster}
                            width={100}
                            height={120}
                        />
                    </div>
                    <div className="ms-3">
                        <p className="fw-bold mb-0">
                            Tên phim:{" "}
                            <span className="ms-2 fw-normal">
                                {showtime.Movie.title}
                            </span>
                        </p>
                        <p className="mb-0 fw-bold">
                            Thể loại:
                            <span className="ms-2 fw-normal">
                                {showtime.Movie.genre}
                            </span>
                        </p>
                    </div>
                </Col>
                <Col className="px-0 ms-5 d-flex justify-content-center">
                    <div className="me-3">
                        <p className="mb-1 fw-bold">Rạp :</p>
                        <p className="mb-1 fw-bold">Suất Chiếu :</p>
                        <p className="mb-1 fw-bold">Phòng Chiếu :</p>
                        {booking.seats.length > 0 ? (
                            <>
                                <p className="mb-1 fw-bold">Giá vé :</p>
                                <p className="mb-1 fw-bold">Ghế :</p>
                            </>
                        ) : (
                            <p>Lỗi hệ thống</p>
                        )}
                    </div>
                    <div>
                        <p className="mb-1 ms-2">
                            {showtime.Cinema.Cineplex.name}
                        </p>
                        <p className="mb-1 ms-2">
                            {moment(showtime.start_time).format(
                                "DD/MM/YYYY - HH:mm A"
                            )}
                        </p>
                        <p className="mb-1 ms-2">{showtime.Cinema.name}</p>
                        {booking.seats.length > 0 ? (
                            <>
                                <p className="mb-1 ms-2">
                                    {booking.seats.length} x{" "}
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(showtime.price)}
                                </p>
                                <p className="mb-1 ms-2">
                                    {booking.seats.map((seat, i) => {
                                        return i === 0 ? seat : ", " + seat;
                                    })}
                                </p>
                            </>
                        ) : (
                            <p>Lỗi hệ thống</p>
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
            </Row>
            <Row>
                <Col>
                    <h2 className="movie__title ms-2 my-3">
                        HÌNH THỨC THANH TOÁN
                    </h2>
                    <div className="form-check d-flex align-items-center">
                        <input
                            className="form-check-input me-2"
                            name="atm"
                            id="atm-card"
                            type="radio"
                            value="atm"
                            checked={valueRadio === "atm"}
                            onChange={onChangeRadioCheckbox}
                        />
                        <label className="form-check-label" htmlFor="atm-card">
                            <div className="d-flex justify-content-center align-items-center">
                                <Image
                                    width={37}
                                    height={37}
                                    src="https://www.cgv.vn/media/catalog/product/placeholder/default/atm_icon.png"
                                />
                                <span className="ms-1">
                                    Thẻ ATM (Thẻ nội địa)
                                </span>
                            </div>
                        </label>
                    </div>
                    <div className="form-check d-flex align-items-center mt-2">
                        <input
                            className="form-check-input me-2"
                            name="visa"
                            id="visa-card"
                            type="radio"
                            value="visa"
                            checked={valueRadio === "visa"}
                            onChange={onChangeRadioCheckbox}
                        />
                        <label className="form-check-label" htmlFor="visa-card">
                            <div className="d-flex justify-content-center align-items-center">
                                <Image
                                    width={37}
                                    height={37}
                                    src="https://www.cgv.vn/media/catalog/product/placeholder/default/visa-mastercard-icon.png"
                                />
                                <span className="ms-1">
                                    Thẻ quốc tế (Visa, Master, Amex, JCB)
                                </span>
                            </div>
                        </label>
                    </div>
                    <div className="form-check d-flex align-items-center mt-2">
                        <input
                            className="form-check-input me-2"
                            name="offline"
                            id="offline"
                            type="radio"
                            value="offline"
                            checked={valueRadio === "offline"}
                            onChange={onChangeRadioCheckbox}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="momo-wallet"
                        >
                            <div className="d-flex justify-content-center align-items-center">
                                <Image
                                    width={37}
                                    height={37}
                                    src="https://www.pinclipart.com/picdir/middle/520-5202476_movie-icon-vector-png-clipart.png"
                                />
                                <span className="ms-1">Thanh toán tại rạp</span>
                            </div>
                        </label>
                    </div>
                </Col>
            </Row>
            <h2 className="fst-italic fw-bolder mt-3">
                Bạn có muốn tiếp tục hoàn tất thanh toán?
            </h2>
            <div className="d-flex my-3">
                <Button variant="danger" onClick={onPreviousButtonClick}>
                    Quay Lại
                </Button>
                <Button
                    className="ms-3"
                    variant="danger"
                    onClick={onPaymentButtonClick}
                >
                    Tiếp tục
                </Button>
            </div>
        </Container>
    );
}

export default Payment;
