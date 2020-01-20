import styled from 'styled-components';

const Container = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const Span = styled.span`
  color: ${props => props.theme.colors[props.color]};
`;

export { Container, Span };
