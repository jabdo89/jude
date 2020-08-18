import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FiLayers, FiMessageCircle, FiStar, FiUser } from 'react-icons/fi';
import { AsideLine, Option, Icon } from './elements';

const StudentRoutes = ({ location: { pathname }, username }) => (
  <Fragment>
    <Link to="/job-offers">
      <Option active={pathname.includes('job-offers')}>
        <Icon>
          <FiStar />
        </Icon>
        <p>Job Offers</p>
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
    <Link to="/interviews">
      <Option active={pathname.includes('interviews')}>
        <Icon>
          <FiMessageCircle />
        </Icon>
        <p>Interviews</p>
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
