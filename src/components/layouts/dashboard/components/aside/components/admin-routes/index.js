import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';
import { AsideLine, Option, Icon } from './elements';

const AdminRoutes = ({ location: { pathname } }) => (
  <Fragment>
    <Link to="/add-company">
      <Option active={pathname === '/add-company'}>
        <Icon>
          <FiPlusSquare />
        </Icon>
        <p>Add Company</p>
        <AsideLine />
      </Option>
    </Link>
  </Fragment>
);

AdminRoutes.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(AdminRoutes);
