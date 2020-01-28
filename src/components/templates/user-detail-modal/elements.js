import styled from 'styled-components';
import Box from '@common/box';
import Button from '@common/button';
import { FiDownload, FiArrowRight } from 'react-icons/fi';

const Row = styled.div`
  display: flex;
  margin-bottom: 20px;

  ${props => props.theme.media.tablet`
    flex-direction: column;
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

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  ${props => props.theme.media.tablet`
    button {
      width: 100%;
    }
  `}
`;

const DownloadIcon = styled(FiDownload)`
  margin-left: 5px;
`;

const RightIcon = styled(FiArrowRight)`
  margin-left: 5px;
`;

const FooterButton = styled(Button)`
  svg {
    margin-left: 5px;
  }
`;

export { Row, Column, ActionsContainer, DownloadIcon, FooterButton, RightIcon };
