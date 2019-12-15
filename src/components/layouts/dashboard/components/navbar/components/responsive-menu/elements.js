import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
      opacity: 1;
  }
`;

const Container = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1300;
  position: fixed;
  touch-action: none;
  background-color: ${props => props.theme.colors.default};
  animation: ${fadeIn} 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CloseButton = styled.button`
  top: 2rem;
  right: 2rem;
  color: ${props => props.theme.colors.lighter};
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  background: transparent;
  border: none;

  &:focus {
    outline: none;
  }
`;

const Route = styled.button`
  cursor: pointer;
  background: transparent;
  width: 80%;
  font-size: 1.5rem;
  border: none;
  padding: 0.75rem;
  color: ${props => props.theme.colors.lighter};
`;

export { Container, CloseButton, Route };
