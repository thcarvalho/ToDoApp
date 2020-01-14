/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import { SmallContainer, Title, Content, Logout } from "./styles";
import { Header, HeaderTitle } from "../../styles/global-styles";

import BackButton from "../../components/BackButton";
import ModalLogout from "./ModalLogout";

export default function Config(props) {
  const [modalVisible, setModalVisible] = useState(false);
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

  function openModal() {
    setModalVisible(true);
  }
  function closeModal() {
    setModalVisible(false);
  }
  function logout() {
    props.navigation.navigate('Login');
  }

  return (
    <View>
      <View style={{ marginTop: 50 }}>
        <SmallContainer style={{borderTopWidth: 0}}>
          <View style={{ padding: 15 }}>
            <Title>Nome:</Title>
            <Content>{nome}</Content>
          </View>
        </SmallContainer>
        <SmallContainer>
          <View style={{ padding: 15 }}>
            <Title>E-Mail:</Title>
            <Content>{email}</Content>
          </View>
        </SmallContainer>
        <SmallContainer>
          <View style={{ padding: 15 }}>
            <Title>Senha:</Title>
            <Content>*********</Content>
          </View>
        </SmallContainer>
        <SmallContainer style={{borderBottomWidth: 1}}>
          <TouchableOpacity activeOpacity={0.6} onPress={openModal} style={{ padding: 15 }}>
            <Logout>Logout</Logout>
          </TouchableOpacity>
        </SmallContainer>
      </View>
      <Modal
        visible={modalVisible}
        onRequestClose={closeModal}
        animationType={'slide'}
        transparent
      >
        <ModalLogout logout={logout} closeModal={closeModal} />
      </Modal>
      <Header>
        <BackButton onPress={() => props.navigation.navigate('Home')} />
        <HeaderTitle>Configurações</HeaderTitle>
        <View />
      </Header>
    </View>
  );
}
