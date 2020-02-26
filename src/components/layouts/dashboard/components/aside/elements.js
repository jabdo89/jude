import styled from 'styled-components';

const Container = styled.div`
  width: 200px;
  padding-top: 1rem;
  height: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1;
  background: ${props => props.theme.colors.default};
  ::-webkit-scrollbar {
    display: none;
  }

  ${props => props.theme.media.tablet`
    width: 50px;
  `}
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.media.tablet`
    p {
      display: none;
    }
  `}
`;

const Logo = styled.img`
  height: 40px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* 100vh for viewport, 40px from logo, 1rem for sidebar padding and 100px for profile data */
  height: calc(100vh - 40px - 1rem - 100px);
`;

export { Container, LogoContainer, Logo, OptionsContainer };
