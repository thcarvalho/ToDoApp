/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Cadastrar } from "./styles";
import { Container } from "../../styles/global-styles";

import api from "../../services/api";
import AsyncStorage from '@react-native-community/async-storage';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function verificarUsuario() {
      const token = await AsyncStorage.getItem('@userToken');
      if (token) {
        return props.navigation.navigate('Home');
      }
    }
    verificarUsuario();
  }, []);

  async function login() {
    try {
      const response = await api.post('/users/login', { email, password });
      
      const { token } = response.data;
      const { _id } = response.data.user;

      await AsyncStorage.setItem('@userId', _id);
      await AsyncStorage.setItem('@userToken', token);

      props.navigation.navigate('Home');
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
    }
  }

  return (
    <Container>
      <Input
        placeholder={'Digite seu Email'}
        onChangeText={(email) => setEmail(email)}
        keybordType={'email-address'}
        value={email}
      />
      <Input
        placeholder={'Digite sua Senha'}
        onChangeText={(password) => setPassword(password)}
        value={password}
        password={true}
      />
      <Button value={"ENTRAR"} onPress={() => login()} />
      <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
        <Cadastrar>Cadastrar-se</Cadastrar>
      </TouchableOpacity>
    </Container>
  );
}
