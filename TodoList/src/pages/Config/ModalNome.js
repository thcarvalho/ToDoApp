/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';

import IconFA from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-community/async-storage';

import { ModalContainer, InnerModal, TitleModal, Close, BtnContainer, BtnText } from './styles';
import Input from '../../components/Input';
import api from '../../services/api';

export default function ModalNome(props) {
  const [nome, setNome] = useState('');

  async function alterarNome() {
    const token = await AsyncStorage.getItem('@userToken');
    const userId = await AsyncStorage.getItem('@userId');
    try {
      await api.put(`/users/${userId}/update`,
        { username: nome },
        { headers: { authToken: token } }
      )
        .then(() => {
          ToastAndroid.show('Nome alterado com sucesso!', ToastAndroid.SHORT);
          props.closeModal();
        })
        .catch(error => {
          ToastAndroid.show('Falha ao atualizar nome', ToastAndroid.SHORT);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    } catch (error) {
      ToastAndroid.show('Falha ao atualizar nome', ToastAndroid.SHORT);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }

  }

  return (
    <ModalContainer>
      <InnerModal>
        <Close onPress={props.closeModal}>
          <IconFA name="close" size={15} color="#2b3dbb" />
        </Close>
        <TitleModal>Alterar Nome</TitleModal>
        <Input
          placeholder="Novo Nome"
          onChangeText={nome => setNome(nome)}
          value={nome}
        />
        <BtnContainer>
          <TouchableOpacity onPress={props.closeModal}>
            <BtnText>Cancelar</BtnText>
          </TouchableOpacity>
          <BtnText>|</BtnText>
          <TouchableOpacity onPress={alterarNome}>
            <BtnText>Alterar</BtnText>
          </TouchableOpacity>
        </BtnContainer>
      </InnerModal>
    </ModalContainer>
  );
}
