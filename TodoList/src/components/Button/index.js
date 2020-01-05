import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { StyledButton, StyledText, StyledSmallButton } from './styles';

export default function Button(props) {
  return (
    <StyledButton activeOpacity={0.6} onPress={props.onPress}>
      <StyledText>{props.value}</StyledText>
    </StyledButton>
  );
}
export function SmallButton(props) {
  return (
    <StyledSmallButton activeOpacity={0.6} onPress={props.onPress}>
      <StyledText>{props.value}</StyledText>
    </StyledSmallButton>
  );
}
