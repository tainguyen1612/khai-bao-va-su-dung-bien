import React, { useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { orderBy } from "lodash";
import { Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeCineplex } from "../../../../redux/actions/cineplexActions";
import ModalForm from "./Modal";

function DataTable(props) {
    const { cineplexs } = props;
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    const columns = [
        {
            key: "id",
            text: "ID",
            sortable: true,
            cell: (cineplex, index) => {
                return index + 1;
            },
        },
        {
            key: "image",
            text: "Hình ảnh",
            sortable: true,
            cell: (cineplex) => {
                return <Image src={cineplex.image} width={120}></Image>;
            },
        },
        {
            key: "name",
            text: "Tên Cơ Sở",
            sortable: true,
            width: 300,
        },
        {
            key: "address",
            text: "Địa chỉ",
            sortable: true,
        },
        {
            key: "action",
            text: "Action",
            cell: (cineplex) => {
                return (
                    <>
                        <Button
                            variant="danger"
                            onClick={() => deleteCineplex(cineplex.id)}
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

    const deleteCineplex = (id) => {
        setIsShow((isShow) => !isShow);
        dispatch(removeCineplex(id));
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
                    title="Edit Cineplex"
                />
            ) : (
                ""
            )}
            <ReactDatatable
                responsive
                hover
                config={config}
                records={cineplexs}
                columns={columns}
                onRowClicked={rowClickedHandler}
            />
        </>
    );
}

export default DataTable;
