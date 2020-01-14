/* eslint-disable prettier/prettier */
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import Completed from "../pages/Completed";
import Home from "../pages/Home";
import Trash from "../pages/Trash";
import Config from '../pages/Config';

const DrawerNavigation = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    Completed: {
      screen: Completed,
      navigationOptions: () => ({
        title: 'Concluidas',
      }),
    },
    Trash: {
      screen: Trash,
      navigationOptions: () => ({
        title: 'Lixeira',
      }),
    },
    Config: {
      screen: Config,
      navigationOptions: () => ({
        title: 'Configurações',
      }),
    },
  },
  {
    overlayColor: 'rgba(0,0,0,0.4)',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#2b3dbb',
    },
  }
);
export default createAppContainer(DrawerNavigation);
