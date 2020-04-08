import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';


import '../../Dashboard.scss';

const DashboardListPage = ({
  scrapperState: { loading, errors },
  scrapperActions
}) => {
  return (<h1>Dashboard</h1>);
};

const mapStateToProps = (state) => ({
  scrapperState: state.scrapper
});

const mapDispatchToProps = (dispatch) => ({
  scrapperActions: bindActionCreators(scrapperActionCreator, dispatch)
});

DashboardListPage.propTypes = {
  scrapperState: PropTypes.object,
  scrapperActions: PropTypes.object
};

DashboardListPage.defaultProps = {
  scrapperState: {},
  scrapperActions: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardListPage);
