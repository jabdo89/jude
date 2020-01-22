import styled from 'styled-components';

const AsideLine = styled.div`
  width: 2px;
  height: 100%;
  background: ${props => props.theme.colors.secondary};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
`;

const Option = styled.div`
  width: 100%;
  height: ${props => (props.organization ? '60px' : '40px')};
  color: ${props => props.theme.colors.light};
  display: flex;
  align-items: center;
  padding: 1.8rem 1.5rem;
  position: relative;
  cursor: pointer;
  margin: 0;

  ${props => props.theme.media.tablet`
    justify-content: center;
    height: 40px;
  `}

  &:hover {
    color: ${props => props.theme.colors.secondary};
    transition: 0.3s all;
    ${AsideLine} {
      opacity: 1;
      transition: 0.3s all;
    }
  }

  p {
    font-size: 1rem;
    color: ${props => props.theme.colors.light};
    margin-left: 5px;
  }

  ${props =>
    props.active &&
    `
    color: ${props.theme.colors.secondary};
    ${AsideLine} {
      opacity: 1;
      transition: 0.3s all;
    }
  `}

  ${props => props.theme.media.tablet`
    p {
      display: none;
    }
  `}
`;

const Icon = styled.div`
  font-size: 1.3rem;
  min-width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { AsideLine, Option, Icon };
