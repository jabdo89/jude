import styled from 'styled-components';
import Pill from '@common/pill';

const Skill = styled(Pill)`
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

export default Skill;
