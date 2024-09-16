export const ADD_SEARCH_QUERY = 'ADD_SEARCH_QUERY';

export const addSearchQuery = (query) => ({
  type: ADD_SEARCH_QUERY,
  payload: query,
});