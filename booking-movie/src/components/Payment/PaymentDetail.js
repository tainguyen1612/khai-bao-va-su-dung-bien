import React from "react";
import { useLocation, Redirect, useParams, Link } from "react-router-dom";
import { Image, Container, Row, Col } from "react-bootstrap";

function PaymentDetail() {
    const location = useLocation();
    const { id } = useParams();
    const barcode = `https://www.barcodesinc.com/generator/image.php?code=${id}&style=196&type=C128B&width=600&height=80&xres=1&font=16`;

    if (!location.state) {
        return <Redirect to="/" />;
    }

    return (
        <Container className="my-3">
            <Row>
                <Col className="d-flex align-items-center justify-content-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="65"
                        height="65"
                        fill="#4CAF50"
                        className="bi bi-check2-circle"
                        viewBox="0 0 16 16"
                    >
                        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                    </svg>
                    <h3 className="text-center">ĐẶT VÉ THÀNH CÔNG</h3>
                </Col>
                <h2 className="text-center mt-2">
                    Mã vạch xác nhận khi đến quầy vé
                    <span className="d-block mt-2">
                        ( Bắt buộc phải đem theo để xác nhận hoá đơn khi đến
                        quầy )
                    </span>
                </h2>
                <Image src={barcode}></Image>
            </Row>
            <Row className="justify-content-center">
                <Link className="btn btn-outline-danger w-25 m-2" to="/">
                    TRANG CHỦ
                </Link>

                <Link
                    className="btn btn-outline-danger w-25 m-2"
                    to="/movies/now-showing"
                >
                    TIẾP TỤC ĐẶT VÉ
                </Link>
            </Row>
        </Container>
    );
}

export default PaymentDetail;
