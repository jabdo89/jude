import styled from 'styled-components';
import Button from '@common/button';
import { FiBookOpen } from 'react-icons/fi';

const BookIcon = styled(FiBookOpen)`
  color: ${({ theme }) => theme.colors.lighter};
`;

const CardTop = styled.div`
  height: 55px;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Divider = styled.hr`
  margin: 20px 2px;
  border: 0.5px solid ${({ theme }) => theme.colors.lightGrey};
`;

const DescriptionContainer = styled.div`
  overflow-x: auto;
  word-break: break-all;
`;

const FooterButton = styled(Button)`
  svg {
    margin-left: 5px;
  }
`;

export { BookIcon, CardTop, Divider, DescriptionContainer, FooterButton };
