import React, { useEffect } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../stores/authSlice";

function Login({ reloadPage }) {
  const checkLoading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.isError);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!checkLoading && user) {
      reloadPage();
      window.location.reload();
    }
  }, [checkLoading, user]);

  const onFinish = (values) => {
    dispatch(userLogin(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {error ? (
        <Alert
          closable
          className="mb-6"
          message="The account name or password that you have entered is incorrect."
          type="error"
          showIcon
        />
      ) : (
        <></>
      )}
      <Form
        name="basic"
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          {checkLoading ? (
            <Button disabled={true} htmlType="submit">
              Submit
            </Button>
          ) : (
            <Button htmlType="submit">Submit</Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
