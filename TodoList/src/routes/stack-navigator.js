/* eslint-disable prettier/prettier */
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Home from '../pages/Home';
import Login from '../pages/Login';
import SignIn from '../pages/SignIn';

const StackNavigation = createStackNavigator({
  // Login: {
  //   screen: Login,
  //   navigationOptions: () => ({
  //     title: 'TodoList',
  //     headerStyle: {
  //       backgroundColor: "#2b3dbb"
  //     },
  //     headerTintColor: "#FFF"
  //   }),
  // },
  // SignIn: {
  //   screen: SignIn,
  //   navigationOptions: () => ({
  //     title: 'TodoList',
  //     headerStyle: {
  //       backgroundColor: "#2b3dbb"
  //     },
  //     headerTintColor: "#FFF"
  //   }),
  // },
  Home: {
    screen: Home,
    navigationOptions: () => ({
      title: 'TodoList',
      headerStyle: {
        backgroundColor: '#2b3dbb',
      },
      headerTintColor: '#FFF',
    }),
  },
});

export default createAppContainer(StackNavigation);
