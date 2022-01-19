import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { registerAction } from "../../redux/actions/authActions";
import { Toaster } from "react-hot-toast";

function Register() {
    const { register, handleSubmit } = useForm();
    const isLogined = useSelector((state) => state.auth.isLogined);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (data) => {
        data.birthday = moment(data.birthday).format("YYYY-MM-DD");
        dispatch(registerAction(data));
    };

    const isNumber = (e) => {
        e.target.value = e.target.value
            .replace(/[^0-9.]/g, "")
            .replace(/(\..*?)\..*/g, "$1");
    };

    useEffect(() => {
        if (isLogined) {
            history.push("/");
        }
    }, [history, isLogined]);

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <Container className="my-5">
            <Toaster />
            <Form
                className="w-50 m-auto border"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="fs-1 text-center py-3">ĐĂNG NHẬP</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("fullname")}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Điện thoại</Form.Label>
                    <Form.Control
                        type="text"
                        maxLength="10"
                        onInput={isNumber}
                        {...register("phone")}
                        placeholder="09xxxxxx"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        {...register("email")}
                        placeholder="name@example.com"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                        type="password"
                        autoComplete="password"
                        {...register("password")}
                        placeholder="Password"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Ngày sinh</Form.Label>
                    <Form.Control
                        type="date"
                        {...register("birthday")}
                        placeholder="2000-07-10"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                        type="text"
                        {...register("address")}
                        placeholder="HCM"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default Register;
