import styled from 'styled-components';
import Box from '@common/box';
import { FiMessageSquare, FiDownload } from 'react-icons/fi';

const Row = styled.div`
  display: flex;

  ${props => props.theme.media.tablet`
    flex-direction: column;
  `}
`;

const Column = styled(Box)`
  flex-basis: ${props => props.basis}%;
  margin-right: 20px;

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

const ContactIcon = styled(FiMessageSquare)`
  margin-left: 5px;
`;

const DownloadIcon = styled(FiDownload)`
  margin-left: 5px;
`;

export { Row, Column, ActionsContainer, ContactIcon, DownloadIcon };
