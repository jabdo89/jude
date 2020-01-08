import styled from 'styled-components';
import { space } from 'styled-system';
import { getStyle, getPadding, getFontSize } from './utils';

const PillContainer = styled.div`
  width: fit-content;
  padding: ${({ size }) => getPadding(size)};
  border-radius: ${({ theme }) => theme.radius};
  display: flex;
  align-items: center;
  font-size: ${({ size }) => getFontSize(size)};
  margin: 0;

  ${getStyle};
  ${space};
`;

export default PillContainer;
