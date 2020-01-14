import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';


export default function BackButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon name="ios-arrow-back" size={24} color="#2b3dbb" />
    </TouchableOpacity>
  );
}
