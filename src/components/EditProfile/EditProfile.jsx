import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button, Form, Input } from 'antd';

import { putExistingUser } from '../../services/ApiService';
import { updateUserData } from '../../store/actions';

import classes from './EditProfile.module.scss';

function EditProfile() {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { username, email } = user 

  const onSubmit = async (values) => {
    const { username: name, email: mail, password, image } = values;
    const { token } = JSON.parse(localStorage.getItem('user'));

    const { user: updateUser } = await putExistingUser(name, mail, password, image, token);
    localStorage.setItem('user', JSON.stringify(updateUser));

    dispatch(updateUserData(updateUser));
    navigate('/articles');
  }

  return (
    <div className={classes['edit-profile-form']}>
      <div className={classes.header}>
        Edit Profile
      </div>

      <div className={classes.main}>
        <Form form={form} name="edit-profile" className={classes.form} onFinish={onSubmit}>
          <span className={classes.username}>Username</span>
          <Form.Item name="username"
                    initialValue={username}
                    rules={[{required: true, message: 'Please input username'}]}>
            <Input placeholder="Username" />
          </Form.Item>
          <span className={classes.email}>Email address</span>
          <Form.Item name="email"
                    initialValue={email}
                    rules={[{required: true, type: 'email', message: 'Please input email'}]}>
            <Input placeholder="Email address" />
          </Form.Item>
          <span className={classes.password}>New password</span>
          <Form.Item name="password"
                    rules={[{required: true, min: 6, max: 40, message: 'Password must be between 6 and 40 symbols'}]}>
            <Input placeholder="New password" />
          </Form.Item>
          <span className={classes.image}>Avatar image (url)</span>
          <Form.Item name="image" rules={[{required: true, type: 'url', message: 'Please input correct URL'}]}>
            <Input placeholder="Avatar image" />
          </Form.Item>         
          <Form.Item>
            <Button type="primary" htmlType="submit" className={classes.button}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default EditProfile;