import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Form, Input, Checkbox, Divider } from 'antd';

import { postRegisterUser } from '../../services/ApiService';

import classes from './SignUpForm.module.scss';

function SignUpForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, email, password, checkbox } = values;

    if (checkbox) {
      await postRegisterUser(username, email, password);
      form.resetFields();
      navigate('/articles');
    }
  };

  return (
    <div className={classes['sign-in-form']}>
      <div className={classes.header}>Create new account</div>

      <div className={classes.main}>
        <Form form={form} name="sign-up" className={classes.form} onFinish={onSubmit}>
          <span className={classes.username}>Username</span>
          <Form.Item
            name="username"
            rules={[{ required: true, min: 3, max: 20, message: 'Username must be between 3 and 20 symbols' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <span className={classes.email}>Email address</span>
          <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please input email' }]}>
            <Input placeholder="Email address" />
          </Form.Item>
          <span className={classes.password}>Password</span>
          <Form.Item
            name="password"
            rules={[{ required: true, min: 6, max: 40, message: 'Password must be between 6 and 40 symbols' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <span className={classes.repeat_password}>Repeat Password</span>
          <Form.Item
            name="repeat"
            rules={[
              { required: true, message: 'Please repeat your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords must match'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Divider className={classes.divider} />
          <Form.Item
            name="checkbox"
            className={classes.agree}
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
          >
            <Checkbox>I agree to the processing of my personal information</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={classes.button}>
              Create
            </Button>
          </Form.Item>
          <div className={classes.comment}>
            {`Already have an account? `}
            <Link to="/sign-in">
              <span>Sign In.</span>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUpForm;
