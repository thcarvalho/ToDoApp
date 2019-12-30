/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import api from "../../services/api";
import AsyncStorage from '@react-native-community/async-storage';

import { Container } from '../../styles/global-styles';
import ListItem from "../../components/ListItem";
import { FabLarge } from "../../components/Fab";
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
      <ListItem titulo={item.titulo} descricao={item.descricao} />
    );
  }

  return (
    <Container>
      <FlatList
        data={todos}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
      <FabLarge
        style={styles.fab}
        bgcolor={"#2b3dbb"}
        activeOpacity={0.7}
      >
        <Icon name="plus" size={20} color={'#fff'} />
      </FabLarge>
    </Container>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 3,
  }
})
