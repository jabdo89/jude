import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  overflow: hidden;
  margin-top: -20px;
  margin-left: -20px;
  margin-right: -20px;

  ${props => props.theme.media.phone`
  flex-direction: column;
`}
`;

const Column = styled.div`
  display: flex;
  flex-basis: ${props => props.basis}%;
  flex-direction: column;
  
  ${props =>
    props.pl &&
    `
    padding-left: ${props.pl}px;
  `}

  ${props =>
    props.pr &&
    `
    padding-right: ${props.pr}px;
  `}

  ${props =>
    props.bg &&
    `
    background-color: ${props.theme.colors[props.bg]};
  `}

  ${props => props.theme.media.phone`
    ${props.hideOnMobileIf &&
      `
      display: none;
    `}
  `}
`;

const ListContainer = styled.div`
  height: calc(100vh - 66px);
  overflow-y: scroll;
  padding-right: 10px;

  &::-webkit-scrollbar-track {
    background-color: ${props => props.theme.colors.lighter};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.light};
    border-radius: 8px;
  }
`;

export { Container, Column, ListContainer };
