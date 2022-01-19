import React, { useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import ModalForm from "./Modal";
import moment from "moment";
import { removeShowtime } from "../../../../redux/actions/showtimeActions";

function DataTable(props) {
    const { showtimes, cineplexs } = props;
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    const columns = [
        {
            key: "id",
            text: "ID",
            sortable: true,
            cell: (showtime, index) => {
                return index + 1;
            },
        },
        {
            key: "date",
            text: "Ngày chiếu",
            sortable: true,
            cell: (showtime) => {
                return moment(showtime?.start_time).format("DD/MM/YYYY");
            },
        },
        {
            key: "start_time",
            text: "Bắt đầu",
            sortable: true,
            cell: (showtime) => {
                return moment(showtime?.start_time).format("HH:mm A");
            },
        },
        {
            key: "end_time",
            text: "Kết thúc",
            sortable: true,
            cell: (showtime) => {
                return moment(showtime?.end_time).format("HH:mm A");
            },
        },
        {
            key: "cinema",
            text: "Phòng phim",
            sortable: true,
            cell: (showtime) => {
                return showtime?.Cinema.name;
            },
        },
        {
            key: "type",
            text: "Loại hình",
            sortable: true,
            cell: (showtime) => {
                return showtime?.Cinema.CinemaType.name;
            },
        },
        {
            key: "cineplex",
            text: "Cơ sở",
            sortable: true,
            cell: (showtime) => {
                return showtime?.Cinema.Cineplex.name;
            },
        },
        {
            key: "price",
            text: "Giá vé",
            sortable: true,
            cell: (showtime) => {
                return showtime?.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                });
            },
        },
        {
            key: "action",
            text: "Action",
            cell: (showtime) => {
                return (
                    <Button
                        className="button-trash"
                        onClick={() => deleteShowtime(showtime.id)}
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

    const deleteShowtime = (id) => {
        setIsShow((isShow) => !isShow);
        dispatch(removeShowtime(id));
    };

    const rowClickedHandler = (event, data, rowIndex) => {
        setData(data);
        setIsShow((isShow) => !isShow);
    };

    return (
        <>
            {isShow ? (
                <ModalForm
                    cineplexs={cineplexs}
                    isShow={isShow}
                    data={data}
                    method="eidt"
                    title="Edit Showtime"
                />
            ) : (
                ""
            )}
            <ReactDatatable
                responsive
                hover
                config={config}
                records={showtimes}
                columns={columns}
                onRowClicked={rowClickedHandler}
            />
        </>
    );
}

export default DataTable;
