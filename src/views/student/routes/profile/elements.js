import styled from 'styled-components';
import Box from '@common/box';

const Container = styled.div`
  display: flex;
  padding-bottom: 30px;

  ${props => props.theme.media.desktop`
    flex-direction: column-reverse;
  `}
`;

const Column = styled(Box)`
  flex-basis: ${props => props.basis}%;
  margin-right: 20px;
  word-break: break-all;

  &:last-child {
    margin-right: 0px;
  }

  ${props => props.theme.media.tablet`
    margin-right: 0px;
  `}
`;

export { Container, Column };
