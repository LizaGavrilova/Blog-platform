import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { List, Pagination, Spin } from "antd";

import { ArticleItem } from '../ArticleItem';

import { getArticlesArr, getNewArticles } from '../../store/actions';

import classes from './ArticleList.module.scss';

function ArticleList() {
  const articles = useSelector((state) => state.articles);
  const articlesCount = useSelector((state) => state.articlesCount);
  const page = useSelector((state) => state.page);
  const loading = useSelector((state) => state.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticlesArr());
  }, []);

  return (
    loading ? (
      <div className={classes.spin}>
        <Spin
          size="large"
        />
      </div>
    ) : (
      <div className={classes.article_list}>
        <List
          dataSource={articles}
          renderItem={(article) => (
            <List.Item>
              <ArticleItem item={article} />
            </List.Item>
          )}
        />

        <div className={classes.pagination}>
          <Pagination
            current={page}
            total={articlesCount}
            pageSize={5}
            onChange={(value) => {
              dispatch(getNewArticles(value))
            }}
            size="small"
          />
        </div>      
      </div>
    )
  )
}

export default ArticleList;