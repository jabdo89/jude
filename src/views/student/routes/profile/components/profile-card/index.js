/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from '@common/card';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { updateProfilePic } from '@actions/authActions';
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

  render() {
    const { showEdit, uploadingProfileImg, showProfileModal } = this.state;
    const { user } = this.props;
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
                    Change Photo
                  </PhotoButton>
                )
              )}
            </ImageContainer>
            <Info
              firstName={user.firstName}
              lastName={user.lastName}
              description={user.description}
              username={user.username}
              major={user.major}
              semester={user.semester}
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
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    profileImg: PropTypes.string,
    semester: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    resume: PropTypes.string.isRequired
  }).isRequired,
  updateProfilePic: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfilePic: (url, user) => dispatch(updateProfilePic(url, user))
  };
};

export default connect(null, mapDispatchToProps)(ProfileCard);
