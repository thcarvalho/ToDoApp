/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, ToastAndroid, Modal } from 'react-native';
import IconFA from "react-native-vector-icons/FontAwesome5";
import IconFO from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-community/async-storage';

import { ListContainer, ListDescricao, ListTitulo } from './styles';
import api from "../../services/api";

import { FabSmall } from "../Fab";
import { Easing } from 'react-native-reanimated';
import ModalDelete from './ModalDelete';
import ModalEditar from './ModalEditar';

export default function ListItem(props) {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));
  const [iconToggle, setIconToggle] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);

  function toggle() {
    setIconToggle(!iconToggle);
    Animated.timing(spinValue, {
      toValue: !iconToggle ? 1.6 : 0,
      duration: 60,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  async function checkTodo() {

  }

  async function editTodo(titulo, descricao) {
    if (titulo === '' || descricao === '') {
      return ToastAndroid.show('Faltam campos obrigatórios!', ToastAndroid.SHORT);
    }
    const token = await AsyncStorage.getItem('@userToken');
    const userId = await AsyncStorage.getItem('@userId');
    const data = { titulo, descricao };
    await api.put(`/todos/${userId}/${props.id}/update`, data, {
      headers: { authToken: token },
    })
      .then(() => {
        ToastAndroid.show('Tarefa Atualizada!', ToastAndroid.SHORT);
        closeModal('edit');
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
    console.log(props.id);
    try {
      await api.delete(`/todos/${userId}/${props.id}/delete`, {
        headers: { authToken: token }
      });
      ToastAndroid.show('Tarefa deletada!', ToastAndroid.SHORT);
      console.log(props.todo);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }

  }

  function openModal(modal) {
    switch (modal) {
      case "delete":
        setModalDeleteVisible(true)
        break;
      case "edit":
        setModalEditVisible(true);
        break;
      default:
        break;
    }
  }
  function closeModal(modal) {
    switch (modal) {
      case "delete":
        setModalDeleteVisible(false);
        break;
      case "edit":
        setModalEditVisible(false);
        break;
      default:
        break;
    }
  }
  return (
    <ListContainer style={{ paddingBottom: iconToggle ? 20 : 15 }} >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <ListTitulo>{props.titulo}</ListTitulo>
          <ListDescricao>{props.descricao}</ListDescricao>
        </View>
        <TouchableOpacity style={[styles.icon, { transform: [{ rotate: spinValue }] }]}
          activeOpacity={0.8}
          onPress={() => toggle()}
        >
          <IconFA name="chevron-down" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
      {
        iconToggle && (
          <View style={styles.fabContainer}>
            <FabSmall
              activeOpacity={0.7}
              bgcolor={'#23a62c'}
              onPress={checkTodo}
            >
              <IconFA name="check" size={15} color="#fff" />
            </FabSmall>
            <FabSmall
              activeOpacity={0.7}
              bgcolor={'#030ffc'}
              onPress={() => openModal("edit")}
            >
              <IconFA name="pencil-alt" size={15} color="#fff" />
            </FabSmall>
            <FabSmall
              activeOpacity={0.7}
              bgcolor={'#d12121'}
              onPress={() => openModal("delete")}
            >
              <IconFO name="close" size={15} color="#fff" />
            </FabSmall>
            <Modal
              visible={modalDeleteVisible}
              animationType={'slide'}
              onRequestClose={() => closeModal("delete")}
              transparent
            >
              <ModalDelete
                deleteTodo={deleteTodo}
                closeModal={() => closeModal("delete")}
              />
            </Modal>
            <Modal
              visible={modalEditVisible}
              animationType={'slide'}
              onRequestClose={() => closeModal("edit")}
              transparent
            >
              <ModalEditar
                editTodo={editTodo}
                titulo={props.titulo}
                descricao={props.descricao}
                closeModal={() => closeModal("edit")}
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
