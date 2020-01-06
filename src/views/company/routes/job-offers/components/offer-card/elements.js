import styled from 'styled-components';
import Typography from '@common/typography';
import { Card as CommonCard } from '@common/card';
import { FaBriefcase } from 'react-icons/fa';

const Card = styled(CommonCard)`
  cursor: pointer;

  * {
    cursor: pointer;
  }
`;

const Divider = styled.hr`
  margin: 20px 2px;
  border: 0.5px solid ${({ theme }) => theme.colors.lightGrey};
`;

const TextContainer = styled.div`
  overflow-x: auto;
  word-break: break-all;
`;

const TypographyWithIcon = styled(Typography)`
  svg {
    margin-right: 5px;
  }
`;

const JobIcon = styled(FaBriefcase)`
  color: ${({ theme }) => theme.colors.lighter};
`;

const CardTop = styled.div`
  height: 55px;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export { Card, Divider, TextContainer, TypographyWithIcon, CardTop, JobIcon };
