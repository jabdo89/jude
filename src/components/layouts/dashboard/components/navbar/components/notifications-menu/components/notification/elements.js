import styled from 'styled-components';
import { MdClear } from 'react-icons/md';

const Container = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 1rem;
  color: ${props => props.theme.colors.lightDark};

  .clear {
    display: none;
  }

  * {
    cursor: pointer;
  }

  &:hover {
    transform: translateZ(0px) scale(1.021);
    transition: transform 0.25s ease-out 0s;

    .clear {
      display: initial;
    }
  }
`;

const Icon = styled.div`
  color: ${props => props.theme.colors[props.type]};
  background-color: ${props => props.theme.colors[props.type]}33;
  border-radius: 50%;
  font-size: 16px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const Clear = styled(MdClear)`
  margin-left: auto;
  color: ${props => props.theme.colors.danger};
`;

export { Container, Icon, Clear };
