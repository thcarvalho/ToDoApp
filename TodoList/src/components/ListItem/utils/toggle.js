/* eslint-disable prettier/prettier */
import {Animated, Easing} from "react-native";

export default function toggle(iconToggle, spinValue) {
  Animated.timing(spinValue, {
    toValue: !iconToggle ? 1.6 : 0,
    duration: 60,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();
}