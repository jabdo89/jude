import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { FiSearch } from 'react-icons/fi';
import { withRouter } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import Typography from '@common/typography';
import Box from '@common/box';
import { BackButton, Container, Select, Divider, FilterContainer } from './elements';

const FilterBar = ({
  isRecommendation,
  semesterFilterUpdate,
  semesterValue,
  majorFilterUpdate,
  majorValue,
  history,
  jobOfferName
}) => (
  <Container>
    {isRecommendation ? (
      <Box display="flex" alignItems="center" mr="auto">
        <BackButton
          onClick={() => history.goBack()}
          mr={10}
          size="small"
          variant="outlined"
          color="primary"
        >
          <MdArrowBack />
          Back
        </BackButton>
        <Typography variant="leadText">Recommendations for {jobOfferName}</Typography>
      </Box>
    ) : (
      <Fragment>
        <FilterContainer>
          <Typography variant="muted">Semester</Typography>
          <Select
            value={semesterValue}
            onChange={event => {
              semesterFilterUpdate(event.target.value);
            }}
          >
            <option value="any">any</option>
            <option value="1">1º</option>
            <option value="2">2º</option>
            <option value="3">3º</option>
            <option value="4">4º</option>
            <option value="5">5</option>
            <option value="6">6º</option>
            <option value="7">7º</option>
            <option value="8">8º</option>
            <option value="9">9º</option>
            <option value="10">10º</option>
          </Select>
        </FilterContainer>
        <Divider />
        <FilterContainer>
          <Typography variant="muted">Major</Typography>
          <Select
            value={majorValue}
            onChange={event => {
              majorFilterUpdate(event.target.value);
            }}
          >
            <option value="any">any</option>
            <option value="Mechanical Engineer">Mechanical Engineer</option>
            <option value="Accounting">Accounting</option>
            <option value="Economics">Economics</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Business & Technology">Business & Technology</option>
            <option value="Chemical Engineer">Chemical Engineer</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Mechatronic Engineer">Mechatronic Engineer</option>
            <option value="Graphic Designer">Graphic Designer</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Lawyer">Lawyer</option>
          </Select>
        </FilterContainer>
      </Fragment>
    )}
  </Container>
);

FilterBar.propTypes = {
  isRecommendation: PropTypes.bool.isRequired,
  jobOfferName: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  majorFilterUpdate: PropTypes.func.isRequired,
  semesterFilterUpdate: PropTypes.func.isRequired,
  majorValue: PropTypes.string.isRequired,
  semesterValue: PropTypes.string.isRequired
};

export default withRouter(FilterBar);
