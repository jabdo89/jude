import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { AsideLine, Option, Icon } from './elements';

const AdminRoutes = ({ location: { pathname }, username }) => (
  <Fragment>
    <Link to={`/@${username}`}>
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

AdminRoutes.defaultProps = {
  username: 'abdo'
};

AdminRoutes.propTypes = {
  location: PropTypes.object.isRequired,
  username: PropTypes.string
};

export default withRouter(AdminRoutes);
