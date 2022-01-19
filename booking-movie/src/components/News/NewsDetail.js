import React, { useEffect } from "react";
import { Col, Row, Container, Figure, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetailNews } from "../../redux/actions/newsAction";
import { getNewDetailSelector } from "../../redux/selectors/newsSelector";
import "./news.scss";

function NewsDetail() {
    const { id } = useParams();
    const detailNew = useSelector(getNewDetailSelector);
    const dispatch = useDispatch();

    const advi = [
        "http://pgworld.vn/wp-content/uploads/2018/07/VN.jpg",
        "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2020/04/du-an-phim-viet-em-va-trinh.jpg?fit=620%2C20000&quality=95&ssl=1",
        "https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.6435-9/123362721_203177384540287_3948376171804636576_n.png?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=qF0ldAqdkEYAX8ztwqK&_nc_ht=scontent.fsgn2-2.fna&oh=d514d5f3a62023953a5e70af397f99c0&oe=61625753",
    ];

    useEffect(() => {
        dispatch(getDetailNews(id));
    }, [dispatch]);

    return (
        <Container>
            <Row>
                <Col lg={9} md={12} sm={12} xs={12}>
                    <article>
                        <h1 className="news__header">{detailNew.title}</h1>
                        <section>
                            <Figure>
                                <Figure.Image
                                    alt="image for section 1"
                                    src={detailNew.image1}
                                />
                                <Figure.Caption className="text-center">
                                    {detailNew.title}
                                </Figure.Caption>
                            </Figure>
                            <p className="news__title">
                                {detailNew.description1}
                            </p>
                        </section>
                        <section>
                            <Figure>
                                <Figure.Image
                                    width="100%"
                                    height="100%"
                                    alt="image for section 2"
                                    src={detailNew.image2}
                                />
                                <Figure.Caption className="text-center">
                                    {detailNew.title}
                                </Figure.Caption>
                            </Figure>
                            <p className="news__title">
                                {detailNew.description2}
                            </p>
                        </section>
                        <section>
                            <Figure>
                                <Figure.Image
                                    width="100%"
                                    height="100%"
                                    alt="image for section 3"
                                    src={detailNew.image3}
                                />
                                <Figure.Caption className="text-center">
                                    {detailNew.title}
                                </Figure.Caption>
                            </Figure>
                            <p className="news__title">
                                {detailNew.description3}
                            </p>
                        </section>
                    </article>
                </Col>
                <Col lg={3} className="d-none d-lg-block">
                    <h1 className="news__header text-center">Quảng Cáo</h1>
                    {advi.map((el, index) => {
                        return (
                            <Image
                                className="mb-3"
                                src={el}
                                key={index}
                                thumbnail
                            />
                        );
                    })}
                </Col>
            </Row>
        </Container>
    );
}

export default NewsDetail;
