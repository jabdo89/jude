import styled from 'styled-components';
import { FiBookOpen } from 'react-icons/fi';
import { Card as CommonCard } from '@common/card';

const Card = styled(CommonCard)`
  cursor: pointer;

  * {
    cursor: pointer;
  }
`;

const BookIcon = styled(FiBookOpen)`
  color: ${({ theme }) => theme.colors.lighter};
`;

const CardTop = styled.div`
  height: 55px;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Divider = styled.hr`
  margin: 20px 2px;
  border: 0.5px solid ${({ theme }) => theme.colors.lightGrey};
`;

export { Card, BookIcon, CardTop, Divider };