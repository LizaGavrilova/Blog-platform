import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { format } from 'date-fns';

import { onFollowArticle, unFollowArticle } from '../../store/actions';

import foto from '../../image/profile-foto.png';

import classes from './ArticleItem.module.scss';

function ArticleItem({ item }) {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.page);
  const { slug, title, description, updatedAt, tagList, favorited, favoritesCount, author } = item;

  const date = format(new Date(updatedAt), "MMMM d',' yyyy");

  const unFollow = () => {
    dispatch(unFollowArticle(slug, page));
  };

  const onFollow = () => {
    dispatch(onFollowArticle(slug, page));
  };

  return (
    <div className={classes.article}>
      <div className={classes.article_info}>
        <div className={classes.header}>
          <div className={classes.title}>
            <Link to={`/articles/${slug}`}>{title}</Link>
          </div>
          {favorited ? (
            <HeartFilled style={{ color: 'red' }} onClick={unFollow} />
          ) : (
            <HeartOutlined onClick={onFollow} />
          )}
          <div className={classes.follow}>{favoritesCount}</div>
        </div>
        <div className={classes.tags}>
          {tagList.map((tag) => (
            <span key={shortid.generate()}>{tag}</span>
          ))}
        </div>
        <div className={classes.text}>{description}</div>
      </div>

      <div className={classes.user}>
        <div className={classes.user_info}>
          <div className={classes.name}>{author.username}</div>
          <div className={classes.date}>{date}</div>
        </div>
        <div className={classes.foto}>
          <img src={author.image ? author.image : foto} alt="profile" />
        </div>
      </div>
    </div>
  );
}

ArticleItem.defaultProps = {
  item: {},
};

ArticleItem.propTypes = {
  item: PropTypes.object,
};

export default ArticleItem;
