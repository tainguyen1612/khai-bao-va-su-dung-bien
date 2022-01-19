import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "./styles.scss";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import { Container, Image, Row } from "react-bootstrap";

SwiperCore.use([Autoplay, Pagination, Navigation]);

function Event() {
    const events = [
        "https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/n/9/n95_240x201_1.jpg",
        "https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/h/a/happy-new-year-240x201_1.png",
        "https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/d/o/doreamon_web_app_240x201.jpg",
        "https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv-crm-team-chi-1-duoc-2-240x201_1.jpg",
        "https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv_79k_240x201_170920.png",
    ];

    const eventImg = [
        "https://cdn2.tieudungplus.vn/media/uploaded/13/2015/10/28/Lotte_Cinema__3.jpg",
        "https://stc.shopiness.vn/deal/2020/03/04/0/e/0/9/1583303419036_540.png",
        "https://cdn.chanhtuoi.com/uploads/2016/04/lotte-cinema-nowzone-khuyen-mai-gia-ve-chi-30k.jpg",
    ];

    return (
        <Container>
            <Row>
                <h1 className="movie__title">Chuỗi sự kiện / Khuyễn mãi</h1>
                <div className="text-center mt-3">
                    <div className="px-0 mt-3">
                        <Swiper
                            slidesPerView={5}
                            spaceBetween={20}
                            slidesPerGroup={1}
                            autoplay={{
                                delay: 1500,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            loopFillGroupWithBlank={true}
                        >
                            {events.map((event, i) => (
                                <SwiperSlide key={i}>
                                    <Image className="img-event" src={event} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="my-3 d-flex justify-content-between">
                    {eventImg.map((item, index) => (
                        <div key={index} className="event__image">
                            <Image thumbnail src={item} alt="event cinema" />
                        </div>
                    ))}
                </div>
            </Row>
        </Container>
    );
}

export default Event;
