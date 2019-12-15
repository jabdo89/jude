import styled, { keyframes, css } from 'styled-components';
import { color } from 'styled-system';
import Button from '../button';
import getWidth from './utils';

const fadeIn = keyframes`
  from {
    transform: translateY(-500px);
    opacity: 0.5;
  }

  to {
      transform: translateY(0);
      opacity: 1;
  }
`;

const animationIn = css`
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ zIndex }) => zIndex};
  position: fixed;
  touch-action: none;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;

  ${color}
`;

const PseudoContainer = styled.div`
  position: absolute;
  z-index: 3100;
  background: transparent;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ModalBox = styled.div`
  margin: 48px;
  display: flex;
  background: ${({ theme }) => theme.colors.lighter};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.smallRadius};
  position: relative;
  z-index: 3200;
  flex-direction: column;
  flex: 0 1 auto;
  width: ${({ size }) => getWidth(size)};
  ${({ animate }) => animate && animationIn};
`;

const ContentHeader = styled.div`
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: ${({ theme }) => theme.colors.light};
  border-bottom: 1px solid ${({ theme }) => theme.colors.veryLightGrey};
  border-radius: ${({ theme }) => theme.smallRadius} ${({ theme }) => theme.smallRadius} 0 0;
`;

const ContentBody = styled.div`
  padding: 20px;
  max-height: 600px;
  overflow-y: auto;
`;

const ContentFooter = styled.div`
  height: 70px;
  background: ${({ theme }) => theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.smallRadius};
  border-top: 1px solid ${({ theme }) => theme.colors.veryLightGrey};
  border-radius: 0 0 ${({ theme }) => theme.smallRadius} ${({ theme }) => theme.smallRadius};
`;

const ModalTitle = styled.h6`
  color: ${({ theme }) => theme.colors.default};
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.6;
`;

const CloseButton = styled(Button)`
  margin: auto;
  right: ${({ theme }) => theme.smallRadius};
  color: ${({ theme }) => theme.colors.default};
  position: absolute;
  flex: 0 0 auto;
  color: rgba(0, 0, 0, 0.54);
  padding: 6px;
  overflow: visible;
  font-size: 1.2rem;
  text-align: center;
  background: transparent;

  &:hover {
    box-shadow: none;
  }
`;

const ModalActions = styled.div`
  display: flex;
`;

export {
  ModalContainer,
  PseudoContainer,
  ModalBox,
  ModalTitle,
  CloseButton,
  ModalActions,
  ContentHeader,
  ContentBody,
  ContentFooter
};
