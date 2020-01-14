/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';

import api from "../../services/api";
import AsyncStorage from '@react-native-community/async-storage';

import { Container, Header, HeaderTitle } from '../../styles/global-styles';
import ListItem from "../../components/ListItem";
import ModalAddTodo from "./ModalAddTodo";
import { FabLarge } from "../../components/Fab";

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconIO from 'react-native-vector-icons/Ionicons';

export default function Home(props) {
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    recuperarTodos();
  }, [todos]);

  async function recuperarTodos() {
    const token = await AsyncStorage.getItem('@userToken');
    const id = await AsyncStorage.getItem('@userId');
    try {
      const response = await api.get(`/todos/${id}`, {
        headers: { authToken: token }
      });
      const { todo } = response.data;
      setTodos(todo);
      setRefreshing(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  }

  function addTodo(todo) {
    setTodos([...todos, todo]);
    closeModal();
  }


  function renderItem({ item }) {
    return (
      <ListItem todo={todos} titulo={item.titulo} descricao={item.descricao} id={item._id} />
    );
  }

  function openModal() {
    setModalVisible(true);
  }
  function closeModal() {
    setModalVisible(false);
  }

  return (
    <Container>
      {
        todos != 0 ? (
          <FlatList
            style={{ marginTop: 50 }}
            data={todos}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            onRefresh={() => {
              recuperarTodos();
              setRefreshing(true);
            }}
            refreshing={refreshing}
          />
        ) : (
          loading ? (
            <ActivityIndicator animating color={'#2b3dbb'} size={'large'} />
          ) : (
            <Text>Nada aqui</Text>
          )
        )
      }
      <Header>
        <TouchableOpacity activeOpacity={0.7} onPress={props.navigation.openDrawer}>
          <Icon name="bars" size={24} color="#2b3dbb" />
        </TouchableOpacity>
        <HeaderTitle>ToDo List</HeaderTitle>
        {/* <TouchableOpacity onPress={() => props.navigation.navigate('Config')} activeOpacity={0.7}>
          <IconIO name="md-settings" size={24} color={'#2b3dbb'} />
        </TouchableOpacity> */}
        <View />
      </Header>
      <FabLarge
        style={styles.fab}
        bgcolor={"#2b3dbb"}
        activeOpacity={0.7}
        onPress={openModal}
      >
        <Icon name="plus" size={20} color={'#fff'} />
      </FabLarge>
      <Modal
        visible={modalVisible}
        animationType={'slide'}
        onRequestClose={closeModal}
        transparent
      >
        <ModalAddTodo addTodo={addTodo} closeModal={closeModal} />
      </Modal>
    </Container >
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 3,
  },
});
