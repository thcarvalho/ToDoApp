/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { Container } from '../../styles/global-styles';
import Input from "../../components/Input";
import Button from "../../components/Button";
import AsyncStorage from '@react-native-community/async-storage';

import api from "../../services/api";

export default function SignIn(props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submitUser() {
    try {
      const response = await api.post('/users/add', {
        username: nome,
        email,
        password,
      });

      const { token } = response.data;
      const { _id } = response.data.user;
      console.log(token, _id);
      
      await AsyncStorage.setItem('@userId', _id);
      await AsyncStorage.setItem('@userToken', token);

      props.navigation.navigate('Home', { token });

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Input placeholder={'Nome'} onChangeText={(nome) => setNome(nome)} />
      <Input placeholder={'E-Mail'} onChangeText={(email) => setEmail(email)} />
      <Input placeholder={'Senha'} onChangeText={(password) => setPassword(password)} />
      <Button value={'CADASTRAR'} onPress={() => submitUser()} />
    </Container>
  );
}
