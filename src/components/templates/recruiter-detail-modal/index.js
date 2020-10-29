import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import Modal from '@common/modal';
import Button from '@common/button';
import Avatar from '@common/avatar';
import Typography from '@common/typography';
import { chooseRecruiter } from '../../../redux/Actions/recruiterActions';
import { Row, Column, ActionsContainer, RightIcon } from './elements';
// import Chart from './components/chart';

class DetailModal extends Component {
  chooseRecruiter = e => {
    e.preventDefault();
    const { user, profile } = this.props;
    this.props.chooseRecruiter(user.userID, profile.userID);
  };

  render() {
    const { user, active, closeButton } = this.props;
    return (
      <Fragment>
        <NotificationContainer />
        <Modal size="large" title="Student detail" active={active} closeButton={closeButton}>
          <Row>
            <Column basis="100">
              <Avatar
                ml="auto"
                mr="auto"
                size="120"
                src={user.profileImg || '/static/img/general/avatar.png'}
              />
              <Typography mt={20} variant="headingTitle" textAlign="center">
                {`${user.firstName} ${user.lastName}`}
              </Typography>

              <Typography my={20} variant="leadText" color="primary" textAlign="center">
                About
              </Typography>
              <Typography fontSize="14px" mb={20} textAlign="center">
                {user.description}
              </Typography>
              <ActionsContainer>
                <Button variant="soft" onClick={this.chooseRecruiter} color="secondary">
                  Choose Recruiter
                  <RightIcon />
                </Button>
              </ActionsContainer>
            </Column>
          </Row>
        </Modal>
      </Fragment>
    );
  }
}

DetailModal.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    userID: PropTypes.string,
    profileImg: PropTypes.string,
    description: PropTypes.string.isRequired
  }).isRequired,
  active: PropTypes.bool.isRequired,
  closeButton: PropTypes.func.isRequired,
  chooseRecruiter: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    chooseRecruiter: (recruiterID, profileID) => dispatch(chooseRecruiter(recruiterID, profileID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailModal);
