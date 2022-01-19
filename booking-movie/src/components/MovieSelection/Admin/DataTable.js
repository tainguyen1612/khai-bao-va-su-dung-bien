import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";
import ReactDatatable from "@ashvin27/react-datatable";
import { orderBy } from "lodash";
import "../styles.scss";
import { useDispatch } from "react-redux";
import { removeMovie } from "../../../redux/actions/movieActions";
import ModalForm from "./Modal";
import moment from "moment";

function DataTable(props) {
    const { movies } = props;
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
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
            text: "Ảnh phim",
            sortable: true,
            cell: (movie) => {
                return <Image src={movie.poster} width={120}></Image>;
            },
        },
        {
            key: "title",
            text: "Tên phim",
            sortable: true,
            width: 150,
        },
        {
            key: "director",
            text: "Đạo diễn",
        },
        {
            key: "actor",
            text: "Diễn viên",
            width: 200,
        },
        {
            key: "genre",
            text: "Thể loại",
            width: 200,
        },
        {
            key: "running_time",
            text: "Thời gian",
            sortable: true,
        },
        {
            key: "release_date",
            text: "Ngày phát hành",
            sortable: true,
            cell: (movie) => {
                return moment(movie.release_date).format("DD/MM/YYYY");
            },
            width: 120,
        },
        {
            key: "state",
            text: "Trạng thái",
            sortable: true,
            cell: (movie) => {
                return movie.state === "now-showing"
                    ? "Sẵn sàng"
                    : "Coming Soon";
            },
        },
        {
            key: "active",
            text: "Active",
            sortable: true,
            cell: (movie) => {
                return movie.active === true ? "True" : "False";
            },
        },
        {
            key: "action",
            text: "Action",
            cell: (movie) => {
                return (
                    <Button
                        variant="danger"
                        onClick={() => deleteMovie(movie.id)}
                    >
                        <i className="fa fa-trash"></i>
                    </Button>
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

    const deleteMovie = (id) => {
        setIsShow((isShow) => !isShow);
        dispatch(removeMovie(id));
    };

    const rowClickedHandler = (event, data, rowIndex) => {
        setData(data);
        setIsShow((isShow) => !isShow);
    };

    return (
        <>
            {isShow ? (
                <ModalForm
                    isShow={isShow}
                    data={data}
                    method="eidt"
                    title="Edit Movie"
                />
            ) : (
                ""
            )}
            <ReactDatatable
                responsive
                hover
                config={config}
                records={movies}
                columns={columns}
                onRowClicked={rowClickedHandler}
            />
        </>
    );
}

export default DataTable;
