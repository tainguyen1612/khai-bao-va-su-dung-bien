import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import DataTable from "./DataTable";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesSelector } from "../../../redux/selectors/movieSelector";
import { getAllMovies } from "../../../redux/actions/movieActions";
import ModalForm from "./Modal";
import { Toaster } from "react-hot-toast";

function Movie() {
    const movies = useSelector(getMoviesSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMovies());
    }, [dispatch]);

    return (
        <>
            <Toaster />
            <Row>
                <Col>
                    <h1 className="text-center fs-1 fw-bold mt-3">
                        Quản lý phim
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ModalForm
                        isShow={false}
                        method="add"
                        title="Add New Movie"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataTable movies={movies} />
                </Col>
            </Row>
        </>
    );
}

export default Movie;
