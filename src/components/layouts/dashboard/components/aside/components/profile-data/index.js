import React, { Component, Fragment } from 'react';
import Menu from './components/profile-menu';
import { Profile, Name, Text, DownIcon, Break, Avatar } from './elements';

class ProfileData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }

  toggleMenu = () => this.setState(({ showMenu }) => ({ showMenu: !showMenu }));

  render() {
    const { showMenu } = this.state;
    return (
      <Fragment>
        <Profile onClick={this.toggleMenu}>
          <Avatar size="36" src="/static/img/general/avatar.png" />
          <Text>
            Bienvenido,
            <Break />
            <Name>Abdo</Name>
          </Text>
          <DownIcon />
        </Profile>
        <Menu show={showMenu} toggleProfileMenu={this.toggleMenu} />
      </Fragment>
    );
  }
}

export default ProfileData;
