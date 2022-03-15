import axios from 'axios';

const apiBase = 'https://kata.academy:8021/api/';

const getArticles = async (offset = 0) => {
  const { token } = JSON.parse(localStorage.getItem('user')) || '';
  const { data } = await axios.get(`${apiBase}articles?limit=5&offset=${offset}`, {
    headers: { Authorization: `Token ${token}` },
  });
  return data;
};

const getArticle = async (id) => {
  const { token } = JSON.parse(localStorage.getItem('user')) || '';
  const { data } = await axios.get(`${apiBase}articles/${id}`, {
    headers: { Authorization: `Token ${token}` },
  });
  return data;
};

const postRegisterUser = async (username, email, password) => {
  const { data } = await axios.post(`${apiBase}users`, {
    user: {
      username,
      email,
      password,
    },
  });
  return data;
};

const postExistingUser = async (email, password) => {
  const { data } = await axios.post(`${apiBase}users/login`, {
    user: {
      email,
      password,
    },
  });
  return data;
};

const putExistingUser = async (username, email, password, image, token) => {
  const { data } = await axios.put(
    `${apiBase}user`,
    {
      user: {
        username,
        email,
        password,
        image,
      },
    },
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
  return data;
};

const postCreateArticle = async (title, description, text, tagList, token) => {
  const { data } = await axios.post(
    `${apiBase}articles`,
    {
      article: {
        title,
        description,
        body: text,
        tagList: tagList || [],
      },
    },
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
  return data;
};

const putUpdateAticle = async (slug, title, description, text, tagList, token) => {
  const { data } = await axios.put(
    `${apiBase}articles/${slug}`,
    {
      article: {
        title,
        description,
        body: text,
        tagList: tagList || [],
      },
    },
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
  return data;
};

const deleteArticle = async (slug, token) => {
  await axios.delete(`${apiBase}articles/${slug}`, {
    headers: { Authorization: `Token ${token}` },
  });
};

const postFavoritesArticle = async (slug, token) => {
  const { data } = await axios.post(
    `${apiBase}articles/${slug}/favorite`,
    {},
    {
      headers: { Authorization: `Token ${token}` },
    }
  );
  return data;
};

const deleteFavoritesArticle = async (slug, token) => {
  const { data } = await axios.delete(`${apiBase}articles/${slug}/favorite`, {
    headers: { Authorization: `Token ${token}` },
  });
  return data;
};

export {
  getArticles,
  getArticle,
  postRegisterUser,
  postExistingUser,
  putExistingUser,
  postCreateArticle,
  putUpdateAticle,
  deleteArticle,
  postFavoritesArticle,
  deleteFavoritesArticle,
};
