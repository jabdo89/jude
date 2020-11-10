import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FiMessageCircle, FiUser } from 'react-icons/fi';
import { AsideLine, Option, Icon } from './elements';

const StudentRoutes = ({ location: { pathname }, username }) => (
  <Fragment>
    <Link to="/studentsMessages">
      <Option active={pathname.includes('students')}>
        <Icon>
          <FiMessageCircle />
        </Icon>
        <p>Students</p>
        <AsideLine />
      </Option>
    </Link>
    <Link to={`/@${username.firstName}`}>
      <Option active={pathname.includes('@')}>
        <Icon>
          <FiUser />
        </Icon>
        <p>Profile</p>
        <AsideLine />
      </Option>
    </Link>
  </Fragment>
);

StudentRoutes.defaultProps = {
  username: undefined
};

StudentRoutes.propTypes = {
  location: PropTypes.object.isRequired,
  username: PropTypes.object
};

const mapStateToProps = state => {
  return {
    username: state.firebase.profile,
    messages: state.company
  };
};

export default withRouter(connect(mapStateToProps)(StudentRoutes));
