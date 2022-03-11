import { getArticles, getArticle } from '../../services/ApiService';

const addArticles = (articles) => ({
  type: 'ADD_ARTICLES',
  payload: articles
});

const updateLoading = (value) => ({
  type: 'UPDATE_LOADING',
  payload: value
});

const updateArticlesCount = (count) => ({
  type: 'UPDATE_ARTICLES_COUNT',
  payload: count
});

const updatePage = (page) => ({
  type: 'UPDATE_PAGE',
  payload: page
});

const updateOffset = (offset) => ({
  type: 'UPDATE_OFFSET',
  payload: offset
});

const updateArticleData = (data) => ({
  type: 'UPDATE_ARTICLE_DATA',
  payload: data
});

const updateIsLogin = (value) => ({
  type: 'UPDATE_IS_LOGIN',
  payload: value
})

const updateUserData = (data) => ({
  type: 'UPDATE_USER_DATA',
  payload: data
});

const getArticlesArr = () => async (dispatch) => {
  const data = await getArticles();
  const { articles, articlesCount} = data;
  dispatch(addArticles(articles));
  dispatch(updateArticlesCount(articlesCount));
  dispatch(updateLoading(false));
};

const getNewArticles = (page) => async (dispatch) => {
  dispatch(updateLoading(true));
  const offset = (page - 1) * 5;
  dispatch(updateOffset(offset));

  dispatch(updatePage(page));

  const data = await getArticles(offset);
  const { articles, articlesCount} = data;
  dispatch(addArticles(articles));
  dispatch(updateArticlesCount(articlesCount)); 
  dispatch(updateLoading(false)); 
};

const getArticleData = (slug) => async (dispatch) => {
  dispatch(updateLoading(true));
  const data = await getArticle(slug);
  const { article } = data;
  dispatch(updateArticleData(article));
  dispatch(updateLoading(false));
}

export {
  addArticles,
  updateLoading,
  updateArticlesCount,
  updatePage,
  updateOffset,
  updateArticleData,
  updateIsLogin,
  updateUserData,
  getArticlesArr,
  getNewArticles,
  getArticleData
};