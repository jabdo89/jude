import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding-bottom: 30px;

  ${props => props.theme.media.desktop`
    flex-direction: column-reverse;
  `}
`;

export { Container };
