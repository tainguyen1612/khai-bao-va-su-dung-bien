import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axiosClient from "../../api/admin/axiosClient";
import ReactDatatable from "@ashvin27/react-datatable";
import moment from "moment";

function Ticket() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const getTicket = async () => {
            const response = await axiosClient.get("/tickets");
            setTickets(response);
        };
        getTicket();

        return () => {
            setTickets([]);
        };
    }, []);

    const columns = [
        {
            key: "id",
            text: "ID",
            sortable: true,
            cell: (ticket, index) => {
                return index + 1;
            },
        },
        {
            key: "customer",
            text: "Khách hàng",
            sortable: true,
            cell: (ticket) => {
                return ticket.Booking.User.fullname;
            },
        },
        {
            key: "movie",
            text: "Phim",
            sortable: true,
            cell: (ticket) => {
                return ticket.Booking.Showtime.Movie.title;
            },
        },
        {
            key: "showtime",
            text: "Lịch chiếu",
            sortable: true,
            cell: (ticket) => {
                return (
                    <div>
                        <p>
                            {moment(ticket.Booking.Showtime.start_time).format(
                                "DD/MM/YYYY"
                            )}
                        </p>
                        <p>
                            From
                            {moment(ticket.Booking.Showtime.start_time).format(
                                "HH:mm A"
                            )}
                            To
                            {moment(ticket.Booking.Showtime.end_time).format(
                                "HH:mm A"
                            )}
                        </p>
                    </div>
                );
            },
        },
        {
            key: "cinema",
            text: "Phòng phim",
            sortable: true,
            cell: (ticket) => {
                return ticket.Booking.Showtime.Cinema.name;
            },
        },
        {
            key: "type",
            text: "Loại hình",
            sortable: true,
            cell: (ticket) => {
                return ticket.Booking.Showtime.Cinema.CinemaType.name;
            },
        },
        {
            key: "cineplex",
            text: "Cơ sở",
            sortable: true,
            cell: (ticket) => {
                return ticket.Booking.Showtime.Cinema.Cineplex.name;
            },
        },
        {
            key: "seat",
            text: "Số ghế",
            sortable: true,
            cell: (ticket) => {
                return ticket.seat_code;
            },
        },
        {
            key: "price",
            text: "Giá",
            sortable: true,
            cell: (ticket) => {
                return ticket.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                });
            },
        },
    ];

    const config = {
        page_size: 10,
        show_filter: true,
        show_length_menu: true,
        show_pagination: true,
        pagination: "advance",
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-center fs-1 fw-bold mt-3">
                        Quản lý vé
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ReactDatatable
                        responsive
                        hover
                        config={config}
                        records={tickets}
                        columns={columns}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Ticket;
