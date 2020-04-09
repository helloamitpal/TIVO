import { handle } from 'redux-pack';

import * as actionTypes from './userActionTypes';
import userService from './userService';
import translate from '../../locale';

const initialState = {
  users: [],
  userDetails: null,
  errors: '',
  loading: false
};

const userReducer = (state = initialState, action = '') => {
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
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          errors: '',
          loading: true,
          ...payload
        }),
        success: (prevState) => {
          const { addOnServiceListLength, packageListLength, user: { personalInfo, tsn } } = prevState;
          const obj = userService.getSynthesizedUserDetails(payload, addOnServiceListLength, packageListLength);

          return {
            ...prevState,
            userDetails: {
              tsn,
              personalInfo,
              ...obj
            }
          };
        },
        failure: (prevState) => ({
          ...prevState,
          errors: translate('common.failed')
        }),
        finish: (prevState) => ({
          ...prevState,
          loading: false
        })
      });
    }

    // case actionTypes.GET_USER_DETAILS: {
    //   const newState = { ...state };
    //   const { error, user: { personalInfo, tsn }, addOnServices, packages, regions } = payload;
    //
    //   if (error) {
    //     newState.error = translate('common.failed');
    //     return newState;
    //   }
    //
    //   newState.userDetails = {
    //     tsn,
    //     personalInfo,
    //     addOnServices,
    //     packages,
    //     regions,
    //     error: ''
    //   };
    //
    //   return newState;
    // }

    default:
      return state;
  }
};

export default userReducer;
