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
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 200;
  background: transparent;
  padding: 0.5rem;
  animation: ${fadeIn} 0.5s ease;
  ${props =>
    !props.show &&
    `
    display: none;
  `}
`;

const PseudoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 250;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: transparent;
`;

const Content = styled.div`
  width: 300px;
  height: auto;
  position: fixed;
  z-index: 300;
  background: ${props => props.theme.colors.lighter};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 0.1rem;
  right: 0;
  top: 66px;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 500px;

  ${props => props.theme.media.tablet`
    width: 100%;
    right: 0;
    left: 0;
    max-height: calc(100vh - 66px);
  `}
`;

const TitleSection = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.veryLightGrey};
`;

export { Container, PseudoContainer, Content, TitleSection };
