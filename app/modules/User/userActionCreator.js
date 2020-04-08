import * as actionTypes from './userActionTypes';

export const getUsers = (searchBy = '', searchStr = '') => (dispatch, getState, { api }) => {
  const param = (searchBy && searchStr) ? `?find=personalInfo.${searchBy}:${searchStr}` : '';
  dispatch({
    type: actionTypes.GET_USERS,
    promise: api.get(`/api/customerInfo${param}`),
    payload: {}
  });
};

export const getUserDetails = (userObj) => (dispatch, getState, { api }) => {
  const { regionCode, package: packageNames, addOnService } = userObj;

  const apis = [];
  const addOnServiceList = addOnService.split(',');
  const packageList = packageNames.split(',');
  const regionList = regionCode.split(',');

  addOnServiceList.forEach((val) => {
    apis.push(api.get(`/api/addons?find=id:${val.trim()}`));
  });
  packageList.forEach((val) => {
    apis.push(api.get(`/api/packages?find=packageId:${val.trim()}`));
  });
  regionList.forEach((val) => {
    apis.push(api.get(`/api/regions?find=regionCode:${val.trim()}`));
  });

  Promise.all(apis).then((values) => {
    const obj = {};
    values.forEach((currentVal, index) => {
      let attr;

      if (index >= 0 && index <= addOnServiceList.length - 1) {
        attr = 'addOnServices';
      } else if (index >= addOnServiceList.length && index <= (packageList.length + addOnServiceList.length - 1)) {
        attr = 'packages';
      } else {
        attr = 'regions';
      }

      if (!obj[attr]) {
        obj[attr] = [...currentVal];
      } else {
        obj[attr] = [...obj[attr], ...currentVal];
      }
    });
    dispatch({
      type: actionTypes.GET_USER_DETAILS,
      payload: { user: { ...userObj }, ...obj }
    });
  });
};
