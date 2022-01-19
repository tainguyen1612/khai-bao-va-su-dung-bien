import React, { useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import ModalForm from "./Modal";
import { removeCinema } from "../../../../redux/actions/cinemaActions";

function DataTable(props) {
    const { cinemas, cineplexs, cinemaTypes } = props;
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    const columns = [
        {
            key: "id",
            text: "ID",
            sortable: true,
            cell: (cinema, index) => {
                return index + 1;
            },
        },
        {
            key: "name",
            text: "Phòng phim",
            sortable: true,
        },
        {
            key: "cineplex",
            text: "Cơ sở",
            sortable: true,
            cell: (cinema) => {
                return cinema.Cineplex.name;
            },
        },
        {
            key: "cinemaType",
            text: "Loại hình",
            sortable: true,
            cell: (cinema) => {
                return cinema.CinemaType.name;
            },
        },
        {
            key: "vertical_size",
            text: "Kích thước ngang",
        },
        {
            key: "horizontal_size",
            text: "kích thước dọc",
        },
        {
            key: "action",
            text: "Action",
            cell: (cinema) => {
                return (
                    <>
                        <Button
                            variant="primary"
                            className="me-2"
                            onClick={(e, data, rowIndex) => rowClickedHandler}
                        >
                            <i className="fa fa-edit"></i>
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => deleteCinema(cinema.id)}
                        >
                            <i className="fa fa-trash"></i>
                        </Button>
                    </>
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

    const deleteCinema = (id) => {
        setIsShow((isShow) => !isShow);
        dispatch(removeCinema(id));
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
                    cineplexs={cineplexs}
                    cinemaTypes={cinemaTypes}
                    method="eidt"
                    title="Edit Cinema"
                />
            ) : (
                ""
            )}
            <ReactDatatable
                responsive
                hover
                config={config}
                records={cinemas}
                columns={columns}
                onRowClicked={rowClickedHandler}
            />
        </>
    );
}

export default DataTable;
