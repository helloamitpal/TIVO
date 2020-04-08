/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import config from '../config';
import NotFoundModule from '../modules/NotFound/Loadable';
// import UserCreateModule from '../modules/User/pages/create/Loadable';
import UserListModule from '../modules/User/pages/list/Loadable';
import DashboardModule from '../modules/Dashboard/pages/list/Loadable';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import LocaleContext from '../locale/localeContext';
import { setLocaleCookie } from '../services/cookieService';

const Router = () => {
  const [selectedLocale, setSelectedLocale] = useState(config.FALLBACK_LANGUAGE);

  // configuring toaser message
  toast.configure({
    autoClose: 3000,
    draggable: false,
    hideProgressBar: true,
    pauseOnHover: false
  });

  // setting up cookie for default language
  useEffect(() => {
    setLocaleCookie(config.FALLBACK_LANGUAGE);
  }, []);

  // updating cookie if language is selected
  const onChangeLocale = (val) => {
    setLocaleCookie(selectedLocale);
    setSelectedLocale(val);
  };

  return (
    <LocaleContext.Provider value={{ lang: selectedLocale }}>
      <div className="app-container">
        <ToastContainer />
        <Header onChangeLocale={onChangeLocale} />
        <div className="body-container container">
          <Switch>
            <Route
              exact
              path={config.USER_LIST_PAGE}
              render={(props) => <UserListModule {...props} />}
            />
            <Route
              exact
              path={config.DASHBOARD_PAGE}
              render={(props) => <DashboardModule {...props} />}
            />
            {/* <Route
              exact
              path={config.USER_CREATE_PAGE}
              render={(props) => <UserCreateModule {...props} />}
            />
            */}
            <Route path="" render={(props) => <NotFoundModule {...props} />} />
          </Switch>
        </div>
        <Footer />
      </div>
    </LocaleContext.Provider>
  );
};

export default withRouter(Router);
