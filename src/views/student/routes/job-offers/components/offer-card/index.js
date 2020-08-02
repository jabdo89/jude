import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { createStudentyJobOffer, clearRequest } from '@actions/jobOfferActions';
import { Card, CardBody, CardFooter } from '@common/card';
import Avatar from '@common/avatar';
import shortId from 'shortid';
import Box from '@common/box';
import Button from '@common/button';
import { FaRegCalendarAlt, FaGraduationCap, FaLocationArrow } from 'react-icons/fa';
import Pill from '@common/pill';
import Typography from '@common/typography';
import {
  OfferBody,
  Divider,
  TextContainer,
  TypographyWithIcon,
  CardTop,
  JobIcon,
  ShowMore,
  RightIcon
} from './elements';

const MAX_LENGTH = 200;
class OfferCard extends Component {
  state = {
    fullText: false
  };

  requestJob = e => {
    e.preventDefault();
    const { offer, profile } = this.props;
    const name = `${profile.firstName} ${profile.lastName}`;
    this.props.createStudentyJobOffer(offer.id, offer.company, name);
  };

  toggleFullText = () => this.setState(({ fullText }) => ({ fullText: !fullText }));

  trimText = text => `${text.slice(0, MAX_LENGTH)}...`;

  render() {
    const { offer, requestErrorStudent, Usuarios } = this.props;
    let curr;
    let profileImg;
    if (Usuarios !== undefined) {
      curr = Usuarios[offer.company];
      if (curr !== undefined) {
        // eslint-disable-next-line prefer-destructuring
        profileImg = curr.profileImg;
      }
    }
    const { fullText } = this.state;
    if (requestErrorStudent === 'REQUESTED_SUCCESFULLY') {
      NotificationManager.success('You will be notified if accepted', 'Requested Succesfully!');
      this.props.clearRequest(offer);
    }
    if (requestErrorStudent === 'ALREADY_EXISTS') {
      NotificationManager.warning(
        'You will be notified if accepted',
        'Job Offer Already Requested'
      );
      this.props.clearRequest(offer);
    }

    let budget;
    if (offer.typeOfJob === 'Project') {
      budget = '';
    } else {
      budget = '/ month';
    }
    return (
      <Card scaleOnHover>
        <CardTop>
          <CardBody>
            <Box alignItems="center" display="flex">
              <JobIcon />
              <Typography ml={10} variant="heading" color="lighter">
                {offer.typeOfJob}
              </Typography>
            </Box>
          </CardBody>
        </CardTop>
        <OfferBody>
          <Box display="flex">
            <Avatar mr={10} size={60} src={profileImg || '/static/img/general/avatar.png'} />
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="heading">{offer.companyName}</Typography>
              <Typography variant="heading">{offer.name}</Typography>
              <Pill color="secondary" variant="soft" size="small" mt={5}>
                ${offer.budget} {budget}
              </Pill>
            </Box>
          </Box>
          <Divider />
          <TextContainer>
            <Typography color="primary" mb={5} fontWeight="bold">
              Description
            </Typography>
            <Typography variant="muted">
              {fullText ? offer.description : this.trimText(offer.description)}
            </Typography>
            {offer.description.length > MAX_LENGTH && (
              <ShowMore onClick={this.toggleFullText} ml="auto" mt={5} variant="link" size="small">
                {fullText ? 'Show less' : 'Show more'}
              </ShowMore>
            )}
            <Typography color="primary" mt={20} mb={5} fontWeight="bold">
              Schedule
            </Typography>
            <TypographyWithIcon variant="muted">
              <FaRegCalendarAlt />
              {offer.typeOfJob}
            </TypographyWithIcon>
            <Typography color="primary" mt={20} mb={5} fontWeight="bold">
              Location
            </Typography>
            <TypographyWithIcon variant="muted">
              <FaLocationArrow />
              {offer.location}
            </TypographyWithIcon>
            {/* <TypographyWithIcon mt={5} variant="muted">
              <FaRegClock />
              From {offer.scheduleDesc.startHour} to {offer.scheduleDesc.endHour}
            </TypographyWithIcon> */}
            <Typography color="primary" mt={20} mb={5} fontWeight="bold">
              Website
            </Typography>
            <Typography variant="muted">{offer.website}</Typography>
            <Typography color="primary" mt={20} mb={5} fontWeight="bold">
              Major required
            </Typography>
            <TypographyWithIcon variant="muted">
              {offer.major &&
                offer.major.map(requirement => (
                  <Pill
                    key={shortId.generate()}
                    mr={5}
                    color="secondary"
                    variant="outlined"
                    size="small"
                    mb={5}
                  >
                    <FaGraduationCap />
                    {requirement}
                  </Pill>
                ))}
            </TypographyWithIcon>
            <Typography color="primary" mt={20} mb={5} fontWeight="bold">
              Preferred skills to have
            </Typography>
            <Box flexWrap="wrap" display="flex">
              {offer.requirements.map(requirement => (
                <Pill
                  key={shortId.generate()}
                  mr={5}
                  color="secondary"
                  variant="outlined"
                  size="small"
                  mb={5}
                >
                  {requirement}
                </Pill>
              ))}
            </Box>
          </TextContainer>
        </OfferBody>
        <CardFooter>
          <Button ml="auto" variant="soft" onClick={this.requestJob} color="secondary">
            Request
            <RightIcon />
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

OfferCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.string,
    company: PropTypes.string,
    companyLogoUrl: PropTypes.string,
    name: PropTypes.string,
    budget: PropTypes.string,
    major: PropTypes.string,
    description: PropTypes.string,
    typeOfJob: PropTypes.string,
    website: PropTypes.string,
    location: PropTypes.string,
    //    scheduleDesc: PropTypes.object,
    companyName: PropTypes.string,
    requirements: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  createStudentyJobOffer: PropTypes.func.isRequired,
  clearRequest: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  requestErrorStudent: PropTypes.string.isRequired,
  Usuarios: PropTypes.objectOf(PropTypes.object).isRequired
};
const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    requestErrorStudent: state.student.requestErrorStudent,
    Usuarios: state.firestore.data.Usuarios
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createStudentyJobOffer: (jobOfferID, companyID, name) =>
      dispatch(createStudentyJobOffer(jobOfferID, companyID, name)),
    clearRequest: activity => dispatch(clearRequest(activity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);
