import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Card, CardBody, CardFooter } from '@common/card';
import Avatar from '@common/avatar';
import Button from '@common/button';
import Tooltip from '@common/tooltip';
import shortId from 'shortid';
// import faker from 'faker';
import { MdSchool } from 'react-icons/md';
import { withRouter } from 'react-router-dom';
import Box from '@common/box';
import { FaRegCalendarAlt, FaGraduationCap, FaLocationArrow } from 'react-icons/fa';
import Pill from '@common/pill';
import { FiEdit3, FiX } from 'react-icons/fi';
import Typography from '@common/typography';
import Chart from './components/chart';
import {
  OfferBody,
  Divider,
  TextContainer,
  TypographyWithIcon,
  CardTop,
  JobIcon,
  Actions,
  Column,
  Row,
  ActionButton
} from './elements';

class OfferCard extends Component {
  showRecommendedStudents = async () => {
    const {
      history: { push },
      offer: { name },
      offer,
      students
    } = this.props;
    // Replace with an api call or something mamadísimo
    const reqLength = offer.requirements.length;
    const functions = firebase.functions();
    const recommendedAlgo = functions.httpsCallable('recommendStudent');
    const recommended = await recommendedAlgo({ offer, students, reqLength });
    push({
      pathname: '/students',
      state: {
        recommended,
        jobOfferName: name
      }
    });
  };

  render() {
    const { offer, setEditOffer, deleteOffer, profile } = this.props;
    let action;
    if (offer.typeOfJob === 'Project') {
      action = '/ month';
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
          <Actions>
            <Tooltip tag="Edit">
              <Button onClick={setEditOffer} variant="outlined" color="lighter" size="small" mr={5}>
                <FiEdit3 />
              </Button>
            </Tooltip>
            <Tooltip tag="Delete">
              <Button onClick={deleteOffer} variant="outlined" color="lighter" size="small">
                <FiX />
              </Button>
            </Tooltip>
          </Actions>
        </CardTop>
        <OfferBody>
          <Box display="flex">
            <Avatar
              mr={10}
              size={60}
              src={profile.profileImg || '/static/img/general/avatar.png'}
            />
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="heading">{offer.name}</Typography>
              <Pill color="secondary" variant="soft" size="small" mt={5}>
                ${offer.budget} {action}
              </Pill>
            </Box>
          </Box>
          <Divider />
          <Row>
            <Column basis="60">
              <TextContainer>
                <Typography color="primary" mb={5} fontWeight="bold">
                  Description
                </Typography>
                <Typography variant="muted">{offer.description}</Typography>
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
            </Column>
            <Column basis="40">
              <Chart offerData={offer} />
            </Column>
          </Row>
        </OfferBody>
        <CardFooter>
          <ActionButton
            onClick={this.showRecommendedStudents}
            color="secondary"
            variant="soft"
            ml="auto"
          >
            Recomended Students <MdSchool />
          </ActionButton>
        </CardFooter>
      </Card>
    );
  }
}

OfferCard.defaultProps = {
  students: undefined
};

OfferCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.string,
    companyLogoUrl: PropTypes.string,
    name: PropTypes.string,
    budget: PropTypes.string,
    major: PropTypes.string,
    description: PropTypes.string,
    typeOfJob: PropTypes.string,
    website: PropTypes.string,
    location: PropTypes.string,
    // scheduleDesc: PropTypes.object,
    requirements: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  setEditOffer: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  deleteOffer: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  students: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => {
  return {
    students: state.firestore.ordered.Usuarios
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect([
      {
        collection: 'Usuarios',
        where: ['rol', '==', 'Student']
      }
    ])
  )(OfferCard)
);
