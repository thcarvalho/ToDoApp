/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ToastAndroid } from 'react-native';

import IconFA from "react-native-vector-icons/FontAwesome";

import { ListContainer, ListTitulo, ListDescricao } from './styles';

import { FabSmall } from "../Fab";
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default function CompletedListItem({ todo }) {


  async function refazerTodo() {
    const token = await AsyncStorage.getItem('@userToken');
    const userId = await AsyncStorage.getItem('@userId');
    const data = { concluido: false };

    await api.put(`/todos/${userId}/${todo._id}/update`, data, {
      headers: { authToken: token },
    })
      .then(() => {
        ToastAndroid.show('Nova tarefa para concluir', ToastAndroid.SHORT);
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
    const data = { deletada: true }
    try {
      await api.put(`/todos/${userId}/${todo._id}/update`, data, {
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
            onPress={deleteTodo}
          >
            <IconFA name="trash" size={15} color="#fff" />
          </FabSmall>
        </View>
      </View>
    </ListContainer>
  );
}
