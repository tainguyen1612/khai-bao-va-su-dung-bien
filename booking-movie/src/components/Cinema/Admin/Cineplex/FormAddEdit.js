import { format } from "crypto-js";
import React, { useState } from "react";
import { Col, Form, Image, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
    createCineplex,
    updateCineplex,
} from "../../../../redux/actions/cineplexActions";

function FormAddEdit(props) {
    const cineplex = props.data;

    const [picture, setPicture] = useState(
        cineplex?.image ? cineplex?.image : null
    );

    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const onAddSubmit = (data) => {
        let bodyFormData = new FormData();

        Object.keys(data).forEach((key) => {
            if (key === "image") {
                bodyFormData.append(key, data[key][0]);
            } else {
                bodyFormData.append(key, data[key]);
            }
        });
        dispatch(createCineplex(bodyFormData));
        props.handleClose();
    };

    const onUpdateSubmit = (data) => {
        let bodyFormData = new FormData();

        Object.keys(data).forEach((key) => {
            if (key === "image") {
                bodyFormData.append(key, data[key][0]);
            } else {
                bodyFormData.append(key, data[key]);
            }
        });

        dispatch(updateCineplex(bodyFormData, cineplex.id));
        props.handleClose();
    };

    const onChangePicture = (e) => {
        if (e.target.files.length !== 0) {
            setPicture(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <Form
            id="form-add-edit"
            onSubmit={
                cineplex
                    ? handleSubmit(onUpdateSubmit)
                    : handleSubmit(onAddSubmit)
            }
        >
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label className="form-group required control-label">
                            Hình ảnh
                        </Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            {...register("image")}
                            onChange={(e) => {
                                register("image").onChange(e);
                                onChangePicture(e);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Image src={picture} fluid />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group>
                        <Form.Label className="form-group required control-label">
                            Tên cơ sở
                        </Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={cineplex?.name ? cineplex?.name : ""}
                            {...register("name")}
                            autoComplete="name"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label className="form-group required control-label">
                            Địa chỉ
                        </Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={
                                cineplex?.address ? cineplex?.address : ""
                            }
                            {...register("address")}
                            autoComplete="address"
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}

export default FormAddEdit;
