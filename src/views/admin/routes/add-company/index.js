import React, { Component } from 'react';
import { createCompany } from '@actions/authActions';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { connect } from 'react-redux';
import Box from '@common/box';
import Input from '@common/input';
import { FaEnvelope, FaBars, FaBuilding, FaExternalLinkAlt } from 'react-icons/fa';
import Typography from '@common/typography';
import Textarea from '@common/textarea';
import Avatar from '@common/avatar';
import Dropzone from '@templates/dropzone';
import Button from '@common/button';
import CropModal from '@common/modal';
import crop from '@common/cropper';

class AddCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      website: '',
      companyPhoto: {
        file: null,
        bloblUrl: ''
      },
      description: '',
      email: '',
      showCropModal: false,
      url: '',
      password: ''
    };
  }

  toggleCropModal = () => {
    this.setState(({ showCropModal }) => ({ showCropModal: !showCropModal }));
  };

  handleInputChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  setImage = async imageFile => {
    this.toggleCropModal();
    const file = await crop(imageFile, 512 / 512, 'Crop company profile image');
    const blobUrl = URL.createObjectURL(file);
    this.setState({
      companyPhoto: { file, blobUrl }
    });
  };

  signUpCompany = () => {
    const storage = firebase.storage();
    const { companyPhoto, email } = this.state;
    const uploadTaskPDF = storage.ref(`curriculums/${email}`).put(companyPhoto.file);
    uploadTaskPDF.on(
      'state_changed',
      snapshot => {
        // progress function ...
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({ progress });
      },
      error => {
        // Error function ...
        console.error(error);
      },
      () => {
        // complete function ...
        storage
          .ref('curriculums')
          .child(email)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
            this.props.createCompany(this.state);
          });
      }
    );
  };

  render() {
    const {
      companyName,
      email,
      website,
      description,
      companyPhoto,
      showCropModal,
      password
    } = this.state;
    return (
      <Box mt={20} px={20}>
        <Typography mb={30} variant="leadText">
          Add a new company account
        </Typography>
        <Box display="flex" alignItems="center" width="fit-content" flexDirection="column">
          <Avatar size={120} src={companyPhoto.blobUrl || '/static/img/general/avatar.png'} />
          <Button
            onClick={this.toggleCropModal}
            size="small"
            variant="link"
            color="primary"
            type="button"
          >
            Change company photo
          </Button>
        </Box>
        <Input
          label="Company"
          name="companyName"
          onChange={this.handleInputChange}
          value={companyName}
          leftIcon={<FaBuilding />}
        />
        <Input
          label="Email"
          name="email"
          onChange={this.handleInputChange}
          value={email}
          leftIcon={<FaEnvelope />}
        />
        <Input
          label="Website"
          name="website"
          onChange={this.handleInputChange}
          value={website}
          leftIcon={<FaExternalLinkAlt />}
        />
        <Textarea
          label="Description"
          value={description}
          onChange={this.handleInputChange}
          name="description"
          rows="5"
          leftIcon={<FaBars />}
        />
        <Input
          label="Password"
          name="password"
          onChange={this.handleInputChange}
          value={password}
          leftIcon={<FaBuilding />}
        />
        <Box mt={20} display="flex" justifyContent="flex-end">
          <Button ml={10} variant="soft" color="primary" onClick={this.signUpCompany}>
            Add
          </Button>
        </Box>
        <CropModal
          active={showCropModal}
          title="Seleccionar imagen"
          closeButton={this.toggleCropModal}
          primaryColor="primary"
        >
          <Dropzone
            accept="image/jpeg, image/png"
            defaultMessage="Arrastra tu nueva imagen o haz click para seleccionar desde tu dispositivo"
            acceptMessage="Suelta tu imagen aquí"
            rejectMessage="Formato de imagen no soportado"
            setFile={this.setImage}
            maxSize={2000000}
          />
        </CropModal>
      </Box>
    );
  }
}

AddCompany.propTypes = {
  createCompany: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    createCompany: company => dispatch(createCompany(company))
  };
};

export default connect(null, mapDispatchToProps)(AddCompany);
