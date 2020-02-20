import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { editProfileCompany } from '@actions/jobOfferActions';
import { connect } from 'react-redux';
import Typography from '@common/typography';
import Box from '@common/box';
import Button from '@common/button';
import Textarea from '@common/textarea';
import { FaEnvelope, FaBars, FaBuilding, FaExternalLinkAlt } from 'react-icons/fa';
import Input from '@common/input';

class DataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: props.user.companyName,
      email: props.user.email,
      description: props.user.description,
      website: props.user.website
    };
  }

  handleInputChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  editProfile = () => {
    this.props.editProfileCompany(this.state);
  };

  render() {
    const { companyName, email, description, website } = this.state;
    return (
      <Box mt={20} px={20}>
        <Typography mb={30} variant="leadText">
          Edit your data
        </Typography>
        <Input
          label="Company"
          name="companyName"
          onChange={this.handleInputChange}
          value={companyName}
          disabled
          leftIcon={<FaBuilding />}
        />
        <Input
          label="Email"
          name="email"
          onChange={this.handleInputChange}
          value={email}
          disabled
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
        <Box mt={20} display="flex" justifyContent="flex-end">
          <Button ml={10} variant="soft" color="primary" onClick={this.editProfile}>
            Save
          </Button>
        </Box>
      </Box>
    );
  }
}

DataForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    companyName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    semester: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    resume: PropTypes.string.isRequired
  }).isRequired,
  editProfileCompany: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    editProfileCompany: profile => dispatch(editProfileCompany(profile))
  };
};

export default connect(null, mapDispatchToProps)(DataForm);
