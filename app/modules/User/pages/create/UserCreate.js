import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import * as userActionCreator from '../../userActionCreator';
import LoadingIndicator from '../../../../components/atoms/LoadingIndicator';
import translate from '../../../../locale';

import '../../User.scss';

const UserCreatePage = ({
  userState: { errors, loading, createSuccess },
  userActions,
  history
}) => {
  const head = (
    <Helmet key="scrapper-page">
      <title>{translate('user.createUser')}</title>
      <meta property="og:title" content="User create" />
      <meta
        name="description"
        content="Create user in TIVO"
      />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );

  return (
    <div className="scrapper-page-container row">
      {head}
      {loading && <LoadingIndicator />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActionCreator, dispatch)
});

UserCreatePage.propTypes = {
  userState: PropTypes.object,
  userActions: PropTypes.object,
  history: PropTypes.object
};

UserCreatePage.defaultProps = {
  userState: {},
  userActions: {},
  history: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCreatePage);
