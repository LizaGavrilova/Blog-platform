import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { updateIsLogin, updateUserData } from '../../store/actions';

import foto from '../../image/profile-foto.png';

import 'antd/dist/antd.min.css';
import classes from './Header.module.scss';

function Header() {
  const isLogin = useSelector((state) => state.isLogin);
  const user = useSelector((state) => state.user);
  const { username, image } = user;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    localStorage.removeItem('user');

    dispatch(updateIsLogin(!!localStorage.getItem('user')));
    dispatch(updateUserData({}));

    navigate('/articles');
  };

  return (
    <div className={classes.header}>
      <Link to="/articles" className={classes.header_title}>
        Realworld Blog
      </Link>
      {!isLogin ? (
        <div className={classes['header_not-login']}>
          <Link to="/sign-in">
            <Button type="text" size="large">
              Sign In
            </Button>
          </Link>

          <Link to="/sign-up">
            <Button type="text" size="large">
              Sign Up
            </Button>
          </Link>
        </div>
      ) : (
        <div className={classes['header_login-user']}>
          <Link to="/new-article">
            <Button type="text" size="large" className={classes['create-article']}>
              Create article
            </Button>
          </Link>
          <Link to="/profile" className={classes.user}>
            <div className={classes['user-name']}>{username}</div>
            <div className={classes['user-img']}>
              <img src={image || foto} alt="profile" />
            </div>
          </Link>
          <Button type="text" size="large" className={classes['log-out']} onClick={logOut}>
            Log Out
          </Button>
        </div>
      )}
    </div>
  );
}

export default Header;
