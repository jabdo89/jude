import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    const { profile } = this.props;
    return (
      <Fragment>
        <Profile onClick={this.toggleMenu}>
          <Avatar size="36" src={profile.profileImg || '/static/img/general/avatar.png'} />
          <Text>
            Welcome,
            <Break />
            <Name>{profile.firstName || profile.companyName}</Name>
          </Text>
          <DownIcon />
        </Profile>
        <Menu show={showMenu} toggleProfileMenu={this.toggleMenu} />
      </Fragment>
    );
  }
}
ProfileData.defaultProps = {
  profile: undefined
};
ProfileData.propTypes = {
  profile: PropTypes.object
};
const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(ProfileData);
