import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Movie from "../../components/MovieSelection/MovieList";

function MoviePage() {
    return (
        <>
            <Header />
            <Movie />
            <Footer />
        </>
    );
}

export default MoviePage;
