/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';

import IconFA from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-community/async-storage';

import { ModalContainer, InnerModal, TitleModal, Close, BtnContainer, BtnText } from './styles';
import Input from '../../components/Input';
import api from '../../services/api';

export default function ModalSenha(props) {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [senhaNova, setSenhaNova] = useState('');

  async function alterarSenha() {
    const token = await AsyncStorage.getItem('@userToken');
    const userId = await AsyncStorage.getItem('@userId');
    try {
      const response = await api.get(`/users/${userId}/verifypassword`, {
        headers: { authToken: token },
        params: { password: senhaAtual },
      });
      if (response.data.valid) {
        await api.put(`/users/${userId}/updatepassword`,
          { password: senhaNova },
          { headers: { authToken: token } }
          )
          .then(() => {
          props.closeModal();
          ToastAndroid.show('Senha alterada com sucesso!', ToastAndroid.SHORT);
          })
          .catch(error => {
            ToastAndroid.show('Falha ao atualizar senha', ToastAndroid.SHORT);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          });
      } else {
        return ToastAndroid.show("Senha Incorreta", ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Falha ao atualizar senha', ToastAndroid.SHORT);
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
        <TitleModal>Alterar Senha</TitleModal>
        <Input
          placeholder="Digite sua senha atual"
          onChangeText={senhaAtual => setSenhaAtual(senhaAtual)}
          password
          value={senhaAtual}
        />
        <Input
          placeholder="Digite sua nova senha"
          onChangeText={senhaNova => setSenhaNova(senhaNova)}
          value={senhaNova}
          password
        />
        <BtnContainer>
          <TouchableOpacity onPress={props.closeModal}>
            <BtnText>Cancelar</BtnText>
          </TouchableOpacity>
          <BtnText>|</BtnText>
          <TouchableOpacity onPress={alterarSenha}>
            <BtnText>Alterar</BtnText>
          </TouchableOpacity>
        </BtnContainer>
      </InnerModal>
    </ModalContainer>
  );
}
