/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import IconFA from "react-native-vector-icons/FontAwesome";

import { ModalContainer, InnerModal, Close, Titulo, BtnText, BtnContainer } from "./styles";

export default function ModalDelete(props) {
  return (
    <ModalContainer>
      <InnerModal>
        <Close onPress={props.closeModal}>
          <IconFA name="close" size={15} color="#2b3dbb" />
        </Close>
        <Titulo>Excluir</Titulo>
        <Text style={styles.text}>Deseja mover esta tarefa para a lixeira?</Text>
        <BtnContainer>
          <TouchableOpacity onPress={props.closeModal}>
            <BtnText>Cancelar</BtnText>
          </TouchableOpacity>
          <BtnText>|</BtnText>
          <TouchableOpacity onPress={props.deleteTodo}>
            <BtnText>Excluir</BtnText>
          </TouchableOpacity>
        </BtnContainer>
      </InnerModal>
    </ModalContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingTop: 15,
    fontSize: 15,
    color: "#858585",
  },
});
