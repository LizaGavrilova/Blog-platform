import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Button, Form, Input } from 'antd';

import { postExistingUser } from '../../services/ApiService';
import { updateIsLogin, updateUserData } from '../../store/actions';

import classes from './SignInForm.module.scss';

function SignInForm() {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const { email, password } = values;
    const { user } = await postExistingUser( email, password);

    localStorage.setItem('user', JSON.stringify(user));

    dispatch(updateUserData(user));
    dispatch(updateIsLogin(!!localStorage.getItem('user')));

    form.resetFields();
    navigate('/articles');
  }

  return (
    <div className={classes['sign-in-form']}>
      <div className={classes.header}>
        Sign In
      </div>

      <div className={classes.main}>
        <Form form={form} name="sign-in" className={classes.form} onFinish={onSubmit}>
          <span className={classes.email}>Email address</span>
          <Form.Item name="email"
                    rules={[{required: true, type: 'email', message: 'Please input email'}]}>
            <Input placeholder="Email address" />
          </Form.Item>
          <span className={classes.password}>Password</span>
          <Form.Item name="password" rules={[{required: true, message: 'Please input password'}]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={classes.button}>
              Login
            </Button>
          </Form.Item>
          <div className={classes.comment}>
            {`Don’t have an account? `}
            <Link to="/sign-up">
              <span>Sign Up.</span>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default SignInForm;