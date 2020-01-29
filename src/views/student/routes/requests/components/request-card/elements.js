import styled from 'styled-components';
import Pill from '@common/pill';

const Container = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;

  ${props => props.theme.media.tablet`
    flex-direction: column;

    button {
      margin-top: 15px;
    }
  `}
`;

const Span = styled.span`
  color: ${props => props.theme.colors[props.color]};
`;

const StagePill = styled(Pill)`
  white-space: nowrap;
  text-transform: capitalize;
  ${props => props.theme.media.tablet`
    margin-top: 10px;
  `}
`;

export { Container, Span, StagePill };
