import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardFooter } from '@common/card';
import Avatar from '@common/avatar';
import Button from '@common/button';
import Tooltip from '@common/tooltip';
import shortId from 'shortid';
import faker from 'faker';
import { MdSchool } from 'react-icons/md';
import { withRouter } from 'react-router-dom';
import Box from '@common/box';
import { FaRegCalendarAlt, FaRegClock, FaGraduationCap } from 'react-icons/fa';
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

// Remove after placing api call
const getRecommendedByAlgoritmoMamado = qty =>
  new Array(qty).fill().map(() => ({
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    profileImg: faker.image.avatar(),
    semester: Math.round(Math.random() * 9) + 1,
    description: faker.lorem.paragraph(),
    major: Math.random() > 0.5 ? 'ITC' : 'INT',
    resume: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }));

class OfferCard extends Component {
  showRecommendedStudents = () => {
    const {
      history: { push },
      offer: { name }
    } = this.props;
    // Replace with an api call or something mamadísimo
    const recommended = getRecommendedByAlgoritmoMamado(5);

    push({
      pathname: '/students',
      state: {
        recommended,
        jobOfferName: name
      }
    });
  };

  render() {
    const { offer, setEditOffer, deleteOffer } = this.props;
    return (
      <Card scaleOnHover>
        <CardTop>
          <CardBody>
            <Box alignItems="center" display="flex">
              <JobIcon />
              <Typography ml={10} variant="heading" color="lighter">
                Offer
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
            <Avatar mr={10} size={60} src={offer.companyLogoUrl} />
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="heading">{offer.name}</Typography>
              <Pill color="secondary" variant="soft" size="small" mt={5}>
                ${offer.budget} / month
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
                  {offer.scheduleDesc.weekStart} - {offer.scheduleDesc.weekEnd}
                </TypographyWithIcon>
                <TypographyWithIcon mt={5} variant="muted">
                  <FaRegClock />
                  From {offer.scheduleDesc.startHour} hrs. to {offer.scheduleDesc.endHour} hrs.
                </TypographyWithIcon>
                <Typography color="primary" mt={20} mb={5} fontWeight="bold">
                  Major required
                </Typography>
                <TypographyWithIcon variant="muted">
                  <FaGraduationCap />
                  {/* ITC is just a placeholder, please remove */}
                  {offer.major || 'ITC'}
                </TypographyWithIcon>
                <Typography color="primary" mt={20} mb={5} fontWeight="bold">
                  Requirements
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

OfferCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.string,
    companyLogoUrl: PropTypes.string,
    name: PropTypes.string,
    budget: PropTypes.string,
    major: PropTypes.string,
    description: PropTypes.string,
    scheduleDesc: PropTypes.object,
    requirements: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  setEditOffer: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  deleteOffer: PropTypes.func.isRequired
};

export default withRouter(OfferCard);
