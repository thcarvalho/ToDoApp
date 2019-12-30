/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

import api from "../../services/api";
import AsyncStorage from '@react-native-community/async-storage';

import { Container } from '../../styles/global-styles';
import { ListContainer, ListTitulo, ListDescricao } from "./styles";
import { ScrollView } from 'react-native-gesture-handler';

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function recuperarTodos() {
      const token = await AsyncStorage.getItem('@userToken');
      try {
        const response = await api.get('/todos', {
          headers: { authToken: token }
        });
        const { todo } = response.data;
        setTodos(todo);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      }
    }
    recuperarTodos();
  }, []);

  function renderItem({ item }) {
    return (
      <ListContainer
        onPress={() => {}}
        activeOpacity={0.6}
      >
        <ListTitulo>{item.titulo}</ListTitulo>
        <ListDescricao>{item.descricao}</ListDescricao>
      </ListContainer>
    );
  }

  return (
    <Container>
      <ScrollView>
        <FlatList
          contentContainerStyle={{ flex: 1 }}
          data={todos}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />
      </ScrollView>
    </Container>
  );
}
