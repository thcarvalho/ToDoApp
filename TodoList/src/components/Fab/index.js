/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';

import { Fab1, Fab2 } from './styles';

export function FabSmall(props) {
  return (
    <Fab1
      style={props.style}
      activeOpacity={props.activeOpacity}
      bgcolor={props.bgcolor}
    >
      {props.children}
    </Fab1>
  );
}
export function FabLarge(props) {
  return (
    <Fab2 style={props.style}
      activeOpacity={props.activeOpacity}
      bgcolor={props.bgcolor}
    >
      {props.children}
    </Fab2>
  );
}
