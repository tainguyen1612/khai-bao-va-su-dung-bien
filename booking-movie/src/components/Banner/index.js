import React from "react";
import { Carousel, Button } from "react-bootstrap";
import "./styles.scss";

function Banner() {
    const banners = [
        {
            img:
                "https://vcdn1-giaitri.vnecdn.net/2018/02/19/settopblackpanther-1519020125.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=VBTw_gpXrg1GexIlJ9GF2w",
            title: "Black Panther",
        },
        {
            img: "https://images6.alphacoders.com/614/thumb-1920-614303.jpg",
            title: "Super Women",
        },
        {
            img:
                "https://sites.google.com/site/blogluutruvachiase/_/rsrc/1414217319717/home/phim-vien-tuong/transformers-age-of-extinction-ky-nguyen-huy-diet/2014-06-Transformers-Age-of-Extinction-2014-1600x1000.jpg",
            title: "Transfomer",
        },
        {
            img:
                "https://static2.cbrimages.com/wordpress/wp-content/uploads/2021/03/WandaVision-Scarlet-Witch-costume-finale-1.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5",
            title: "WandaVision",
        },
    ];

    return (
        <Carousel fade className="banner">
            {banners.map((item, index) => (
                <Carousel.Item key={index} className="banner__item">
                    <div className="banner__overlay"></div>
                    <img
                        className="d-block w-100"
                        src={item.img}
                        alt={`slide ${index}`}
                    />
                    <Carousel.Caption className="banner__caption">
                        <h1>{item.title}</h1>

                        <div class="banner__info">
                            <i class="fa fa-star"></i>
                            <span>9.5</span>
                            <i class="fa fa-history ms-2"></i>
                            <span>120 mins</span>
                            <span>HD</span>
                            <span>16+</span>
                        </div>

                        <div class="banner__title">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quas, possimus eius. Deserunt non odit, cum
                            vero reprehenderit laudantium odio vitae autem quam,
                            incidunt molestias ratione mollitia accusantium,
                            facere ab suscipit.
                        </div>
                        <Button variant="outline-light">Xem Thêm</Button>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Banner;
