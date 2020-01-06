import styled from 'styled-components';
import Typography from '@common/typography';

const Background = styled.img`
  position: absolute;
  height: 100%;
  width: 45%;
  top: 0%;
`;

const TargetIcon = styled.img`
  position: absolute;
  height: 70px;
  width: 70px;
  left: 50px;
  top: 40px;
`;

const ConnectingWord = styled(Typography)`
  position: absolute;
  left: 130px;
  top: 40px;
  width: 20%;
  font-size: calc(1vw + 1vh + 0.5vmin);
`;

const WelcomeWord = styled(Typography)`
  position: absolute;
  font-weight: bold;
  left: 6%;
  top: 40%;
  font-size: calc(0.8vw + 0.8vh + 0.4vmin);
  z-index: 10;
`;

const EnterWord = styled(Typography)`
  position: absolute;
  left: 6%;
  top: 46%;
  width: 20%;
  font-size: calc(0.7vw + 0.7vh + 0.4vmin);
  z-index: 10;
`;

const LogoMain = styled.img`
  width: auto;
  height: 60px;
  margin-right: 5px;
`;

const LogoBig = styled.img`
  position: absolute;
  bottom: 50px;
  height: 600px;
  width: auto;
  right: 55%;
`;

const UDEWord = styled(Typography)`
  font-size: calc(1.8vw + 1.8vh + 0.9vmin);
`;

const LeftContainer = styled.div`
  ${({ theme }) => theme.media.tablet`
    display: none;
  `}
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  align-items: center;
`;

export {
  Background,
  TargetIcon,
  ConnectingWord,
  WelcomeWord,
  EnterWord,
  LogoMain,
  LogoBig,
  UDEWord,
  LeftContainer,
  LogoContainer
};
