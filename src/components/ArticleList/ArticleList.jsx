import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { List } from "antd";

import { getNewArticles } from '../../store/actions';

import classes from './ArticleList.module.scss';

function ArticleList() {
  const { articlesArr } = useSelector((state) => state.articles);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewArticles());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.articles}>
      <List
        dataSource={articlesArr}
      />
    </div>
  )
}

export default ArticleList;