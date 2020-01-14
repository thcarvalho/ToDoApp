/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';

import IconFA from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-community/async-storage';

import { ModalContainer, InnerModal, TitleModal, Close, BtnContainer, BtnText } from './styles';

export default function ModalLogout(props) {

  async function logout() {
    await AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => {
        ToastAndroid.show('Sucesso ao sair', ToastAndroid.SHORT);
        props.logout();
      })
      .catch((error) => {
        ToastAndroid.show('Erro ao sair', ToastAndroid.SHORT);
        console.log(error);
      });
  }

  return (
    <ModalContainer>
      <InnerModal>
        <Close onPress={props.closeModal}>
          <IconFA name="close" size={15} color="#2b3dbb" />
        </Close>
        <TitleModal>Logout</TitleModal>
        <Text>Deseja mesmo sair?</Text>
        <BtnContainer>
          <TouchableOpacity onPress={props.closeModal}>
            <BtnText>Não</BtnText>
          </TouchableOpacity>
          <BtnText>|</BtnText>
          <TouchableOpacity onPress={() => logout()}>
            <BtnText>Sim</BtnText>
          </TouchableOpacity>
        </BtnContainer>
      </InnerModal>
    </ModalContainer>
  );
}
