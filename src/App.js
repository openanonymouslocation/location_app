import React from "react";
import { Root } from "native-base";

import { StackNavigator } from 'react-navigation';
import Routes from './navigators/routes';


let AppNavigator = StackNavigator(Routes, {
  initialRouteName: "Drawer",
  headerMode: "none"
});

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
