import React, { useContext } from "react";
import { Row, Col, Layout, Card, Typography, Form, Input, Button } from "antd";

import { useNavigation, useNotification, useTranslate } from "@hooks";
import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";

export interface ILoginForm {
    username: string;
    password: string;
}

export const LoginPage: React.FC = () => {
    const { Title } = Typography;

    const [form] = Form.useForm();
    const { push } = useNavigation();
    const notification = useNotification();
    const translate = useTranslate();

    const { login } = useContext<IAuthContext>(AuthContext);

    const onSubmit = (values: ILoginForm) => {
        login(values)
            .then(() => push("/"))
            .catch(() => {
                notification.error({
                    message: "Login Error",
                    description: "Invalid username or password",
                });
            });
    };

    return (
        <Layout>
            <Row
                justify="center"
                style={{
                    display: "flex",
                    alignContent: "center",
                    height: "100vh",
                }}
            >
                <Col xl={6} lg={8} md={12} sm={18} xs={22}>
                    <Card>
                        <Title level={2} style={{ textAlign: "center" }}>
                            {translate("common:pages.login.title", "Login")}
                        </Title>
                        <Form
                            className="ant-form-vertical"
                            form={form}
                            name="control-hooks"
                            onFinish={onSubmit}
                        >
                            <Form.Item
                                name="username"
                                label={translate(
                                    "common:pages.login.username",
                                    "Username",
                                )}
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label={translate(
                                    "common:pages.login.password",
                                    "Password",
                                )}
                                rules={[{ required: true }]}
                            >
                                <Input type="password" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                >
                                    label=
                                    {translate(
                                        "common:pages.login.title",
                                        "Login",
                                    )}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
};