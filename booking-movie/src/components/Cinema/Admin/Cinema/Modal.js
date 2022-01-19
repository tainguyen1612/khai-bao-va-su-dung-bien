import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FormAddEdit from "./FormAddEdit";

function ModalForm(props) {
    const [show, setShow] = useState(props.isShow);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const buutonAdd = (
        <Button variant="danger" className="mb-3" onClick={handleShow}>
            Thêm phòng phim
        </Button>
    );

    return (
        <>
            {props.method === "add" ? buutonAdd : ""}

            <Modal
                size="xl"
                show={show}
                backdrop="static"
                fullscreen={true}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title> {props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormAddEdit
                        handleClose={handleClose}
                        data={props.data}
                        cinemaTypes={props.cinemaTypes}
                        cineplexs={props.cineplexs}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button form="form-add-edit" variant="danger" type="submit">
                        {props.method === "add" ? "Submit" : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalForm;
