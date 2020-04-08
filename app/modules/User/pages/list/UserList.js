import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import { toast } from 'react-toastify';

import * as userActionCreator from '../../userActionCreator';
import LoadingIndicator from '../../../../components/atoms/LoadingIndicator';
import Modal from '../../../../components/atoms/Modal';
import Message from '../../../../components/atoms/Message';
import translate from '../../../../locale';
import UserRow from '../../templates/UserRow';
import UserDetails from '../../templates/userDetails';

import '../../User.scss';

const UserListPage = ({
  userState: { loading, users, errors },
  userActions
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(-1);

  // make api call at the begining to fetch all saved links
  useEffect(() => {
    userActions.getUsers();
  }, [userActions]);

  // show toast message if any errror occurrs
  useEffect(() => {
    if (errors) {
      toast.error(errors);
    }
  }, [errors]);

  const head = (
    <Helmet key="user-list-page">
      <title>{translate('user.listTitle')}</title>
      <meta property="og:title" content="User list" />
      <meta
        name="description"
        content="Get list of all users in TIVO"
      />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );

  const onOpenUserDetails = (index) => {
    setSelectedUser(index);
    setModalOpen(true);
  };

  return (
    <div className="user-page-container row">
      {head}
      {loading && <LoadingIndicator />}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}><UserDetails details={users[selectedUser]} /></Modal>
      )}
      <div className="links-list-container">
        {users.length
          ? (
            <VirtualList
              height={400}
              width="100%"
              itemCount={users.length}
              itemSize={60}
              renderItem={({ index, style }) => {
                const { href, ...rest } = users[index];
                const rowProps = {
                  index,
                  style,
                  className: 'virtual-row',
                  ...rest
                };

                return (
                  <UserRow
                    key={`list-row-${index.toString()}`}
                    {...rowProps}
                    onClick={onOpenUserDetails}
                  />
                );
              }}
            />
          )
          : <Message description={translate('user.noUserFound')} />
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActionCreator, dispatch)
});

UserListPage.propTypes = {
  userState: PropTypes.object,
  userActions: PropTypes.object
};

UserListPage.defaultProps = {
  userState: {},
  userActions: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
