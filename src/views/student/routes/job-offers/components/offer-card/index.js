import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStudentyJobOffer } from '@actions/jobOfferActions';
import { Card, CardBody, CardFooter } from '@common/card';
import Avatar from '@common/avatar';
import shortId from 'shortid';
import Box from '@common/box';
import Button from '@common/button';
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
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

class OfferCard extends Component {
  state = {
    fullText: false
  };

  requestJob = e => {
    e.preventDefault();
    const { offer } = this.props;
    this.props.createStudentyJobOffer(offer.id, offer.company);
  };

  toggleFullText = () => this.setState(({ fullText }) => ({ fullText: !fullText }));

  trimText = text => `${text.slice(0, 200)}...`;

  render() {
    const { offer } = this.props;
    const { fullText } = this.state;
    return (
      <Card scaleOnHover>
        <CardTop>
          <CardBody>
            <Box alignItems="center" display="flex">
              <JobIcon />
              <Typography ml={10} variant="heading" color="lighter">
                {offer.companyName}
              </Typography>
            </Box>
          </CardBody>
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
          <TextContainer>
            <Typography color="primary" mb={5} fontWeight="bold">
              Description
            </Typography>
            <Typography variant="muted">
              {fullText ? offer.description : this.trimText(offer.description)}
            </Typography>
            <ShowMore onClick={this.toggleFullText} ml="auto" mt={5} variant="link" size="small">
              {fullText ? 'Show less' : 'Show more'}
            </ShowMore>
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
    description: PropTypes.string,
    scheduleDesc: PropTypes.object,
    companyName: PropTypes.string,
    requirements: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  createStudentyJobOffer: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    createStudentyJobOffer: (jobOfferID, companyID) =>
      dispatch(createStudentyJobOffer(jobOfferID, companyID))
  };
};

export default connect(null, mapDispatchToProps)(OfferCard);
