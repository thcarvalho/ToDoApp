import styled from 'styled-components/native';

export const Fab1 = styled.TouchableOpacity`
  background-color: ${props => `${props.bgcolor}`};
  height: 40px;
  width: 40px;
  border-radius: 50;
  justify-content: center;
  align-items: center;
`;
export const Fab2 = styled(Fab1)`
  width: 60px;
  height: 60px;
`;
