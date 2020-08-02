import styled from 'styled-components';
import Typography from '@common/typography';
import { CardBody as CommonCardBody } from '@common/card';
import { FaBriefcase } from 'react-icons/fa';
import Button from '@common/button';
import { FiArrowRight } from 'react-icons/fi';

const OfferBody = styled(CommonCardBody)`
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
  word-break: break-word;
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
`;

const ShowMore = styled(Button)`
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const RightIcon = styled(FiArrowRight)`
  margin-left: 5px;
`;

export {
  OfferBody,
  Divider,
  TextContainer,
  TypographyWithIcon,
  CardTop,
  JobIcon,
  ShowMore,
  RightIcon
};
