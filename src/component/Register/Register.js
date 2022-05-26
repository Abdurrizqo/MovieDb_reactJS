import React, { useEffect } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../stores/authSlice";

function Register({ reloadPage }) {
  const error = useSelector((state) => state.auth.isError);
  const dispatch = useDispatch();
  const checkLoading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!checkLoading && user) {
      window.location.reload();
      reloadPage();
    }
  }, [checkLoading, user, reloadPage]);

  const onFinish = (values) => {
    dispatch(userRegister(values));
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
          message="Email has already been taken"
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
          label="first name"
          name="first_name"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="last name"
          name="last_name"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="emai"
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="password_confirmation"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
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

export default Register;
