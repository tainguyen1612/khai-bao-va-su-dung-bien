import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddEditPopUp from "./AddEditPopUp";

function ModalForm(props) {
    const [show, setShow] = useState(props.isShow);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const butonAdd = (
        <Button variant="danger" className="mb-3" onClick={handleShow}>
            Thêm phim
        </Button>
    );

    return (
        <>
            {props.method === "add" ? butonAdd : ""}

            <Modal size="lg" show={show} backdrop="static" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddEditPopUp handleClose={handleClose} data={props.data} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" type="submit" form="form-add-edit">
                        {props.method === "add" ? "Submit" : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalForm;
