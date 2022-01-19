import React from "react";
import "./Footer.scss";
function Footer() {
    const url = "#";
    const footerCate = [
        "Trang chủ",
        "Liên hệ",
        "Phim",
        "Tin tức",
        "Khuyến mãi",
    ];

    const footerOther = [
        "Về chúng tôi",
        "Liên hệ",
        "Chính sách bảo mật",
        "Quy định",
    ];

    const footerIcon = [
        {
            name: "facebook",
            icon: "fa fa-facebook",
        },
        {
            name: "twitter",
            icon: "fa fa-twitter",
        },
        {
            name: "dribbble",
            icon: "fa fa-dribbble",
        },
        {
            name: "linkedin",
            icon: "fa fa-linkedin",
        },
    ];

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h6>About</h6>
                        <ul className="text-justify">
                            <li>Footer For Nemo Cinema Website.</li>
                            <li>
                                Address: 39 Trưng Nữ Vương, Quân Thanh Khê , Đà
                                Nẵng
                            </li>
                            <li>
                                Liên Hệ:
                                <i className="fa fa-phone text-success mx-2"></i>
                                1900 0000
                            </li>
                        </ul>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Categories</h6>
                        <ul className="footer-links">
                            {footerCate.map((item, index) => (
                                <li key={index}>
                                    <a href={url}>{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Other</h6>
                        <ul className="footer-links">
                            {footerOther.map((item, index) => (
                                <li key={index}>
                                    <a href={url}>{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">
                            Copyright &copy; 2021 All by
                            <a href="#">Tai Nguyen</a>.
                        </p>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <ul className="social-icons">
                            {footerIcon.map((item, index) => (
                                <li key={index}>
                                    <a className={item.name} href={url}>
                                        <i className={item.icon}></i>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
