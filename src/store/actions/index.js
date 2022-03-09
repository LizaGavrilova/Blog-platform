import { getArticles } from '../../services/ApiService';

const addArticles = (articles) => ({
  type: 'ADD_ARTICLES',
  payload: articles
});

const updateLoading = (value) => ({
  type: 'UPDATE_LOADING',
  payload: value
})

const getNewArticles = () => async (dispatch) => {
  const data = await getArticles();
  const { articles } = data;
  dispatch(addArticles(articles));
  dispatch(updateLoading(false));
}

export {
  addArticles,
  updateLoading,
  getNewArticles
};