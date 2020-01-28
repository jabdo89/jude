/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from '@common/card';
import Modal from '@common/modal';
import toast from '@common/toast';
import crop from '@common/cropper';
import Dropzone from '@templates/dropzone';
import Info from './components/info';
import { ImageContainer, Image, ProfileImgLoader, PhotoButton, CameraIcon } from './elements';

const simulateUpload = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

class ProfileCard extends Component {
  state = {
    showEdit: false,
    showProfileModal: false,
    uploadingProfileImg: false
  };

  toggleModal = () =>
    this.setState(({ showProfileModal }) => ({
      showProfileModal: !showProfileModal
    }));

  uploadImage = async () => {
    this.setState({
      uploadingProfileImg: true
    });

    await simulateUpload();

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
    companyName: PropTypes.string.isRequired,
    profileImg: PropTypes.string,
    semester: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    resume: PropTypes.string.isRequired
  }).isRequired
};

export default ProfileCard;
