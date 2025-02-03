import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeIcon, ListIcon, AddIcon } from '@components';

import { AddScreen, EditScreen, HomeScreen, ListScreen } from '@screens';
import { StoreProvider } from '@context';

// Stack Navigator
const Root = createStackNavigator<RootStackParamList>();

type RootStackParamList = {
  Add: undefined;
  Edit: undefined;
  Home: undefined;
  List: undefined;
};

/*
  ABSTRACTION AND REUSABILITY
  We can abstract functionality here such as:
  - navigators
  - screen animations
  - screen options
  - screen headers
  We can also add separate context providers for each navigator
*/

/*
  Depending on the application size and complexity,
  the abstractions can be separated into different navigator directories/files if needed
*/
const RootNavigation = () => {
  return (
    <StoreProvider>
      <Root.Navigator
        id={undefined}
        initialRouteName='Home'
        screenOptions={{
          headerLeft: null,
        }}
      >
        <Root.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Root.Screen name='Add' component={AddScreen} />
        <Root.Screen name='List' component={ListScreen} />
        <Root.Screen name='Edit' component={EditScreen} />
      </Root.Navigator>
    </StoreProvider>
  );
};

type BottomTabParamList = {
  Add: undefined;
  Home: undefined;
  List: undefined;
};
const Tab = createBottomTabNavigator<BottomTabParamList>();

// App Navigation
// This is the main navigation container
// allows to add multiple navigators
// for authenticated and unauthenticated users

const MyTabBar = () => (
  <Tab.Navigator id={undefined}>
    <Tab.Screen
      name='Home'
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => <HomeIcon color={color} />,
      }}
    />
    <Tab.Screen
      name='Add'
      component={AddScreen}
      options={{
        tabBarIcon: ({ color, size }) => <AddIcon color={color} />,
      }}
    />
    <Tab.Screen
      name='List'
      component={ListScreen}
      options={{
        tabBarIcon: ({ color, size }) => <ListIcon color={color} />,
      }}
    />
  </Tab.Navigator>
);

const AppNavigation = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <MyTabBar />
      </NavigationContainer>
    </StoreProvider>
  );
};

export default AppNavigation;
