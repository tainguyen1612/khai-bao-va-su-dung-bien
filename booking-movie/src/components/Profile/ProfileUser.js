import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserSelector } from "../../redux/selectors/authSelector";
import { Container, Row, Image } from "react-bootstrap";
import ModalForm from "./EditPopUp/ModalForm";
import moment from "moment";
import "./style.scss";

function ProfileUser() {
    const user = useSelector(getUserSelector);

    if (!user) {
        return <Redirect to="/login" />;
    }

    return (
        <Container fluid className="py-3 mx-0 profile">
            <h1 className="text-center fw-bold fs-2 mb-3">THÔNG TIN CÁ NHÂN</h1>

            <div className="profile__image">
                <Image
                    className="rounded-circle"
                    src={user.avatar}
                    width={150}
                    height={150}
                />
                <h3 className="fw-bold fs-3 mt-3">{user.fullname}</h3>
            </div>
            <div className="mt-2 profile__info">
                <div className="profile__info__label">
                    <p>Họ và tên:</p>
                    <p>Email:</p>
                    <p>Ngày sinh:</p>
                    <p>Số điện thoại:</p>
                    <p>Địa chỉ:</p>
                </div>
                <div className="profile__info__title">
                    <p>{user.fullname}</p>
                    <p>{user.email}</p>
                    <p>{moment(user.birthday).format("DD/MM/YYYY")}</p>
                    <p>{user.phone}</p>
                    <p>{user.address}</p>
                </div>
                <div className="text-center mt-2 profile__modal">
                    <ModalForm data={user} isShow={false} />
                </div>
            </div>
        </Container>
    );
}

export default ProfileUser;
