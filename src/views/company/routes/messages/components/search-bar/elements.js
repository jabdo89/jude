import styled from 'styled-components';
import CommonSelect from '@common/select';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;

  ${props => props.theme.media.phone`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

const Select = styled(CommonSelect)`
  width: auto;
  margin-top: 0;
  margin-right: 20px;
  flex-grow: 1;

  select {
    border: none;
    background-color: transparent;
  }

  svg {
    margin-bottom: 2px;
  }

  select {
    font-size: 12px;
  }

  ${props => props.theme.media.phone`
    width: 100%;
  `};

  &:focus-within {
    select {
      border: none;
      box-shadow: none;
    }
  }
`;

const NewContainer = styled.div`
  svg {
    margin-left: 5px;
  }
`;

export { Select, Container, NewContainer };
