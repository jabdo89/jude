import styled from 'styled-components';

const Container = styled.div`
  margin-left: 200px;
  padding: 0px 20px;
  padding-bottom: 30px;
  padding-top: 20px;

  ${props => props.theme.media.tablet`
    margin-left: 50px;
  `}
`;

export default Container;
