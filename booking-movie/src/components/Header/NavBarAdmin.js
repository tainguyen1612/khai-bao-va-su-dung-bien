import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";
import "./navbar.scss";

function Navbar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [active, setActive] = useState(0);

    const onSubmitLogout = () => {
        dispatch(logout());
        history.push("/admin/login");
    };

    const dataNav = [
        {
            url: "/dashboard",
            icon: "fa fa-th-large",
            name: "Dashboard",
        },
        {
            url: "/dashboard/movies",
            icon: "fa fa-film",
            name: "Movie",
        },
        {
            url: "/dashboard/cineplexs",
            icon: "fa fa-folder",
            name: "Cineplexs",
        },
        {
            url: "/dashboard/cinemas",
            icon: "fa fa-camera",
            name: "Cinema",
        },
        {
            url: "/dashboard/showtimes",
            icon: "fa fa-play-circle",
            name: "Showtimes",
        },
        {
            url: "/dashboard/tickets",
            icon: "fa fa-bookmark",
            name: "Tickets",
        },
        {
            url: "/dashboard/users",
            icon: "fa fa-user",
            name: "Users",
        },
    ];

    const changeActive = (index) => {
        setActive(index);
    };

    return (
        <div className="sidebar">
            <h1 className="sidebar__header">Nemo Admin</h1>

            <ul className="sidebar__list">
                {dataNav.map((item, index) => (
                    <li
                        key={index}
                        className={active === index ? "link__active" : ""}
                        onClick={() => changeActive(index)}
                    >
                        <Link to={item.url}>
                            <i className={item.icon}></i>
                            <span className="sidebar__links__name">
                                {item.name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <Link
                className="btn btn-danger w-100"
                to="/"
                onClick={onSubmitLogout}
            >
                LogOut
            </Link>
        </div>
    );
}

export default Navbar;
