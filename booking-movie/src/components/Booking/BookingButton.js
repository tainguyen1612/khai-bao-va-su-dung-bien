import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import BookingPopUp from "./BookingPopUp";
import { useSelector, useDispatch } from "react-redux";
import { getMovieShowtimesSelector } from "../../redux/selectors/movieSelector";
import { getMovieShowtimesAction } from "../../redux/actions/movieActions";
import moment from "moment";

function BookingButton(props) {
    const { movie } = props;
    const [show, setShow] = useState(props.isShow);
    const showtimes = useSelector(getMovieShowtimesSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "REMOVE_MOVIE_SHOWTIMES",
        });
    }, [dispatch]);

    const handleClose = () => {
        dispatch({
            type: "GET_MOVIE_SHOWTIMES_FAIL",
        });
        setShow(false);
    };

    const handleShow = () => {
        dispatch(
            getMovieShowtimesAction(movie.id, {
                day: moment().format("YYYY-MM-DD"),
            })
        );
        setShow(true);
    };

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Mua Vé
            </Button>
            <Modal size="lg" show={show} backdrop="static" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BookingPopUp movieId={movie.id} data={showtimes} />
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    );
}

export default BookingButton;
