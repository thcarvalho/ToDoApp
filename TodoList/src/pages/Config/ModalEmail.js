/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';

import IconFA from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-community/async-storage';

import { ModalContainer, InnerModal, TitleModal, Close, BtnContainer, BtnText } from './styles';
import Input from '../../components/Input';
import api from '../../services/api';

export default function ModalEmail(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function alterarEmail() {
    const token = await AsyncStorage.getItem('@userToken');
    const userId = await AsyncStorage.getItem('@userId');
    try {
      const response = await api.get(`/users/${userId}/verifypassword`,{
          headers: { authToken: token },
          params: { password }},
      );
      if (response.data.valid) {
        await api.put(`/users/${userId}/update`,
          { email },
          { headers: { authToken: token } }
        )
          .then(() => {
          props.closeModal();
          ToastAndroid.show('Email alterado com sucesso!', ToastAndroid.SHORT);
          })
          .catch(error => {
            ToastAndroid.show('Falha ao atualizar email', ToastAndroid.SHORT);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          });
      } else {
        return ToastAndroid.show("Senha Incorreta", ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Falha ao atualizar email', ToastAndroid.SHORT);
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
        <TitleModal>Alterar E-Mail</TitleModal>
        <Input
          placeholder="Novo Email"
          onChangeText={email => setEmail(email)}
          value={email}
        />
        <Input
          placeholder="Digite sua senha"
          onChangeText={password => setPassword(password)}
          value={password}
          password
        />
        <BtnContainer>
          <TouchableOpacity onPress={props.closeModal}>
            <BtnText>Cancelar</BtnText>
          </TouchableOpacity>
          <BtnText>|</BtnText>
          <TouchableOpacity onPress={alterarEmail}>
            <BtnText>Alterar</BtnText>
          </TouchableOpacity>
        </BtnContainer>
      </InnerModal>
    </ModalContainer>
  );
}
