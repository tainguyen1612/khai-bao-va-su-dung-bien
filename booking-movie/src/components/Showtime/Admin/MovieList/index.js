import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesSelector } from "../../../../redux/selectors/movieSelector";
import { getAllMovies } from "../../../../redux/actions/movieActions";
import ReactDatatable from "@ashvin27/react-datatable";
import { orderBy } from "lodash";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

function MovieList() {
    const movies = useSelector(getMoviesSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMovies());
    }, [dispatch]);

    const columns = [
        {
            key: "id",
            text: "ID",
            sortable: true,
            cell: (movie, index) => {
                return index + 1;
            },
        },
        {
            key: "poster",
            text: "Ảnh",
            sortable: true,
            cell: (movie) => {
                return <Image src={movie.poster} width={120}></Image>;
            },
        },
        {
            key: "title",
            text: "Phim",
            sortable: true,
        },
        {
            key: "release_date",
            text: "Ngày phát hành",
            sortable: true,
            cell: (movie) => {
                return moment(movie.release_date).format("DD/MM/YYYY");
            },
        },
        {
            key: "running_time",
            text: "Thời gian",
            sortable: true,
            cell: (movie) => {
                return movie.running_time + " minutes";
            },
        },
        {
            key: "action",
            text: "Lịch chiếu",
            cell: (movie) => {
                const url = `/dashboard/showtimes/${movie.id}`;
                return (
                    <Link
                        className="btn btn-danger"
                        to={{ pathname: url, state: { movie } }}
                    >
                        Thêm lịch chiếu
                    </Link>
                );
            },
        },
    ];

    const config = {
        page_size: 5,
        show_filter: true,
        show_length_menu: true,
        show_pagination: true,
        pagination: "advance",
    };

    const onSort = (column, records, sortOrder) => {
        return orderBy(records, [column], [sortOrder]);
    };

    return (
        <ReactDatatable
            responsive
            hover
            config={config}
            records={movies}
            columns={columns}
            onSort={onSort}
        />
    );
}

export default MovieList;
