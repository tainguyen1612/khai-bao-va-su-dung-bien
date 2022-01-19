import React, { useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { loginAction } from "../../redux/actions/authActions";
import { getUserSelector } from "../../redux/selectors/authSelector";
import "./style.scss";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({ mode: "all" });
    const isLogined = useSelector((state) => state.auth.isLogined);
    const faiLogin = useSelector((state) => state.auth.error);
    const user = useSelector(getUserSelector);
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(faiLogin);
    const onSubmit = (data) => {
        dispatch(loginAction(data));
    };
    useEffect(() => {
        if (isLogined) {
            history.push("/");
        }
        if (faiLogin) {
            setError("email", { type: "manual", message: faiLogin });
        }
    }, [history, isLogined]);

    // console.log(formState.errors);

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
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        {...register("email")}
                        required
                    />
                    {errors.email && (
                        <p className="error">{errors.email.message}</p>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        autoComplete="password"
                        {...register("password")}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Submit
                    </Button>
                </Form.Group>
                <hr className="my-3 mx-auto" style={{ width: "80%" }} />
                <Form.Group className="mb-3 w-75 m-auto d-flex justify-content-between">
                    <Link className="link-danger" to="/register">
                        Đăng ký
                    </Link>
                    <Link className="link-dark" to="/forgot-password">
                        Quên mật khẩu?
                    </Link>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default Login;
