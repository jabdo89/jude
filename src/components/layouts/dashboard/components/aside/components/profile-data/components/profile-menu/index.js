import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { signOut } from '@actions/authActions';
import { Container, PseudoContainer, Content, Option, ProfileIcon, ExitIcon } from './elements';

class ProfileMenu extends Component {
  state = {
    username: 'abdo'
  };

  handleLogout = () => {
    const { signOut: localeSignout } = this.props;
    localeSignout();
  };

  render() {
    const { username } = this.state;
    const { toggleProfileMenu, show } = this.props;
    return (
      <Container show={show}>
        <PseudoContainer onClick={toggleProfileMenu}>
          <Content>
            <Link to={`/@${username}`}>
              <Option>
                <ProfileIcon />
                Perfil
              </Option>
            </Link>
            <Option onClick={this.handleLogout}>
              <ExitIcon />
              Log out
            </Option>
          </Content>
        </PseudoContainer>
      </Container>
    );
  }
}

ProfileMenu.propTypes = {
  toggleProfileMenu: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default compose(
  connect(() => ({}), mapDispatchToProps),
  firestoreConnect([{ collection: 'JobOffers' }, { collection: 'Usuarios' }])
)(ProfileMenu);
