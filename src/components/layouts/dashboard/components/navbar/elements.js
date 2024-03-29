import styled from 'styled-components';
import Typography from '@common/typography';
import Navbar from '@common/navbar';

const Container = styled(Navbar)`
  margin-left: 200px;

  ${({ theme }) => theme.media.tablet`
    margin-left: 50px;
  `}
`;

const Content = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;

  h1 {
    white-space: nowrap;
  }
`;

const Routes = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  justify-content: flex-end;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 10px;

  ${props => props.theme.media.tablet`
    display: none;
  `}
`;

const Route = styled(Typography)`
  margin: 0 15px;
  cursor: pointer;
  color: ${props => props.theme.colors.default};

  ${props =>
    props.active &&
    `
    color: ${props.theme.colors.primary}
  `}

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const MenuButton = styled.button`
  display: none;
  color: ${props => props.theme.colors.default};
  cursor: pointer;
  font-size: 2rem;
  border-radius: 5px;
  background-color: transparent;
  border: none;
  padding: 0;

  ${props => props.theme.media.tablet`
    display: flex;
  `}

  &:focus {
    outline: none;
  }
`;

const Divider = styled.div`
  height: 25px;
  width: 1px;
  background-color: ${props => props.theme.colors.lightGrey};
  margin: auto 20px;

  ${props => props.theme.media.tablet`
    display: none;
  `}
`;

const NotificationButton = styled.div`
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  font-size: 1.3rem;
  border-radius: 5px;
  background-color: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  position: relative;

  ${props => props.theme.media.tablet`
    margin-right: 10px;
  `}

  &:focus {
    outline: none;
  }
`;

const Action = styled.div`
  width: 100%;
  margin-right: auto;
`;

const Qty = styled.div`
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 50%;
  color: ${props => props.theme.colors.lighter};
  position: absolute;
  bottom: 0;
  width: 12px;
  font-size: 8px;
  display: flex;
  right: 0;
  height: 12px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

export { Container, Content, Routes, Route, MenuButton, Divider, NotificationButton, Action, Qty };
