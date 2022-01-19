import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner";
import MovieSelection from "../../components/MovieSelection/MovieHome";
import Event from "../../components/Event";
function Home() {
    return (
        <>
            <Header />
            <Banner />
            <MovieSelection />
            <Event />
            <Footer />
        </>
    );
}

export default Home;
