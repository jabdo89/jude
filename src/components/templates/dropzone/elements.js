import styled from 'styled-components';

const getColor = ({ theme, isDragAccept, isDragReject }) => {
  if (isDragAccept) {
    return theme.colors.primary;
  }
  if (isDragReject) {
    return theme.colors.secondary;
  }
  return theme.colors.veryLightGrey;
};

const FileName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    color: ${props => props.theme.colors.default};
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: ${props => props.theme.colors.lighter};
  color: ${props => props.theme.colors.default};
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
  height: ${props => props.height}px;
  justify-content: center;

  ${props =>
    props.file &&
    `
    background-color: ${props.theme.colors.veryLightGrey}
  `}
`;

export { FileName, Container };
