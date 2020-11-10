import styled from 'styled-components';

const Container = styled.div`
  padding: 5px 10px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    transform: translateZ(0px) scale(1.021);
    transition: 0.5s all;
  }
`;

const Divider = styled.hr`
  border: 0.5px solid ${props => props.theme.colors.veryLightGrey};
  width: 100%;
`;

const Dot = styled.span`
  background-color: ${props => props.theme.colors.secondary};
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-left: auto;
  position: absolute;
  top: 8px;
  right: 0;
`;

const MessageContainer = styled.div`
  p {
    overflow: hidden;
    max-width: 150px;
    text-overflow: ellipsis;
    white-space: pre;
  }
`;

const DataContainer = styled.div`
  position: relative;
  width: 100%;
`;

export { Container, Divider, Dot, MessageContainer, DataContainer };
