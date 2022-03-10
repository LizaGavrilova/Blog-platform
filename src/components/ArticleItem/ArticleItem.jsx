import React from "react";
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { Link } from "react-router-dom";

import { HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

import foto from '../../image/profile-foto.png';

import classes from './ArticleItem.module.scss';


function ArticleItem({ item }) {
  const { slug, title, description, updatedAt, tagList, favoritesCount, author } = item;

  const date = format(new Date(updatedAt), "MMMM d',' yyyy");

  return (
    <div className={classes.article}>
      <div className={classes.article_info}>
        <div className={classes.header}>
          <div className={classes.title}>
            <Link to={`/articles/${slug}`}>{title}</Link>
          </div>
          <HeartOutlined />
          <div className={classes.follow}>
            {favoritesCount}
          </div>
        </div>
        <div className={classes.tags}>
          {
            tagList.map((tag) => (<span key={shortid.generate()}>{tag}</span>))
          }
        </div>
        <div className={classes.text}>
          {description}          
        </div>
      </div>

      <div className={classes.user}>
        <div className={classes.user_info}>
          <div className={classes.name}>
            {author.username}
          </div>
          <div className={classes.date}>
            {date}
          </div>
        </div>
        <div className={classes.foto}>
          <img src={(author.image) ? author.image : foto} alt="profile" />
        </div>
      </div>
    </div>
  )
};

ArticleItem.defaultProps = {
  item: {}
};

ArticleItem.propTypes = {
  item: PropTypes.object
};

export default ArticleItem;