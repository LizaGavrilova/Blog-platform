import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useSelector } from "react-redux";

import foto from '../../image/profile-foto.png';

import 'antd/dist/antd.min.css';
import classes from './Header.module.scss';

function Header() {
  const { isLogin } = useSelector((state) => state.user)

  return (
    <div className={classes.header}>
      <Link to="/articles" className={classes.header_title}>
        Realworld Blog
      </Link>
      {
        !isLogin ? (
          <div className={classes['header_not-login']}>
            <Button type="text" size="large">
              Sign In
            </Button>
            <Button type="text" size="large">
              Sign Up
            </Button>
          </div>                    
        ) : (
          <div className={classes['header_login-user']}>
            <Button type="text" size="large" className={classes['create-article']}>
              Create article
            </Button>
            <div className={classes['user-name']}>
              John Doe
            </div>
            <div className={classes['user-img']}>
              <img src={foto} alt="profile" />
            </div>
            <Button type="text" size="large" className={classes['log-out']}>
              Log Out
            </Button>
          </div>
        )
      }
    </div>
  )
}

export default Header;