import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    transform: translateY(-500px);
    opacity: 0.5;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeInMobile = keyframes`
  from {
    transform: translateY(-500px);
    opacity: 0.5;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const fadeInAnimation = () =>
  css`
    ${fadeIn} 0.4s ease
  `;

const fadeOutAnimation = () =>
  css`
    ${fadeOut} 0.4s ease
  `;

const fadeInMobileAnimation = () =>
  css`
    ${fadeInMobile} 0.4s ease
  `;

const Container = styled.div`
  position: relative;
  display: flex;
  color: ${({ theme }) => theme.colors.lighter};
  width: 100%;
  max-width: 500px;
  padding: 0.85rem 1.25rem;
  background-color: ${({ theme, type }) => theme.colors[type]}ee;
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: 0 10px 60px 0 rgba(29, 29, 31, 0.09);
  margin-bottom: 10px;
  animation: ${({ isGoingToBeRemoved }) =>
    isGoingToBeRemoved ? fadeOutAnimation : fadeInAnimation};
  cursor: pointer;

  ${({ isGoingToBeRemoved, theme }) => theme.media.phone`
    animation: ${isGoingToBeRemoved ? fadeOutAnimation : fadeInMobileAnimation};
  `}
`;

const CloseContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  font-size: 20px;
`;

export { Container, CloseContainer, TextContainer, MainIconContainer };
