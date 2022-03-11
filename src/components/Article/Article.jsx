import React, { useEffect } from "react";
import shortid from 'shortid';
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import { HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

import { Spin } from "antd";

import foto from '../../image/profile-foto.png';

import { getArticleData } from '../../store/actions';

import classes from './Article.module.scss';

function Article() {
  const article = useSelector((state) => state.article);
  const loading = useSelector((state) => state.loading);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getArticleData(id));
  }, [dispatch, id])

  const date = (article.updatedAt) ? format(new Date(article.updatedAt), "MMMM d',' yyyy") : null;

  return (
    loading ? (
      <div className={classes.spin}>
        <Spin
          size="large"
        />
      </div>
    ) : (
      <div className={classes.article}>
        <div className={classes.article_header}>
          <div className={classes.article_info}>
            <div className={classes.header}>
              <div className={classes.title}>
                {article.title}
              </div>
              <HeartOutlined />
              <div className={classes.follow}>
                {article.favoritesCount}
              </div>
            </div>
            <div className={classes.tags}>
            {
              article.tagList ? (
                article.tagList.map((tag) => (<span key={shortid.generate()}>{tag}</span>))
              ) : null
            }
            </div>
            <div className={classes.text}>
              {article.description}          
            </div>
          </div>

          <div className={classes.user}>
            <div className={classes.user_info}>
              <div className={classes.name}>
              {article.author ? article.author.username : null}
              </div>
              <div className={classes.date}>
                {date}
              </div>
            </div>
            <div className={classes.foto}>
              <img src={article.author ? article.author.image : foto} alt="profile" />
            </div>
          </div>
        </div>

        <div className={classes.article_main}>
          <ReactMarkdown>
            {article.body}
          </ReactMarkdown>
        </div>
      </div>
    )   
  )
}

export default Article;