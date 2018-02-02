import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import About from "../screens/About/";
import Home from "../screens/home/";
import Geolocations from "../screens/geolocations/";
import SideBar from "../screens/sidebar";
import Settings from "../screens/settings";

const Drawer = DrawerNavigator(
    {
      Home: { screen: Home },
      Geolocations: { screen: Geolocations },
      About: { screen: About },
      Settings: { screen: Settings },
    },
    {
        initialRouteName: "Home",
        contentOptions: {
        activeTintColor: "#e91e63"
    },
      contentComponent: props => <SideBar {...props} />
    }
  );

const Routes =
    {
        Drawer: { screen: Drawer }
    };

export default Routes;
