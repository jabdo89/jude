/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {
  updateProfilePic,
  companyChangePassword,
  clearCompanyPassword
} from '@actions/authActions';
import { Card, CardBody } from '@common/card';
import Modal from '@common/modal';
import toast from '@common/toast';
import crop from '@common/cropper';
import Dropzone from '@templates/dropzone';
import Info from './components/info';
import { ImageContainer, Image, ProfileImgLoader, PhotoButton, CameraIcon } from './elements';

class ProfileCard extends Component {
  state = {
    showEdit: false,
    showProfileModal: false,
    uploadingProfileImg: false,
    // eslint-disable-next-line react/no-unused-state
    url: '',
    // eslint-disable-next-line react/no-unused-state
    progress: ''
  };

  simulateUpload = image =>
    new Promise(resolve => {
      const { user } = this.props;
      const storage = firebase.storage();
      const uploadTaskPDF = storage.ref(`images/${user.email}`).put(image);
      uploadTaskPDF.on(
        'state_changed',
        snapshot => {
          // progress function ...
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          // eslint-disable-next-line react/no-unused-state
          this.setState({ progress });
        },
        error => {
          // Error function ...
          console.error(error);
        },
        () => {
          // complete function ...
          storage
            .ref('images')
            .child(user.email)
            .getDownloadURL()
            .then(url => {
              // eslint-disable-next-line react/no-unused-state
              this.setState({ url });
              this.props.updateProfilePic(url, user.userID);
              resolve();
            });
        }
      );
    });

  toggleModal = () =>
    this.setState(({ showProfileModal }) => ({
      showProfileModal: !showProfileModal
    }));

  uploadImage = async image => {
    this.setState({
      uploadingProfileImg: true
    });

    await this.simulateUpload(image);

    this.setState({
      uploadingProfileImg: false
    });
    toast.secondary('Success', 'Image was upload correctly');
  };

  setFile = async imageFile => {
    this.toggleModal();
    const image = await crop(imageFile, 1, 'Recorta tu imagen de perfil');
    this.uploadImage(image);
  };

  toggleEdit = showEdit => this.setState({ showEdit });

  sendPasswordChangeEmail = email => {
    this.props.companyChangePassword(email);
  };

  render() {
    const { showEdit, uploadingProfileImg, showProfileModal } = this.state;
    const { user, companyChangePasswordValue } = this.props;

    if (companyChangePasswordValue === 'Company Password Changed Succesfully') {
      NotificationManager.success(
        'Check your emails to change your password',
        'Email sent Succesfully!'
      );
      this.props.clearCompanyPassword(this.state);
    }
    if (companyChangePasswordValue === 'Company Password Error') {
      NotificationManager.warning('Please try again :(', 'Error on Request');
      this.props.clearCompanyPassword(this.state);
    }

    return (
      <Fragment>
        <Card mt={80}>
          <CardBody>
            <ImageContainer
              onMouseOver={() => this.toggleEdit(true)}
              onMouseLeave={() => this.toggleEdit(false)}
            >
              <Image
                uploading={uploadingProfileImg}
                src={user.profileImg || '/static/img/general/avatar.png'}
              />
              {uploadingProfileImg ? (
                <ProfileImgLoader />
              ) : (
                showEdit && (
                  <PhotoButton
                    onClick={this.toggleModal}
                    variant="soft"
                    size="small"
                    color="default"
                  >
                    <CameraIcon />
                    Cambiar foto
                  </PhotoButton>
                )
              )}
            </ImageContainer>
            <Info
              description={user.description}
              companyName={user.companyName}
              major={user.major}
              semester={user.semester}
              changePassword={() => this.sendPasswordChangeEmail(user.email)}
            />
          </CardBody>
        </Card>
        <Modal
          active={showProfileModal}
          title="Cambiar foto de perfil"
          closeButton={this.toggleModal}
          primaryColor="primary"
        >
          <Dropzone
            accept="image/jpeg, image/png"
            defaultMessage="Arrastra tu nueva foto de portada o haz click para seleccionar desde tu dispositivo"
            acceptMessage="Suelta tu imagen aquí"
            rejectMessage="Formato de imagen no soportado"
            setFile={this.setFile}
            maxSize={2000000}
          />
        </Modal>
      </Fragment>
    );
  }
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    userID: PropTypes.string,
    email: PropTypes.string,
    companyName: PropTypes.string.isRequired,
    profileImg: PropTypes.string,
    semester: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    resume: PropTypes.string.isRequired
  }).isRequired,
  updateProfilePic: PropTypes.func.isRequired,
  companyChangePassword: PropTypes.func.isRequired,
  clearCompanyPassword: PropTypes.func.isRequired,
  companyChangePasswordValue: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    companyChangePasswordValue: state.auth.companyChangePassword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfilePic: (url, user) => dispatch(updateProfilePic(url, user)),
    companyChangePassword: email => dispatch(companyChangePassword(email)),
    clearCompanyPassword: email => dispatch(clearCompanyPassword(email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
