import styled from 'styled-components/native';

export const SmallContainer = styled.TouchableOpacity`
  border-bottom-color: #acacac;
  border-bottom-width: 0.5px;
  border-top-color: #acacac;
  border-top-width: 0.5px;
  height: 80px;
  width: 100%;
  justify-content: center;
`;
export const Title = styled.Text`
  font-size: 16px;
  color: #2b3dbb;
`;
export const Content = styled.Text`
  font-size: 12px;
  color: #858585;
`;
export const Logout = styled(Title)`
  font-weight: bold;
`;
export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const InnerModal = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  width: 320px;
  height: 250px;
  border-width: 1px;
  border-color: #2b3dbb;
  border-radius: 5px;
`;
export const Close = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 10px;
`;
export const TitleModal = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #2b3dbb;
`;
export const BtnContainer = styled.View`
  flex-direction: row;
  margin-top: 30;
`;
export const BtnText = styled.Text`
  color: #2b3dbb;
  font-size: 15px;
  margin-left: 25px;
  margin-right: 25px;
`;