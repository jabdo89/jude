import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from '@common/card';
import Avatar from '@common/avatar';
import shortId from 'shortid';
import Box from '@common/box';
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import Pill from '@common/pill';
import Typography from '@common/typography';
import {
  OfferBody,
  Divider,
  TextContainer,
  TypographyWithIcon,
  CardTop,
  JobIcon
} from './elements';

const trimText = text => `${text.slice(0, 200)}...`;

const OfferCard = ({ offer }) => (
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
        <Typography variant="muted">{trimText(offer.description)}</Typography>
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
  </Card>
);

OfferCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.string,
    companyLogoUrl: PropTypes.string,
    name: PropTypes.string,
    budget: PropTypes.string,
    description: PropTypes.string,
    scheduleDesc: PropTypes.object,
    requirements: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default OfferCard;
