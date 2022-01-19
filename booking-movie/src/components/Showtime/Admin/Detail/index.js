import React, { useEffect } from "react";
import { Col, Form, Image, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import moment from "moment";
import DataTable from "./DataTable";
import ModalForm from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { getCineplexSelector } from "../../../../redux/selectors/cineplexSelector";
import { getShowtimesSelector } from "../../../../redux/selectors/showtimeSelector";
import { getAllCineplexs } from "../../../../redux/actions/cineplexActions";
import { getAllShowtimesByMovieId } from "../../../../redux/actions/showtimeActions";
import { Toaster } from "react-hot-toast";

function DetailMovie(props) {
    const { movie } = props.location.state ? props.location.state : {};
    const showtimes = useSelector(getShowtimesSelector);
    const cineplexs = useSelector(getCineplexSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllShowtimesByMovieId({ movie_id: movie?.id }));
        dispatch(getAllCineplexs());

        return () => {
            dispatch({ type: "REMOVE_ALL_SHOWTIMES" });
        };
    }, [dispatch, movie]);

    if (!movie) {
        return <Redirect to="/dashboard/showtimes" />;
    }

    return (
        <Row>
            <Toaster />
            <Col lg={3}>
                <Image src={movie?.poster} className="w-100 h-75" />
                <h2 className="fw-bold my-2">
                    Phim: <span className="fw-normal">{movie?.title}</span>
                </h2>
                <h3 className="fw-bold mb-2">
                    Ngày phát hành:
                    <span className="fw-normal">
                        {moment(movie?.release_date).format("DD/MM/YYYY")}
                    </span>
                </h3>
                <p className="fw-bold mb-2">
                    Thời gian:
                    <span className="fw-normal">
                        {movie?.running_time} phút
                    </span>
                </p>
                <p className="fw-bold mb-2">
                    Trạng thái:
                    <span className="fw-normal">
                        {movie?.state === "now-showing"
                            ? "Sẵn sàng"
                            : "Coming Soon"}
                    </span>
                </p>
            </Col>
            <Col>
                <ModalForm
                    cineplexs={cineplexs}
                    isShow={false}
                    method="add"
                    title="Add New Showtime"
                />
                <DataTable cineplexs={cineplexs} showtimes={showtimes} />
            </Col>
        </Row>
    );
}

export default DetailMovie;
