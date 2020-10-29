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
  FaBuilding,
  FaLocationArrow
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
    urlPDF: '',
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
    // if (!resume) {
    //   toast.secondary('Resume required', 'You need to upload your resume to signup');
    //   return;
    // }
    if (image.file !== null) {
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

              const uploadTaskPDF = storage.ref(`curriculums/${email}`).put(resume);
              uploadTaskPDF.on(
                'state_changed',
                snapshot => {
                  // progress function ...
                  const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
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
                    .then(urlPDF => {
                      this.setState({ urlPDF });
                      const { studentSignUp: localeSignUp } = this.props;
                      localeSignUp(this.state);
                    });
                }
              );
            });
        }
      );
    } else if (resume) {
      const uploadTaskPDF = storage.ref(`curriculums/${email}`).put(resume);
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
            .then(urlPDF => {
              this.setState({ urlPDF });
              const { studentSignUp: localeSignUp } = this.props;
              localeSignUp(this.state);
            });
        }
      );
    } else {
      const { studentSignUp: localeSignUp } = this.props;
      localeSignUp(this.state);
    }
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
    const { email, firstName, lastName, password, mayor, semester, school, location } = this.state;
    if (step === 2) {
      if (
        !email ||
        !firstName ||
        !lastName ||
        !password ||
        !mayor ||
        !semester ||
        !school ||
        !location
      ) {
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
      resume,
      location
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
                  <Select
                    leftIcon={<FaGraduationCap />}
                    value={mayor}
                    onChange={this.handleChange}
                    name="mayor"
                    mb={5}
                  >
                    <option value="">Major</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Business & Technology">Business & Technology</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Chemical Engineer">Chemical Engineer</option>
                    <option value="Economics">Economics</option>
                    <option value="Finance">Finance</option>
                    <option value="Graphic Designer">Graphic Designer</option>
                    <option value="International Relations">International Relations</option>
                    <option value="Lawyer">Lawyer</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Mechanical Engineer">Mechanical Engineer</option>
                    <option value="Mechatronic Engineer">Mechatronic Engineer</option>
                    <option value="Demo">Demo</option>
                  </Select>
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
              <Box mb={10} display="flex">
                <Select
                  leftIcon={<FaBuilding />}
                  value={school}
                  onChange={this.handleChange}
                  name="school"
                  mr={5}
                >
                  <option value="">Select your school here</option>
                  <option value="ITESM">ITESM</option>
                  <option value="UANL">UANL</option>
                  <option value="UDEM">UDEM</option>
                  <option value="UNAM">UNAM</option>
                </Select>{' '}
                <Select
                  leftIcon={<FaLocationArrow />}
                  value={location}
                  onChange={this.handleChange}
                  name="location"
                  ml={5}
                >
                  <option value="">Select your location here</option>
                  <option value="Monterrey, Nuevo Leon">Monterrey, Nuevo Leon</option>
                  <option value="Tampico, Tamaulipas">Tampico, Tamaulipas</option>
                  <option value="Mexico City">Mexico City</option>
                </Select>
              </Box>
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
                label="Description (What do you have most experience in and what projects would you like to work in)"
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
                    defaultMessage="For your privacy dont include phone or email in resume"
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
