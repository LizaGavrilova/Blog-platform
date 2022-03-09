import axios from 'axios';

const apiBase = 'https://kata.academy:8021/api/';

const getArticles = async (offset = 0) => {
  const { data } = await axios.get(
    `${apiBase}articles?limit=10&offset=${offset}`
  );
  return data;
};

const getArticle = async (id) => {
  const { data } = await axios.get(
    `${apiBase}articles/${id}`
  );
  return data;
}

export {
  getArticles,
  getArticle
};