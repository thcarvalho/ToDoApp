/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from "../../services/api";

import IconFA from 'react-native-vector-icons/FontAwesome';

import Button from "../../components/Button";
import Input from "../../components/Input";

export default function ModalAddTodo(props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  async function addTodo() {
    if (titulo === '' || descricao === '') {
      return ToastAndroid.show("Faltam dados obrigatórios", ToastAndroid.SHORT);
    }
    const id = await AsyncStorage.getItem('@userId');
    const token = await AsyncStorage.getItem('@userToken');
    const data = {
      titulo,
      descricao,
      user: id,
    }
    try {
      const response = await api.post(`/todos/${id}/new`, data, {
        headers: { authToken: token },
      });


      const todo = response.data;
      // console.log(response.data);
      ToastAndroid.show("Nova tarefa adicionada", ToastAndroid.SHORT);
      props.addTodo(todo);
      setTitulo('');
      setDescricao('');

    } catch (error) {
      ToastAndroid.show("Erro ao adicionar tarefa", ToastAndroid.SHORT);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  }
  return (
    <View style={styles.modalContainer}>
      <View style={styles.innerModal}>
        <TouchableOpacity onPress={props.closeModal} style={styles.close}>
          <IconFA name="close" size={15} color="#2b3dbb" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Nova Tarefa</Text>
        <Input
          placeholder={"Titulo"}
          onChangeText={(titulo) => setTitulo(titulo)}
          value={titulo}
        />
        <Input
          placeholder={"Descrição"}
          onChangeText={(descricao) => setDescricao(descricao)}
          value={descricao}
        />
        <Button onPress={addTodo} value={"Adicionar"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  close: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2b3dbb",
  },
  modalContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  innerModal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
    // width: 320,
    // height: 230,
    height: 600,
    borderWidth: 1,
    borderColor: "#2b3dbb",
    // borderRadius: 5,
    elevation: 5,
  }
})

