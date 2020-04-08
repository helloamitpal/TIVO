import * as actionTypes from './userActionTypes';

export const getUsers = (searchBy = '', searchStr = '') => (dispatch, getState, { api }) => {
  const param = (searchBy && searchStr) ? `?find=personalInfo.${searchBy}:${searchStr}` : '';
  dispatch({
    type: actionTypes.GET_USERS,
    promise: api.get(`/api/customerInfo${param}`),
    payload: {}
  });
};

export const fetchLinks = (url) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.FETCH_LINKS,
    promise: api.get(`/api/scrappers?url=${url}`),
    payload: {}
  });
};

export const fetchSavedLinks = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.FETCH_SAVED_LINKS,
    promise: api.get('/api/savedLinks'),
    payload: {}
  });
};

export const saveLink = (linkObj) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.SAVE_LINK,
    promise: api.post('/api/saveLink', linkObj),
    payload: {}
  });
};

export const fetchTopSavedLinks = (count) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.FETCH_TOP_SAVED_LINKS,
    payload: { count }
  });
};

export const removeLink = (id) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.REMOVE_LINK,
    promise: api.delete(`/api/removeLink?id=${id}`),
    payload: {}
  });
};

export const getLinkPreview = (url) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.PREVIEW_LINK,
    promise: api.get(`/api/preview?url=${url}`),
    payload: {}
  });
};
