import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FiUsers, FiLayers, FiMessageCircle, FiStar, FiUser } from 'react-icons/fi';
import { AsideLine, Option, Icon } from './elements';

const CompanyRoutes = ({ location: { pathname }, username }) => (
  <Fragment>
    <Link to="/students">
      <Option active={pathname.includes('students')}>
        <Icon>
          <FiUsers />
        </Icon>
        <p>Students</p>
        <AsideLine />
      </Option>
    </Link>
    <Link to="/requests">
      <Option active={pathname.includes('requests')}>
        <Icon>
          <FiLayers />
        </Icon>
        <p>Requests</p>
        <AsideLine />
      </Option>
    </Link>
    <Link to="/messages">
      <Option active={pathname.includes('messages')}>
        <Icon>
          <FiMessageCircle />
        </Icon>
        <p>Messages</p>
        <AsideLine />
      </Option>
    </Link>
    <Link to="/job-offers">
      <Option active={pathname.includes('job-offers')}>
        <Icon>
          <FiStar />
        </Icon>
        <p>Job Offers</p>
        <AsideLine />
      </Option>
    </Link>
    <Link to={`/@${username.companyName}`}>
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

CompanyRoutes.defaultProps = {
  username: undefined
};

CompanyRoutes.propTypes = {
  location: PropTypes.object.isRequired,
  username: PropTypes.object
};

const mapStateToProps = state => {
  return {
    username: state.firebase.profile,
    messages: state.company
  };
};
export default withRouter(connect(mapStateToProps)(CompanyRoutes));
