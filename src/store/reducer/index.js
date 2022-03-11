const initialState = {
  articles: [],
  article: {},
  user: JSON.parse(localStorage.getItem('user')) || {},
  isLogin: !!localStorage.getItem('user'),
  loading: true,
  articlesCount: 0,
  page: 1,
  offset: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ARTICLES':
      return {
        ...state,
        articles: action.payload
      };
    
    case 'UPDATE_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    case 'UPDATE_ARTICLES_COUNT':
      return {
        ...state,
        articlesCount: action.payload
      }

    case 'UPDATE_PAGE':
      return {
        ...state,
        page: action.payload
      }

    case 'UPDATE_OFFSET':
      return {
        ...state,
        offset: action.payload
      }

    case 'UPDATE_ARTICLE_DATA':
      return {
        ...state,
        article: action.payload
      }

    case 'UPDATE_IS_LOGIN':
      return {
        ...state,
        isLogin: action.payload
      }

    case 'UPDATE_USER_DATA':
      return {
        ...state,
        user: action.payload
      }

    default:
      return state;
  };
};

export default reducer;
