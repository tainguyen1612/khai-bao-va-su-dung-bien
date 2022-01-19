import React, { useState } from "react";
import moment from "moment";
import { Col, Form, Image, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createMovie, updateMovie } from "../../../redux/actions/movieActions";

function AddEditPopUp(props) {
    const movie = props.data;
    console.log(movie);
    const getId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return match && match[2].length === 11 ? match[2] : null;
    };

    const [startDate, setStartDate] = useState(
        movie?.release_date ? new Date(moment(movie?.release_date)) : new Date()
    );
    const [picture, setPicture] = useState(
        movie?.poster ? movie?.poster : null
    );
    const [videoId, setVideoId] = useState(
        movie?.trailer ? getId(movie?.trailer) : null
    );

    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const onAddSubmit = (data) => {
        data.release_date = moment(startDate).format("YYYY-MM-DD");

        let bodyFormData = new FormData();

        Object.keys(data).forEach((key) => {
            if (key === "poster") {
                bodyFormData.append(key, data[key][0]);
            } else {
                bodyFormData.append(key, data[key]);
            }
        });
        dispatch(createMovie(bodyFormData));
        console.log("add");
        props.handleClose();
    };

    const onUpdateSubmit = (data) => {
        data.release_date = moment(startDate).format("YYYY-MM-DD");

        let bodyFormData = new FormData();

        Object.keys(data).forEach((key) => {
            if (key === "poster") {
                bodyFormData.append(key, data[key][0]);
            } else {
                bodyFormData.append(key, data[key]);
            }
        });

        dispatch(updateMovie(bodyFormData, movie.id));
        console.log("update");
        props.handleClose();
    };

    const onChangePicture = (e) => {
        if (e.target.files.length !== 0) {
            setPicture(URL.createObjectURL(e.target.files[0]));
        }
    };

    const onChangeVideoId = (e) => {
        let id = getId(e.target.value);
        setVideoId(id);
    };

    return (
        <>
            <Form
                id="form-add-edit"
                onSubmit={
                    movie
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
                                {...register("poster")}
                                onChange={(e) => {
                                    register("poster").onChange(e);
                                    onChangePicture(e);
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Image src={picture} fluid />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label className="form-group required control-label">
                                Trailer
                            </Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={
                                    movie?.trailer ? movie?.trailer : ""
                                }
                                {...register("trailer")}
                                onChange={(e) => {
                                    register("trailer").onChange(e);
                                    onChangeVideoId(e);
                                }}
                                autoComplete="trailer"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe
                                    className="embed-responsive-item"
                                    title="video"
                                    width="100%"
                                    height="250"
                                    controls
                                    allowFullScreen
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                />
                            </div>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label className="form-group required control-label">
                                Tên phim
                            </Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={movie?.title ? movie?.title : ""}
                                {...register("title")}
                                autoComplete="title"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label className="form-group required control-label">
                                Mô tả
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                type="text"
                                className="text-break"
                                defaultValue={
                                    movie?.description ? movie?.description : ""
                                }
                                rows={10}
                                {...register("description")}
                                autoComplete="description"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label className="form-group required control-label">
                                Đạo diễn
                            </Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={
                                    movie?.director ? movie?.director : ""
                                }
                                {...register("director")}
                                autoComplete="director"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label className="form-group required control-label">
                                Diễn viên
                            </Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={movie?.actor ? movie?.actor : ""}
                                {...register("actor")}
                                autoComplete="actor"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label className="form-group required control-label">
                                Thể loại
                            </Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={movie?.genre ? movie?.genre : ""}
                                {...register("genre")}
                                autoComplete="genre"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label className="form-group required control-label">
                                Ngày phát hành
                            </Form.Label>

                            <DatePicker
                                className="form-control"
                                selected={startDate}
                                dateFormat="dd/MM/yyyy"
                                onChange={(date) => setStartDate(date)}
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label className="form-group required control-label">
                                Thời gian
                            </Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                defaultValue={
                                    movie?.running_time
                                        ? movie?.running_time
                                        : ""
                                }
                                {...register("running_time")}
                                autoComplete="running_time"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label className="form-group required control-label">
                                Trạng thái
                            </Form.Label>
                            <Form.Control
                                as="select"
                                defaultValue={movie?.state ? movie?.state : ""}
                                aria-label="Select state"
                                {...register("state")}
                                required
                            >
                                <option value="coming-soon">Coming Soon</option>
                                <option value="now-showing">Sẵn sàng</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label className="form-group required control-label">
                                Active
                            </Form.Label>
                            <Form.Control
                                as="select"
                                defaultValue={
                                    movie?.active.toString()
                                        ? movie?.active === true
                                        : ""
                                }
                                aria-label="Select active"
                                {...register("active")}
                                required
                            >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default AddEditPopUp;
