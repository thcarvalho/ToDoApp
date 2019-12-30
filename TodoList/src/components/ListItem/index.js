/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import IconFA from "react-native-vector-icons/FontAwesome5";
import IconFO from "react-native-vector-icons/FontAwesome";

import { ListContainer, ListDescricao, ListTitulo } from './styles';
import { FabSmall } from "../Fab";
import { Easing } from 'react-native-reanimated';

export default function ListItem(props) {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));
  const [iconToggle, setIconToggle] = useState(false);

  function toggle() {
    setIconToggle(!iconToggle);
    Animated.timing(spinValue, {
      toValue: !iconToggle ? 1.6 : 0,
      duration: 60,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
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
            <FabSmall activeOpacity={0.7} bgcolor={'#23a62c'}>
              <IconFA name="check" size={15} color="#fff" />
            </FabSmall>
            <FabSmall activeOpacity={0.7} bgcolor={'#030ffc'}>
              <IconFA name="pencil-alt" size={15} color="#fff" />
            </FabSmall>
            <FabSmall activeOpacity={0.7} bgcolor={'#d12121'}>
              <IconFO name="close" size={15} color="#fff" />
            </FabSmall>
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
  container: {
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    padding: 15,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
  },
  fabContainer: {
    flexDirection: "row",
    paddingHorizontal: 25,
    justifyContent: "space-between",
    marginTop: 20,
  }
})
