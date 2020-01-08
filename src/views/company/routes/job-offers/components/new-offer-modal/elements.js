import styled from 'styled-components';
import Pill from '@common/pill';

const Row = styled.div`
  display: flex;

  ${props => props.theme.media.phone`
    flex-direction: column; 
    `}
`;

const Requirement = styled(Pill)`
  svg {
    display: none;
    cursor: pointer;
    margin-left: 5px;
  }

  &:hover {
    svg {
      display: initial;
    }
  }
`;

export { Row, Requirement };
