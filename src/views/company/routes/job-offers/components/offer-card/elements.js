import styled from 'styled-components';
import Typography from '@common/typography';
import Box from '@common/box';
import Button from '@common/button';
import { CardBody as CommonCardBody } from '@common/card';
import { FaBriefcase } from 'react-icons/fa';

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
`;

const Actions = styled.div`
  display: flex;
  margin-right: 10px;
  
  button:hover {
    svg {
      color: ${props => props.theme.colors.primary}
    }
  }
  /* svg {
    margin-right: 10px;
    cursor: pointer;
    color: ${props => props.theme.colors.lighter};
  } */
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

const Row = styled.div`
  display: flex;

  ${props => props.theme.media.desktop`
    flex-direction: column;
  `}
`;

const ActionButton = styled(Button)`
  svg {
    font-size: 22p;
    margin-left: 5px;
  }
`;

export {
  OfferBody,
  Divider,
  TextContainer,
  TypographyWithIcon,
  CardTop,
  JobIcon,
  Actions,
  Column,
  Row,
  ActionButton
};
