import React from 'react';
import { View, TouchableOpacity} from 'react-native';
import { Header, HeaderTitle } from '../../styles/global-styles';
import BackButton from '../../components/BackButton';

import Icon from 'react-native-vector-icons/FontAwesome5';
// import { Container } from './styles';


export default function Completed(props) {
  return (
    <Header>
      <TouchableOpacity activeOpacity={0.7} onPress={props.navigation.openDrawer}>
          <Icon name="bars" size={24} color="#2b3dbb" />
        </TouchableOpacity>
      <HeaderTitle>Tarefas Concluidas</HeaderTitle>
      <View />
    </Header>
  );
}
