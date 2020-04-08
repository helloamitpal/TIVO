import { handle } from 'redux-pack';

import * as actionTypes from './dashboardActionTypes';
import translate from '../../locale';

const initialState = {
  errors: '',
  loading: false
};

const dashboardReducer = (state = initialState, action = '') => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.FETCH_LINKS:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          errors: '',
          loading: true
        }),
        success: (prevState) => ({
          ...prevState,
          links: payload ? [...payload] : []
        }),
        failure: (prevState) => ({
          ...prevState,
          errors: translate('common.tryAgainSometime')
        }),
        finish: (prevState) => ({
          ...prevState,
          loading: false
        })
      });

    default:
      return state;
  }
};

export default dashboardReducer;
