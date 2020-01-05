/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import IconFA from "react-native-vector-icons/FontAwesome";

import Input from "../Input";
import { SmallButton } from "../Button";

import { ModalContainer, InnerModal, Close, Titulo, BtnText, BtnContainer } from "./styles";

export default function ModalEditar(props) {
  const [titulo, setTitulo] = useState(props.titulo);
  const [descricao, setDescricao] = useState(props.descricao);

  return (
    <ModalContainer>
      <InnerModal>
        <Close onPress={props.closeModal}>
          <IconFA name="close" size={15} color="#2b3dbb" />
        </Close>
        <Titulo>Editar</Titulo>
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
        <BtnContainer>
          <TouchableOpacity onPress={props.closeModal}>
            <BtnText>Cancelar</BtnText>
          </TouchableOpacity>
          <BtnText>|</BtnText>
          <TouchableOpacity onPress={() => props.editTodo(titulo, descricao)}>
            <BtnText>Atualizar</BtnText>
          </TouchableOpacity>
        </BtnContainer>
      </InnerModal>
    </ModalContainer>
  );
}
