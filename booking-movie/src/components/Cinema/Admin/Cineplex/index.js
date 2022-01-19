import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ModalForm from "./Modal";
import DataTable from "./DataTable";
import { getCineplexSelector } from "../../../../redux/selectors/cineplexSelector";
import { getAllCineplexs } from "../../../../redux/actions/cineplexActions";
import { Toaster } from "react-hot-toast";

function Cineplex() {
    const cineplexs = useSelector(getCineplexSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCineplexs());
    }, [dispatch]);

    return (
        <>
            <Toaster />
            <Row>
                <Col>
                    <h1 className="text-center fs-1 fw-bold mt-3">Cineplexs</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ModalForm
                        isShow={false}
                        method="add"
                        title="Add New Cineplex"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataTable cineplexs={cineplexs} />
                </Col>
            </Row>
        </>
    );
}

export default Cineplex;
