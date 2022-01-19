import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { getUserSelector } from "../../redux/selectors/authSelector";
import {
    getUserInfoAction,
    logoutAction,
} from "../../redux/actions/authActions";

import "./Header.scss";

function Header() {
    const user = useSelector(getUserSelector);
    const isLogined = user ? true : false;
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(user);

    const navBarData = [
        {
            url: "/",
            name: "Trang chủ",
        },
        {
            url: "/cineplexs",
            name: "Rạp",
        },
        {
            url: "/movies",
            name: "Phim",
            sub: [
                {
                    url: "/movies/now-showing",
                    name: "Phim Đang Chiếu",
                },
                {
                    url: "/movies/coming-soon",
                    name: "Phim Sắp Chiếu",
                },
            ],
        },
        {
            url: "/showtimes",
            name: "Lịch Chiếu",
        },
        {
            url: "/news",
            name: "Tin tức",
        },
    ];

    const userData = [
        {
            name: "Thông tin cá nhân",
            url: "/profile",
        },
        {
            name: "Lich sử đặt vé",
            url: "/history",
        },
        {
            name: "Đổi mật khẩu",
            url: "/change-password",
        },
        {
            name: "Đăng xuất",
            url: "/logout",
        },
    ];

    useEffect(() => {
        if (isLogined) {
            dispatch(getUserInfoAction());
        }
    }, [dispatch, isLogined]);

    const loginOnClick = () => {
        history.push("/login");
    };

    const registerOnClick = () => {
        history.push("/register");
    };

    const onLogout = (e) => {
        e.preventDefault();
        dispatch(logoutAction());
        history.push("/");
    };

    return (
        <header>
            <Container>
                <Navbar expand="lg">
                    <Navbar.Brand href={navBarData[0].url}>
                        <img
                            src="https://icon-library.com/images/nemo-icon/nemo-icon-11.jpg"
                            alt="logo cinema branch"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav style={{ width: "100%" }}>
                            <ul className="nav ms-lg-auto align-items-center justify-content-center flex-column flex-lg-row">
                                {navBarData.map((item, index) =>
                                    item.url === "/movies" ? (
                                        <li key={index} className="dropdown">
                                            <a
                                                href={item.url}
                                                className="nav-link px-4 link-dark fw-bold dropdown-toggle"
                                                data-bs-toggle="dropdown"
                                            >
                                                {item.name}
                                            </a>
                                            <ul className="dropdown-menu">
                                                {item.sub.map((sub, index) => (
                                                    <li key={index}>
                                                        <Link
                                                            to={sub.url}
                                                            className="dropdown-item"
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ) : (
                                        <li key={index}>
                                            <Link
                                                to={item.url}
                                                className="nav-link px-4 link-dark fw-bold menu-link"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    )
                                )}
                            </ul>
                            <div className="text-center text-lg-end ms-lg-auto">
                                {!user ? (
                                    <>
                                        <Button
                                            onClick={loginOnClick}
                                            variant="danger"
                                            className="me-3"
                                        >
                                            Đăng nhập
                                        </Button>
                                        <Button
                                            onClick={registerOnClick}
                                            variant="danger"
                                        >
                                            Đăng ký
                                        </Button>
                                    </>
                                ) : (
                                    <div className="dropdown">
                                        <Button
                                            className="dropdown-toggle header__user"
                                            id="dropdownMenuProfile"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            variant="outline-dark"
                                        >
                                            <div>
                                                <img
                                                    src={user.avatar}
                                                    alt="avatar"
                                                    width={36}
                                                    height={36}
                                                    className="rounded-circle"
                                                />
                                                <span className="text-center ms-1 mx-auto">
                                                    {user.fullname}
                                                </span>
                                            </div>
                                        </Button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuProfile"
                                        >
                                            {userData.map((item, index) =>
                                                item.url === "/logout" ? (
                                                    <li key={index}>
                                                        <a
                                                            className="dropdown-item"
                                                            onClick={onLogout}
                                                            href={item.url}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ) : (
                                                    <li key={index}>
                                                        <Link
                                                            className="dropdown-item"
                                                            to={item.url}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    );
}

export default Header;
