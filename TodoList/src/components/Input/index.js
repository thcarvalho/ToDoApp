/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import { View, TextInput } from 'react-native';
import { StyledInput } from "./styles";
// import { Container } from './styles';

export default function Input(props) {
  const [color, setColor] = useState('#ccc');
  return (
    <StyledInput
      placeholder={props.placeholder}
      onFocus={() => setColor('#2b3dbb')}
      onBlur={() => setColor('#ccc')}
      focusColor={color}
      onChangeText={props.onChangeText}
      value={props.value}
      keyboardType={props.keybordType}
      secureTextEntry={props.password}
      placeholderTextColor={color}
    />
  );
}
