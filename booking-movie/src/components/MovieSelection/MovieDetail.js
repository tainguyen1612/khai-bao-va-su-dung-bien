import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getMovieBySlugSelector,
    getMovieComment,
} from "../../redux/selectors/movieSelector";
import {
    getCommentByUser,
    getMovieBySlugAction,
    addCommentByUser,
} from "../../redux/actions/movieActions";
import moment from "moment";
import BookingButton from "../Booking/BookingButton";
import "./styles.scss";

function MovieDetail() {
    const { slug } = useParams();
    const movie = useSelector(getMovieBySlugSelector);
    const comment = useSelector(getMovieComment);
    const dispatch = useDispatch();
    const history = useHistory();
    const [userComment, setUserComment] = useState("");
    const user = JSON.parse(localStorage.getItem("user")) || null;

    const movieInfo = [
        {
            title: "Đạo diễn :",
            content: movie.director,
        },
        {
            title: "Diễn viên :",
            content: movie.actor,
        },
        {
            title: "Thể loại :",
            content: movie.genre,
        },
        {
            title: "Khởi chiếu :",
            content: moment(movie.release_date).format("DD/MM/YYYY"),
        },
        {
            title: "Thời lượng :",
            content: movie.running_time + "Phút",
        },
    ];

    useEffect(() => {
        dispatch(getCommentByUser(slug));
        dispatch(getMovieBySlugAction(slug, history));

        return () => {
            dispatch({
                type: "REMOVE_MOVIE_DETAIL",
            });
            dispatch({
                type: "REMOVE_COMMENT_MOVIE",
            });
        };
    }, [dispatch, slug, history]);

    const getYoutubeVideoId = (url) => {
        if (!url) {
            return null;
        }

        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return match && match[2].length === 11 ? match[2] : null;
    };

    const addComment = (e) => {
        e.preventDefault();
        const newComment = {
            email: user.email,
            avatar: user.avatar,
            dateComment: moment(new Date()).format("YYYY-M-D h:mm:ss"),
            comment: userComment,
            slug: slug,
        };
        dispatch(addCommentByUser(newComment, slug));
        setUserComment("");
    };

    const handleComment = (e) => {
        setUserComment(e.target.value);
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col className="col-3">
                    <div className="text-center">
                        <Image
                            src={movie.poster}
                            height={350}
                            className="img-cover w-80"
                            alt={movie.title}
                        ></Image>
                    </div>
                </Col>
                <Col className="col-9">
                    <div>
                        <h5 className="fw-bold fs-2 my-3">{movie.title}</h5>
                    </div>
                    <hr className="my-1" />
                    {movieInfo.map((item, index) => (
                        <div
                            key={index}
                            className={index === 0 ? "my-3" : "mb-3"}
                        >
                            <span className="fw-bold">{item.title}</span>
                            <span>{item.content}</span>
                        </div>
                    ))}

                    {movie.state === "now-showing" ? (
                        <div className="mt-2">
                            <BookingButton movie={movie} isShow={false} />
                        </div>
                    ) : (
                        "Coming Son"
                    )}
                </Col>
            </Row>
            <Row className="mt-2">
                <h1 className="movie__title my-3">Nội dung phim</h1>
                <Col className="col-12 mb-3">
                    <p className="text-justify lh-base">{movie.description}</p>
                </Col>
            </Row>
            <Row className="mt-2 text-center">
                <div className="movie__video">
                    <iframe
                        className="px-0 mb-0"
                        title={movie.title}
                        controls
                        allowFullScreen
                        src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                            movie.trailer
                        )}`}
                    />
                </div>
            </Row>
            <h1 className="movie__title">Bình luận</h1>
            <Row
                className="mt-2 text-center"
                className={!user ? "d-none" : "d-block"}
            >
                <Col>
                    <Form onSubmit={addComment}>
                        <Form.Group className="comment-area w-100 my-3">
                            <Form.Control
                                as="textarea"
                                className="form-control"
                                placeholder="Your comment"
                                type="text"
                                rows="4"
                                id="comment"
                                value={userComment}
                                onChange={handleComment}
                            />
                        </Form.Group>
                        <Button type="submit" variant="success">
                            Gửi
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="my-3 text-center">
                <Col className="col-12 comment">
                    {comment.map((el, index) => (
                        <div key={index} className="mb-3 comment__box">
                            <img
                                src={el.avatar}
                                alt="comment avatar"
                                className="rounded-circle"
                                width="40"
                                height="40"
                            />
                            <h4>
                                {el.email}
                                <span>{el.dateComment}</span>
                            </h4>
                            <br />
                            <p>{el.comment}</p>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default MovieDetail;
