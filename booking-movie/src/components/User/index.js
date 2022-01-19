import React, { useEffect } from "react";
import { Col, Row, Image, Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/actions/authActions";
import ReactDatatable from "@ashvin27/react-datatable";
import moment from "moment";
import "./style.scss";

function User() {
    const dispatch = useDispatch();
    const lstUser = useSelector((state) => state.auth.lstUser);

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    const columns = [
        {
            key: "id",
            text: "ID",
            sortable: true,
            cell: (user, index) => {
                return index + 1;
            },
        },
        {
            key: "avatar",
            text: "Ảnh đại diện",
            sortable: true,
            cell: (user) => {
                return (
                    <Image
                        className="img_user_profile"
                        src={user.avatar}
                    ></Image>
                );
            },
        },
        {
            key: "fullname",
            text: "Tên đầy đủ",
            sortable: true,
        },
        {
            key: "phone",
            text: "Điện thoại",
            sortable: true,
        },
        {
            key: "email",
            text: "Email",
            sortable: true,
        },
        {
            key: "address",
            text: "Địa chỉ",
            sortable: true,
        },
        {
            key: "birthday",
            text: "Ngày sinh",
            sortable: true,
            cell: (user) => {
                return moment(user.birthday).format("DD/MM/YYYY");
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

    return (
        <Container>
            {lstUser === undefined ? (
                <Row className="justify-content-center align-items-center">
                    <Spinner
                        animation="border"
                        variant="danger"
                        role="status"
                        style={{ width: "5rem", height: "5rem" }}
                    ></Spinner>
                </Row>
            ) : (
                <>
                    <Row>
                        <Col>
                            <h1 className="text-center fs-1 fw-bold my-4">
                                DANH SÁCH NGƯỜI DÙNG
                            </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ReactDatatable
                                responsive
                                hover
                                config={config}
                                records={lstUser}
                                columns={columns}
                            />
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
}

export default User;
