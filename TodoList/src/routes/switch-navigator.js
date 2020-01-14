/* eslint-disable prettier/prettier */
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from '../pages/Home';
import Login from '../pages/Login';
import SignIn from '../pages/SignIn';

const SwitchNavigator = createSwitchNavigator({
  Login,
  // SignIn,
  // Home,
  // Config,
});

export default createAppContainer(SwitchNavigator);
