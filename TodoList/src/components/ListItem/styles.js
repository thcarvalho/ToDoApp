import styled from 'styled-components/native';

export const ListContainer = styled.View`
  border-bottom-width: 2px;
  border-bottom-color: #ddd;
  width: 350px;
  padding: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  /* flex-direction: row;
  justify-content: space-between; */
`;
export const ListTitulo = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;
export const ListDescricao = styled.Text`
  color: #858585;
  font-size: 12px;
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
export const Titulo = styled.Text`
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
