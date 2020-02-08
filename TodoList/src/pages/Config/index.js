/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import { SmallContainer, Title, Content, Logout } from "./styles";
import { Header, HeaderTitle } from "../../styles/global-styles";

import BackButton from "../../components/BackButton";
import ModalLogout from "./ModalLogout";
import ModalEmail from './ModalEmail';
import ModalNome from './ModalNome';
import ModalSenha from './ModalSenha';

export default function Config(props) {
  const [modalEmailVisible, setModalEmailVisible] = useState(false);
  const [modalSenhaVisible, setModalSenhaVisible] = useState(false);
  const [modalNomeVisible, setModalNomeVisible] = useState(false);
  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [nome, setNome] = useState('...');
  const [email, setEmail] = useState('...');

  useEffect(() => {
    async function getUser() {
      const id = await AsyncStorage.getItem('@userId');
        await api.get(`/users/${id}`)
        .then((response) => {
          setNome(response.data.username);
          setEmail(response.data.email);
        })
        .catch(error => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    }
    getUser();
  }, []);

  function logout() {
    props.navigation.navigate('Login');
  }

  return (
    <View>
      <View style={{ marginTop: 50 }}>
        <SmallContainer onPress={() => setModalNomeVisible(true)} style={{borderTopWidth: 0}}>
          <View style={{ padding: 15 }}>
            <Title>Nome:</Title>
            <Content>{nome}</Content>
          </View>
        </SmallContainer>
        <SmallContainer onPress={() => setModalEmailVisible(true)} activeOpacity={0.6}>
          <View style={{ padding: 15 }}>
            <Title>E-Mail:</Title>
            <Content>{email}</Content>
          </View>
        </SmallContainer>
        <SmallContainer onPress={() => setModalSenhaVisible(true)} >
          <View style={{ padding: 15 }}>
            <Title>Senha:</Title>
            <Content>*********</Content>
          </View>
        </SmallContainer>
        <SmallContainer style={{borderBottomWidth: 1}}>
          <TouchableOpacity activeOpacity={0.6} onPress={() => setModalLogoutVisible(true)} style={{ padding: 15 }}>
            <Logout>Logout</Logout>
          </TouchableOpacity>
        </SmallContainer>
      </View>
      <Modal
        visible={modalEmailVisible}
        onRequestClose={() => setModalEmailVisible(false)}
        animationType={'fade'}
        transparent
      >
        <ModalEmail closeModal={() => setModalEmailVisible(false)} />
      </Modal>
      <Modal
        visible={modalNomeVisible}
        onRequestClose={() => setModalNomeVisible(false)}
        animationType={'fade'}
        transparent
      >
        <ModalNome closeModal={() => setModalNomeVisible(false)} />
      </Modal>
      <Modal
        visible={modalSenhaVisible}
        onRequestClose={() => setModalSenhaVisible(false)}
        animationType={'fade'}
        transparent
      >
        <ModalSenha closeModal={() => setModalSenhaVisible(false)} />
      </Modal>
      <Modal
        visible={modalLogoutVisible}
        onRequestClose={() => setModalLogoutVisible(false)}
        animationType={'fade'}
        transparent
      >
        <ModalLogout logout={logout} closeModal={() => setModalLogoutVisible(false)} />
      </Modal>
      <Header>
        <BackButton onPress={() => props.navigation.navigate('Home')} />
        <HeaderTitle>Configurações</HeaderTitle>
        <View />
      </Header>
    </View>
  );
}
