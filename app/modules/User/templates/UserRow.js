import React from 'react';
import PropTypes from 'prop-types';

import './UserRow.scss';

const UserRow = ({ personalInfo: { name, email, img }, index, style, className, onClick }) => (
  <div style={style} className={`virtual-row ${className}`}>
    <img src={img} alt="user-profile-pic" />
    <div className="row-content">
      <div>{name}</div>
      <div>{email}</div>
    </div>
    <button type="button" className="preview" onClick={onClick}>
      <span className="material-icons">pageview</span>
    </button>
  </div>
);

UserRow.defaultProps = {
  style: {},
  className: ''
};

UserRow.propTypes = {
  personalInfo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

export default UserRow;
