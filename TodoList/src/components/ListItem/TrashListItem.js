/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, ToastAndroid, Modal } from 'react-native';

import IconFA from "react-native-vector-icons/FontAwesome";

import { ListContainer, ListTitulo, ListDescricao } from './styles';

import { FabSmall } from "../Fab";
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import ModalDelete from './ModalDelete';

export default function TrashListItem({ todo }) {
  const [modalVisible, setModalVisible] = useState(false);

  async function refazerTodo() {
    const token = await AsyncStorage.getItem('@userToken');
    const userId = await AsyncStorage.getItem('@userId');

    const data = { deletada: false };

    await api.put(`/todos/${userId}/${todo._id}/update`, data, {
      headers: { authToken: token },
    })
      .then(() => {
        ToastAndroid.show('Tarefa recuperada', ToastAndroid.SHORT);
      }
      )
      .catch(error => {
        ToastAndroid.show('Falha ao Atualizar Tarefa!', ToastAndroid.SHORT);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      );
  }

  async function deleteTodo() {
    const token = await AsyncStorage.getItem('@userToken');
    const userId = await AsyncStorage.getItem('@userId');
    try {
      await api.delete(`/todos/${userId}/${todo._id}/delete`, {
        headers: { authToken: token },
      });
      ToastAndroid.show('Tarefa deletada!', ToastAndroid.SHORT);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }

  }

  return (
    <ListContainer>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <ListTitulo>{todo.titulo}</ListTitulo>
          <ListDescricao>{todo.descricao}</ListDescricao>
        </View>
        <View style={{ flexDirection: "row" }}>
          <FabSmall
            bgcolor="#030ffc"
            onPress={refazerTodo}
          >
            <IconFA name="undo" size={15} color="#fff" />
          </FabSmall>
          <FabSmall
            style={{ marginLeft: 10 }}
            bgcolor="#d12121"
            onPress={() => setModalVisible(true)}
          >
            <IconFA name="close" size={15} color="#fff" />
          </FabSmall>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        animationType={'fade'}
        onRequestClose={() => setModalVisible(false)}
        transparent
      >
        <ModalDelete
          deleteTodo={deleteTodo}
          closeModal={() => setModalVisible(false)}
        />
      </Modal>
    </ListContainer>
  );
}
