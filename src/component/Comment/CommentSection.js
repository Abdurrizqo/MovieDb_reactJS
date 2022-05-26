import React from "react";
import { Comment, Avatar, Form, Button, Input } from "antd";
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea
        rows={3}
        onChange={onChange}
        value={value}
        style={{ resize: "none" }}
      />
    </Form.Item>
    <Form.Item className="float-right">
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

function CommentSection() {
  return (
    <div className="md:col-span-2">
      <div className="bg-side-color p-8">
        <h3 className="text-white font-medium text-2xl">Commentt</h3>
        <Comment
          avatar={
            <Avatar
              alt="Han Solo"
              size={52}
              style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            >
              B
            </Avatar>
          }
          content={<Editor />}
        />
      </div>
    </div>
  );
}

export default CommentSection;
