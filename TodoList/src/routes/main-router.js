import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Switch from "./switch-navigator";
import Drawer from "./drawer-navigation";
import Stack from "./stack-navigator";

const SwitchNavigator = createSwitchNavigator({
  Switch,
  Stack,
  Drawer,
});

export default createAppContainer(SwitchNavigator);
