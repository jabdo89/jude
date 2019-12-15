import styled, { keyframes } from 'styled-components';
import { space } from 'styled-system';

const ldsRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    border: 2px solid ${({ theme, color }) => theme.colors[color]};
    border-radius: 50%;
    animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ theme, color }) => theme.colors[color]} transparent transparent transparent;
  }
  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }

  ${({ alignSelf }) =>
    alignSelf &&
    `
    align-self: ${alignSelf};
  `};

  ${space}
`;

export default LoaderWrapper;
