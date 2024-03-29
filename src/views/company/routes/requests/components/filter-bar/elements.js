import styled from 'styled-components';
import CommonInput from '@common/input';
import CommonSelect from '@common/select';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 20px;

  ${props => props.theme.media.phone`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

const Input = styled(CommonInput)`
  width: auto;
  margin-top: 0;
  margin-right: 20px;
  flex-grow: 1;

  input {
    border: none;
    background-color: transparent;
  }

  svg {
    margin-bottom: 2px;
  }

  input {
    font-size: 12px;
  }

  ${props => props.theme.media.phone`
    width: 100%;
  `};

  &:focus-within {
    input {
      border: none;
      box-shadow: none;
    }
  }
`;

const Select = styled(CommonSelect)`
  width: auto;
  margin-top: 0;
  select {
    border: none;
    background-color: transparent;
  }

  ${props => props.theme.media.phone`
    flex-grow: 1;
  `};

  &:focus-within {
    select {
      border: none;
      box-shadow: initial;
    }
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;

  ${props => props.theme.media.phone`
    width: 100%;
  `};
`;

export { Input, Container, Select, FilterContainer };
