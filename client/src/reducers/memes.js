import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (memes = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return memes.map((meme) => (meme._id === action.payload._id ? action.payload : meme));
    case CREATE:
      return [...memes, action.payload];
    case UPDATE:
      return memes.map((meme) => (meme._id === action.payload._id ? action.payload : meme));
    case DELETE:
      return memes.filter((meme) => meme._id !== action.payload);
    default:
      return memes;
  }
};

