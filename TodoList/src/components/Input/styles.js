import styled from 'styled-components/native';

export const StyledInput = styled.TextInput`
  border-bottom-width: 2px;
  border-bottom-color: ${props => `${props.focusColor}`};
  width: 300px;
  height: 50px;
`;
