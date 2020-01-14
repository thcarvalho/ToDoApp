import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Header = styled.View`
  position: absolute;
  top: 0;
  height: 50px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom-color: #2b3dbb;
  border-bottom-width: 1px;
  flex-direction: row;
  padding: 16px;
`;
export const HeaderTitle = styled.Text`
  color: #2b3dbb;
  font-weight: bold;
  font-size: 18px;
`;
