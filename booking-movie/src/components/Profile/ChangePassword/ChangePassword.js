import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../../../redux/selectors/authSelector";
import { Redirect, useHistory } from "react-router-dom";
import { Container, Row, Image, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { changePasswordAction } from "../../../redux/actions/authActions";

function ChangePassword() {
    const user = useSelector(getUserSelector);
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmitData = (data) => {
        if (data.new_password !== data.confirm_new_password) {
            toast.error("Mật khẩu mới không khớp!");
        } else {
            dispatch(changePasswordAction(data, history));
        }
    };

    if (!user) {
        return <Redirect to="/login" />;
    }

    return (
        <>
            <Toaster />
            <Container className="w-50 my-3">
                <div className="d-flex flex-column align-items-center mt-2">
                    <Image
                        className="img-cover rounded-circle"
                        src={user.avatar}
                        width={180}
                        height={180}
                    />
                    <h3 className="fs-2 fw-bold">{user.fullname}</h3>
                </div>
                <Form id="form-edit" onSubmit={handleSubmit(onSubmitData)}>
                    <Row className="mt-2 form-padding">
                        <input
                            type="text"
                            autoComplete="username"
                            hidden
                        ></input>
                        <Form.Group>
                            <Form.Label className="form-group required control-label fw-bold">
                                Mật khẩu hiện tại
                            </Form.Label>
                            <Form.Control
                                type="password"
                                {...register("current_password")}
                                autoComplete="current-password"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label className="form-group required control-label fw-bold">
                                Mật khẩu mới
                            </Form.Label>
                            <Form.Control
                                type="password"
                                {...register("new_password")}
                                autoComplete="new-password"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label className="form-group required control-label fw-bold">
                                Xác nhận mật khẩu mới
                            </Form.Label>
                            <Form.Control
                                type="password"
                                {...register("confirm_new_password")}
                                autoComplete="confirm-new-password"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mt-3 text-center">
                            <Button variant="danger">Đổi mật khẩu</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Container>
        </>
    );
}

export default ChangePassword;
