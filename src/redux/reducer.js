import { ADD_SEARCH_QUERY } from './action';

const initialState = {
  searchHistory: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SEARCH_QUERY:
      return {
        ...state,
        searchHistory: [...state.searchHistory, action.payload],
      };
    default:
      return state;
  }
};

export default searchReducer;
