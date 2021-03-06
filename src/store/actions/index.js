import { getArticles, getArticle, postFavoritesArticle, deleteFavoritesArticle } from '../../services/ApiService';

const addArticles = (articles) => ({
  type: 'ADD_ARTICLES',
  payload: articles,
});

const updateLoading = (value) => ({
  type: 'UPDATE_LOADING',
  payload: value,
});

const updateArticlesCount = (count) => ({
  type: 'UPDATE_ARTICLES_COUNT',
  payload: count,
});

const updatePage = (page) => ({
  type: 'UPDATE_PAGE',
  payload: page,
});

const updateOffset = (offset) => ({
  type: 'UPDATE_OFFSET',
  payload: offset,
});

const updateArticleData = (data) => ({
  type: 'UPDATE_ARTICLE_DATA',
  payload: data,
});

const updateIsLogin = (value) => ({
  type: 'UPDATE_IS_LOGIN',
  payload: value,
});

const updateUserData = (data) => ({
  type: 'UPDATE_USER_DATA',
  payload: data,
});

const getNewArticles = (page) => async (dispatch) => {
  dispatch(updateLoading(true));
  const offset = (page - 1) * 5;
  dispatch(updateOffset(offset));

  dispatch(updatePage(page));

  const data = await getArticles(offset);
  const { articles, articlesCount } = data;
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
};

const onFollowArticle = (slug, page) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem('user')) || '';

  if (token) {
    await postFavoritesArticle(slug, token);
    const offset = (page - 1) * 5;

    const data = await getArticles(offset);
    const { articles } = data;
    dispatch(addArticles(articles));

    const dataArticle = await getArticle(slug);
    const { article: newArticle } = dataArticle;
    dispatch(updateArticleData(newArticle));
  }
};

const unFollowArticle = (slug, page) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem('user')) || '';
  if (token) {
    await deleteFavoritesArticle(slug, token);
    const offset = (page - 1) * 5;

    const data = await getArticles(offset);
    const { articles } = data;
    dispatch(addArticles(articles));

    const dataArticle = await getArticle(slug);
    const { article: newArticle } = dataArticle;
    dispatch(updateArticleData(newArticle));
  }
};

export {
  addArticles,
  updateLoading,
  updateArticlesCount,
  updatePage,
  updateOffset,
  updateArticleData,
  updateIsLogin,
  updateUserData,
  getNewArticles,
  getArticleData,
  onFollowArticle,
  unFollowArticle,
};
