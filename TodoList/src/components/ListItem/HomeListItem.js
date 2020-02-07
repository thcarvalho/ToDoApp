/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, ToastAndroid, Modal, Dimensions } from 'react-native';
import IconFA from "react-native-vector-icons/FontAwesome5";
import IconFO from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-community/async-storage';

import { ListContainer, ListDescricao, ListTitulo } from './styles';
import api from "../../services/api";

import { FabSmall } from "../Fab";
import { Easing } from 'react-native-reanimated';
import ModalDelete from './ModalDelete';
import ModalEditar from './ModalEditar';
import toggle from './utils/toggle';

export default function ListItem({ todo }) {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));
  const [iconToggle, setIconToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  async function checkTodo() {
    const token = await AsyncStorage.getItem('@userToken');
    const userId = await AsyncStorage.getItem('@userId');
    const data = { concluido: true };
    await api.put(`/todos/${userId}/${todo._id}/update`, data, {
      headers: { authToken: token },
    })
      .then(() => {
        ToastAndroid.show('Tarefa Concluida!', ToastAndroid.SHORT);
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

  async function editTodo(titulo, descricao) {
    if (titulo === '' || descricao === '') {
      return ToastAndroid.show('Faltam campos obrigatórios!', ToastAndroid.SHORT);
    }
    const token = await AsyncStorage.getItem('@userToken');
    const userId = await AsyncStorage.getItem('@userId');
    const data = { titulo, descricao };
    await api.put(`/todos/${userId}/${todo._id}/update`, data, {
      headers: { authToken: token },
    })
      .then(() => {
        ToastAndroid.show('Tarefa Atualizada!', ToastAndroid.SHORT);
        setModalVisible(false)
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
      await api.put(`/todos/${userId}/${todo._id}/update`, data,{
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
    <ListContainer style={{ paddingBottom: iconToggle ? 20 : 15 }} >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <ListTitulo>{todo.titulo}</ListTitulo>
          <ListDescricao>{todo.descricao}</ListDescricao>
        </View>
        <TouchableOpacity style={[styles.icon, { transform: [{ rotate: spinValue }] }]}
          activeOpacity={0.8}
          onPress={() => {
            toggle(iconToggle, spinValue);
            setIconToggle(!iconToggle);
          }}
        >
          <IconFA name="chevron-down" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
      {
        iconToggle && (
          <View style={styles.fabContainer}>
            <FabSmall
              bgcolor={'#23a62c'}
              onPress={checkTodo}
            >
              <IconFA name="check" size={15} color="#fff" />
            </FabSmall>
            <FabSmall
              bgcolor={'#030ffc'}
              onPress={() => setModalVisible(true)}
            >
              <IconFA name="pencil-alt" size={15} color="#fff" />
            </FabSmall>
            <FabSmall
              bgcolor={'#d12121'}
              onPress={deleteTodo}
            >
              <IconFO name="trash" size={15} color="#fff" />
            </FabSmall>
            
            <Modal
              visible={modalVisible}
              animationType={'fade'}
              onRequestClose={() => setModalVisible(false)}
              transparent
            >
              <ModalEditar
                editTodo={editTodo}
                titulo={todo.titulo}
                descricao={todo.descricao}
                closeModal={() => setModalVisible(false)}
              />
            </Modal>
          </View>
        )
      }
    </ListContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabContainer: {
    flexDirection: "row",
    paddingHorizontal: 25,
    justifyContent: "space-between",
    marginTop: 20,
  }
})
