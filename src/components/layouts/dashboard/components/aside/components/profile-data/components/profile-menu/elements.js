import styled, { keyframes } from 'styled-components';
import { FiUser, FiLogOut } from 'react-icons/fi';

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
  width: 200px;
  height: auto;
  position: fixed;
  z-index: 300;
  background: ${props => props.theme.colors.lighter};
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
  border-radius: 0.1rem;
  left: 200px;
  bottom: 0;
  overflow: hidden;

  ${props => props.theme.media.tablet`
    width: 100%;
    left: 50px;
  `}
`;

const Option = styled.div`
  width: 100%;
  height: 45px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  padding-left: 1.5em;
  color: ${props => props.theme.colors.default};
  &:hover {
    background: ${props => props.theme.colors.default};
    color: ${props => props.theme.colors.light};
  }
  &:last-child {
    border-top: 1px solid ${props => props.theme.colors.veryLightGrey};
  }
`;

const Header = styled(Option)`
  &:hover {
    background: ${props => props.theme.colors.lighter};
  }
  cursor: default;
  border-bottom: 1px solid ${props => props.theme.colors.veryLightGrey};
  font-size: 10px;
  font-weight: 500;
  padding-left: 2.5em;
`;

const ProfileIcon = styled(FiUser)`
  font-size: 20px;
  margin-right: 10px;
`;

const ExitIcon = styled(FiLogOut)`
  font-size: 20px;
  margin-right: 10px;
`;

export { Container, PseudoContainer, Content, Option, Header, ProfileIcon, ExitIcon };
