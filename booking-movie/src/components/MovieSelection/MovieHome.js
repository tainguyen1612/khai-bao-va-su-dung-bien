import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../node_modules/swiper/swiper.min.css";
import "../../../node_modules/swiper/components/pagination/pagination.min.css";
import "../../../node_modules/swiper/components/navigation/navigation.min.css";
import "./styles.scss";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import { Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesSelector } from "../../redux/selectors/movieSelector";
import { getAllMoviesByStateAction } from "../../redux/actions/movieActions";
import { Link } from "react-router-dom";

SwiperCore.use([Autoplay, Pagination, Navigation]);

function MovieSelection() {
    const movies = useSelector(getMoviesSelector);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllMoviesByStateAction({ state: "now-showing" }));

        return () => {
            dispatch({
                type: "REMOVE_MOVIES",
            });
        };
    }, [dispatch]);
    console.log(movies);
    return (
        <Container className="my-5">
            <Row>
                <h2 className="movie__title">Phim đang chiếu</h2>
                <div className="text-center mt-3">
                    <div className="px-0 mt-3">
                        <Swiper
                            slidesPerView={5}
                            spaceBetween={30}
                            slidesPerGroup={1}
                            autoplay={{
                                delay: 1500,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            loopFillGroupWithBlank={true}
                        >
                            {movies.map((movie, i) => (
                                <SwiperSlide key={i}>
                                    <Link to={"/movies/detail/" + movie.slug}>
                                        <Image
                                            className="img-movie"
                                            src={movie.poster}
                                        />
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </Row>
        </Container>
    );
}

export default MovieSelection;
