import styled from 'styled-components';
import CommonInput from '@common/input';

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

const NewContainer = styled.div`
  svg {
    margin-left: 5px;
  }
  ${props => props.theme.media.tablet`
    position: fixed;
    bottom: 20px;
    right: 20px;
  `}
`;

export { Input, Container, NewContainer };
