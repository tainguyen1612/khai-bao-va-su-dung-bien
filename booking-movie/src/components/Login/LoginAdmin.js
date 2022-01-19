import React from "react";
import { Col, Container, Form, Image, Row, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../redux/actions/authActions";
import { getUserSelector } from "../../redux/selectors/authSelector";

function Login() {
    const currentUser = useSelector(getUserSelector);
    const checkAdmin = useSelector((state) => state.auth.isAdmin);
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    console.log(checkAdmin);
    const onSubmit = (data) => {
        dispatch(login(data, history));
    };

    if (currentUser && checkAdmin === true) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Container fluid className="form__admin">
            <div className="form__overflow"></div>
            <Row>
                <Col className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center p-4">
                    <Image
                        className="mb-3"
                        width={200}
                        height={150}
                        src="https://seeklogo.com/images/M/movie-time-cinema-logo-8B5BE91828-seeklogo.com.png"
                    />

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3 text-left">
                            <Form.Label className="fw-bold">Email</Form.Label>
                            <Form.Control
                                {...register("email")}
                                type="email"
                                autoComplete="email"
                                placeholder="name@example.com"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 text-left">
                            <Form.Label className="fw-bold">
                                Password
                            </Form.Label>
                            <Form.Control
                                {...register("password")}
                                type="password"
                                placeholder="Password"
                                autoComplete="password"
                                required
                            />
                        </Form.Group>

                        <Button variant="danger" type="submit">
                            Đăng Nhập
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
