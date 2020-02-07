/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, ActivityIndicator, Text } from 'react-native';
import { Header, HeaderTitle } from '../../styles/global-styles';
import BackButton from '../../components/BackButton';

import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import TrashListItem from '../../components/ListItem/TrashListItem';

export default function Trash(props) {
  const [todos, setTodos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    recuperarTodos();
  }, [todos]);

  async function recuperarTodos() {
    const token = await AsyncStorage.getItem('@userToken');
    const id = await AsyncStorage.getItem('@userId');
    try {
      const response = await api.get(`/todos/${id}/trash`, {
        headers: { authToken: token },
      });
      setTodos(response.data);
      setRefreshing(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  }

  function renderItem({ item }) {
    return (
      <TrashListItem todo={item} />
    )
  }
  return (
    <>
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
        <HeaderTitle>Lixeira</HeaderTitle>
        <View />
      </Header>
    </>
  );
}