import styled from 'styled-components';
import CommonInput from '@common/input';

const Form = styled.form`
  margin-left: 45%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10%;

  ${({ theme }) => theme.media.tablet`
    margin-left: 0;
  `}
`;

const Input = styled(CommonInput)`
  input {
    padding: 1rem 0.75rem !important;
    padding-left: 2.825rem !important;
  }

  svg {
    margin-left: 0.325rem;
  }
`;

export { Form, Input };
