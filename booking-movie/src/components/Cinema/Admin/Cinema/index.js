import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ModalForm from "./Modal";
import DataTable from "./DataTable";
import {
    getCinemasSelector,
    getCinemaTypesSelector,
} from "../../../../redux/selectors/cinemaSelector";

import {
    getAllCinemas,
    getCinemaTypes,
} from "../../../../redux/actions/cinemaActions";
import { getCineplexSelector } from "../../../../redux/selectors/cineplexSelector";
import { getAllCineplexs } from "../../../../redux/actions/cineplexActions";
import { Toaster } from "react-hot-toast";

function Cinema() {
    const cinemas = useSelector(getCinemasSelector);
    const cinemaTypes = useSelector(getCinemaTypesSelector);
    const cineplexs = useSelector(getCineplexSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCinemas());
        dispatch(getAllCineplexs());
        dispatch(getCinemaTypes());
    }, [dispatch]);

    return (
        <>
            <Toaster />
            <Row>
                <Col>
                    <h1 className="text-center fs-1 fw-bold mt-3">Cinemas</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ModalForm
                        isShow={false}
                        cineplexs={cineplexs}
                        cinemaTypes={cinemaTypes}
                        method="add"
                        title="Add New Cinema"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataTable
                        cinemaTypes={cinemaTypes}
                        cinemas={cinemas}
                        cineplexs={cineplexs}
                    />
                </Col>
            </Row>
        </>
    );
}

export default Cinema;
