import * as actionTypes from './dashboardActionTypes';

export const getDashboardData = (url) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.FETCH_LINKS,
    promise: api.get(`/api/scrappers?url=${url}`),
    payload: {}
  });
};

export const getDashboardData1 = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.FETCH_SAVED_LINKS,
    promise: api.get('/api/savedLinks'),
    payload: {}
  });
};
