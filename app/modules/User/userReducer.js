import { handle } from 'redux-pack';

import * as actionTypes from './userActionTypes';
import translate from '../../locale';

const initialState = {
  users: [],
  errors: '',
  loading: false
};

const articleReducer = (state = initialState, action = '') => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_USERS:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          errors: '',
          loading: true
        }),
        success: (prevState) => ({
          ...prevState,
          users: payload ? [...payload] : []
        }),
        failure: (prevState) => ({
          ...prevState,
          errors: translate('common.failed')
        }),
        finish: (prevState) => ({
          ...prevState,
          loading: false
        })
      });

    case actionTypes.GET_USER_DETAILS: {
      const newState = { ...state };
      const { user: { personalInfo, tsn }, addOnServices, packages, regions } = payload;
      newState.userDetails = {
        tsn,
        personalInfo,
        addOnServices,
        packages,
        regions
      };

      return newState;
    }

    default:
      return state;
  }
};

export default articleReducer;
