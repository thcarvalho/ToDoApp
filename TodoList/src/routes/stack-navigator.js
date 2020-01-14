/* eslint-disable prettier/prettier */
import { createAppContainer, createStackNavigator } from 'react-navigation';

import SignIn from '../pages/SignIn';
import Config from '../pages/Config';

const StackNavigator = createStackNavigator({
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        header: null,
      },
    },
    Config: {
      screen: Config,
      navigationOptions: {
        header: null,
      },
    },
  });

export default createAppContainer(StackNavigator);
