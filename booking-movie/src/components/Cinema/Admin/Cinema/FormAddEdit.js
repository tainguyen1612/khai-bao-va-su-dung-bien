import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
    createCinema,
    updateCinema,
} from "../../../../redux/actions/cinemaActions";
import "./style.scss";

function FormAddEdit(props) {
    const cinema = props.data;
    const { cineplexs, cinemaTypes } = props;
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const renderSeats = (vertical_size, horizontal_size) => {
        let chr;
        let seat_code;
        let cols = [];
        let rows = [];

        for (let i = 0; i < vertical_size; i++) {
            for (let j = 1; j <= horizontal_size; j++) {
                chr = String.fromCharCode(65 + i);
                seat_code = chr + j.toString();
                cols.push(
                    <div key={seat_code} className="seats">
                        {seat_code}
                    </div>
                );
            }

            rows.push(
                <div key={chr} className="row-clone justify-content-center">
                    {cols.map((col, i) => {
                        return col;
                    })}
                </div>
            );

            cols = [];
        }
        return rows;
    };

    const [elementSeats, setElementSeats] = useState(
        cinema
            ? renderSeats(cinema?.vertical_size, cinema?.horizontal_size)
            : []
    );

    const onAddSubmit = (data) => {
        dispatch(createCinema(data));
        props.handleClose();
    };

    const onUpdateSubmit = (data) => {
        dispatch(updateCinema(data, cinema.id));
        props.handleClose();
    };

    const onChangeVerticalSize = () => {
        const verticalSize = document.getElementById("vertical").value;
        const horizontalSize = document.getElementById("horizontal").value;

        if (verticalSize && horizontalSize) {
            const seatsRows = renderSeats(verticalSize, horizontalSize);
            setElementSeats(seatsRows);
        }
    };

    const onChangeHorizontalSize = () => {
        const verticalSize = document.getElementById("vertical").value;
        const horizontalSize = document.getElementById("horizontal").value;

        if (verticalSize && horizontalSize) {
            const seatsRows = renderSeats(verticalSize, horizontalSize);
            setElementSeats(seatsRows);
        }
    };

    return (
        <Form
            id="form-add-edit"
            onSubmit={
                cinema
                    ? handleSubmit(onUpdateSubmit)
                    : handleSubmit(onAddSubmit)
            }
        >
            <Row>
                <Form.Group className="mt-3">
                    <Form.Label className="form-group required control-label">
                        Cơ sở
                    </Form.Label>
                    <Form.Control
                        as="select"
                        defaultValue={
                            cinema?.cineplex_id ? cinema?.cineplex_id : ""
                        }
                        aria-label="Select Cineplex"
                        {...register("cineplex_id")}
                        required
                    >
                        {cineplexs.map((cineplex, i) => {
                            return (
                                <option key={i} value={cineplex.id}>
                                    {cineplex.name}
                                </option>
                            );
                        })}
                    </Form.Control>
                </Form.Group>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mt-3">
                        <Form.Label className="form-group required control-label">
                            Phòng phim
                        </Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={cinema?.name ? cinema?.name : ""}
                            {...register("name")}
                            autoComplete="name"
                            required
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mt-3">
                        <Form.Label className="form-group required control-label">
                            Loại hình
                        </Form.Label>
                        <Form.Control
                            as="select"
                            defaultValue={
                                cinema?.cinemaType_id
                                    ? cinema?.cinemaType_id
                                    : ""
                            }
                            aria-label="Select Types"
                            {...register("cinemaType_id")}
                            required
                        >
                            {cinemaTypes.map((type, i) => {
                                return (
                                    <option key={i} value={type.id}>
                                        {type.name}
                                    </option>
                                );
                            })}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mt-3">
                        <Form.Label className="form-group required control-label">
                            Kích thước chiều ngang ghế
                        </Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            id="vertical"
                            defaultValue={
                                cinema?.vertical_size
                                    ? cinema?.vertical_size
                                    : ""
                            }
                            {...register("vertical_size")}
                            onChange={(e) => {
                                register("vertical_size").onChange(e);
                                onChangeVerticalSize(e);
                            }}
                            autoComplete="vertical_size"
                            required
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mt-3">
                        <Form.Label className="form-group required control-label">
                            Kích thước chiều dọc ghế
                        </Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            id="horizontal"
                            defaultValue={
                                cinema?.horizontal_size
                                    ? cinema?.horizontal_size
                                    : ""
                            }
                            {...register("horizontal_size")}
                            onChange={(e) => {
                                register("horizontal_size").onChange(e);
                                onChangeHorizontalSize(e);
                            }}
                            autoComplete="horizontal_size"
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
            <div className="mt-4 text-center">
                <img
                    className="mb-4"
                    alt="screen"
                    src="https://i.imgur.com/uPARdNz.png"
                />
                {elementSeats}
            </div>
        </Form>
    );
}

export default FormAddEdit;
