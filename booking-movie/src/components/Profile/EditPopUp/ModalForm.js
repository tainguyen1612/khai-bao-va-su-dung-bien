import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FormData from "./FormData";

function ModalForm(props) {
    const [show, setShow] = useState(props.isShow);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Thay đổi thông tin
            </Button>
            <Modal
                size="lg"
                show={show}
                backdrop="static"
                onHide={handleClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thay đổi thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormData handleClose={handleClose} data={props.data} />
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="submit"
                        form="form-edit"
                        className="btn btn-primary color-primary"
                    >
                        <div>
                            <span>Đồng ý</span>
                        </div>
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalForm;
