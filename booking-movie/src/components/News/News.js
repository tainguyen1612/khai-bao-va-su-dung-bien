import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "../../redux/actions/newsAction";
import { getNewsSelector } from "../../redux/selectors/newsSelector";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./news.scss";

function News() {
    const news = useSelector(getNewsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllNews());
    }, [dispatch]);

    return (
        <Container>
            <h1 className="movie__title mt-3">Tin tức Phim</h1>
            {news.map((el, index) => {
                const url = "/news/detail/" + el.id;
                return (
                    <Row key={index} className="my-3">
                        <Col>
                            <Card className="news">
                                <Card.Img
                                    variant="left"
                                    src={el.image1}
                                    className="news__img"
                                />
                                <Card.Body className="news__body">
                                    <Card.Title className="fw-bold">
                                        {el.title}
                                    </Card.Title>
                                    <Card.Text>{el.description1}</Card.Text>
                                    <Link
                                        className="btn btn-outline-info p-1 mt-3"
                                        to={url}
                                    >
                                        More Info
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                );
            })}
        </Container>
    );
}

export default News;
