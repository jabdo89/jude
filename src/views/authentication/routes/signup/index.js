import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { studentSignUp } from '@actions/authActions';
import PropTypes from 'prop-types';
import Typography from '@common/typography';
import Box from '@common/box';
import { Card, CardBody } from '@common/card';
import toast from '@common/toast';
import Avatar from '@common/avatar';
import Button from '@common/button';
import CropModal from '@common/modal';
import Textarea from '@common/textarea';
import crop from '@common/cropper';
import Dropzone from '@templates/dropzone';
import {
  FaEnvelope,
  FaKey,
  FaRegUser,
  FaGraduationCap,
  FaHashtag,
  FaBuilding
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, Input, Select, Column } from './elements';

class Login extends Component {
  state = {
    step: 1,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    rol: '',
    mayor: '',
    semester: '',
    school: '',
    description: '',
    showCropModal: false,
    url: '',
    progress: 0,
    resume: null,
    image: {
      file: null,
      bloblUrl: ''
    }
  };

  handleSemesterChange = event => {
    // Checks for non-negative values
    if (Number(event.target.value) > 0) {
      this.handleChange(event);
    }
  };

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  handleSubmit = event => {
    event.preventDefault();
    const storage = firebase.storage();
    const { image, email, resume } = this.state;
    if (!resume) {
      toast.secondary('Resume required', 'You need to upload your resume to signup');
      return;
    }
    const uploadTask = storage.ref(`images/${email}`).put(image.file);
    uploadTask.on(
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
          .ref('images')
          .child(email)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
            const { studentSignUp: localeSignUp } = this.props;
            localeSignUp(this.state);
          });
      }
    );
  };

  setPdf = pdfFile =>
    this.setState({
      resume: pdfFile
    });

  setImage = async imageFile => {
    this.toggleCropModal();
    const file = await crop(imageFile, 512 / 512, 'Crop your profile image');
    const blobUrl = URL.createObjectURL(file);
    this.setState({
      image: { file, blobUrl }
    });
  };

  toggleCropModal = () => {
    this.setState(({ showCropModal }) => ({ showCropModal: !showCropModal }));
  };

  changeStep = step => {
    const { email, firstName, lastName, password, mayor, semester, school } = this.state;
    if (step === 2) {
      if (!email || !firstName || !lastName || !password || !mayor || !semester || !school) {
        toast.secondary('Wait', 'Every field is required');
        return;
      }
    }
    this.setState({ step });
  };

  render() {
    const { authError } = this.props;
    const {
      email,
      password,
      firstName,
      lastName,
      mayor,
      semester,
      step,
      description,
      showCropModal,
      image,
      school,
      resume
    } = this.state;
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          {step === 1 && (
            <Fragment>
              <Typography variant="headingTitle" textAlign="center">
                CREATE AN ACCOUNT
              </Typography>
              <Typography mb={30} textAlign="center">
                COMPLETE THE FOLLOWING DATA TO GET ACCESS
              </Typography>
              <Input
                leftIcon={<FaEnvelope />}
                placeholder="Email"
                value={email}
                onChange={this.handleChange}
                name="email"
                mb={10}
              />
              <Box mb={10} display="flex">
                <Input
                  leftIcon={<FaRegUser />}
                  placeholder="First name"
                  value={firstName}
                  onChange={this.handleChange}
                  name="firstName"
                  mr={5}
                />
                <Input
                  leftIcon={<FaRegUser />}
                  placeholder="Last Name"
                  value={lastName}
                  onChange={this.handleChange}
                  name="lastName"
                  ml={5}
                />
              </Box>
              <Box mb={10} display="flex">
                <Column basis="65">
                  <Input
                    leftIcon={<FaGraduationCap />}
                    placeholder="Major"
                    value={mayor}
                    onChange={this.handleChange}
                    name="mayor"
                    mr={5}
                  />
                </Column>
                <Column basis="35">
                  <Input
                    leftIcon={<FaHashtag />}
                    placeholder="Semester"
                    value={semester}
                    type="number"
                    onChange={this.handleSemesterChange}
                    name="semester"
                    ml={5}
                  />
                </Column>
              </Box>
              <Select
                leftIcon={<FaBuilding />}
                value={school}
                onChange={this.handleChange}
                name="school"
                mb={10}
              >
                <option value="">Select your school here</option>
                <option value="ITESM">ITESM</option>
                <option value="UANL">UANL</option>
              </Select>
              <Input
                leftIcon={<FaKey />}
                type="password"
                placeholder="Enter password here"
                value={password}
                onChange={this.handleChange}
                name="password"
                mb={10}
              />
              <Button
                type="button"
                onClick={() => this.changeStep(2)}
                mt={30}
                color="gradient"
                fullWidth
              >
                Signup
              </Button>
            </Fragment>
          )}
          {step === 2 && (
            <Fragment>
              <Typography variant="headingTitle" textAlign="center">
                HEY {firstName}, WELCOME
              </Typography>
              <Typography mb={30} textAlign="center">
                PLEASE TELL US ABOUT YOURSELF
              </Typography>
              <Box display="flex" alignItems="center" flexDirection="column">
                <Avatar size={120} src={image.blobUrl || '/static/img/general/avatar.png'} />
                <Button
                  onClick={this.toggleCropModal}
                  size="small"
                  variant="link"
                  color="primary"
                  type="button"
                >
                  Change profile image
                </Button>
              </Box>
              <Textarea
                label="Description"
                value={description}
                onChange={this.handleChange}
                name="description"
                ml={5}
                required
              />
              <Card my={20}>
                <CardBody>
                  <Dropzone
                    height="100"
                    accept="application/pdf"
                    defaultMessage="Drag your PDF resume here"
                    acceptMessage="Drop your resume here"
                    rejectMessage="File format not supported"
                    setFile={this.setPdf}
                    file={resume}
                    maxSize={5000000}
                  />
                </CardBody>
              </Card>
              <Button onClick={this.handleSubmit} color="gradient" fullWidth>
                Complete signup
              </Button>
              <Button
                type="button"
                onClick={() => this.changeStep(1)}
                mt={5}
                variant="link"
                size="small"
                color="primary"
                fullWidth
              >
                Back
              </Button>
            </Fragment>
          )}
          <Typography mt={20} textAlign="center" color="danger">
            {authError}
          </Typography>
          <Box display="flex" justifyContent="center" mt={20}>
            <Typography textAlign="center" variant="muted">
              Already have an account?
            </Typography>
            <Link to="/login">
              <Typography ml={5} fontSize="0.85rem" color="primary">
                Log in
              </Typography>
            </Link>
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
        </Form>
      </Fragment>
    );
  }
}

Login.defaultProps = {
  authError: ''
};

Login.propTypes = {
  studentSignUp: PropTypes.func.isRequired,
  authError: PropTypes.string
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    studentSignUp: student => dispatch(studentSignUp(student))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
