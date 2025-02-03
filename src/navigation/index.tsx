import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeIcon, ListIcon, AddIcon } from '@components';
import { AddScreen, EditScreen, HomeScreen, ListScreen } from '@screens';
import { StoreProvider } from '@context';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

const MyTabBar = () => (
  <Tab.Navigator id={undefined}>
    <Tab.Screen
      name='Home'
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => <HomeIcon color={color} />,
      }}
    />
    <Tab.Screen
      name='Add'
      component={AddScreen}
      options={{
        tabBarIcon: ({ color }) => <AddIcon color={color} />,
      }}
    />
    <Tab.Screen
      name='List'
      component={ListScreen}
      options={{
        tabBarIcon: ({ color }) => <ListIcon color={color} />,
      }}
    />
  </Tab.Navigator>
);

/*
  App Navigation
  - This is the main navigation container
  - Allows multiple navigators (e.g., for authenticated vs. unauthenticated users)
  - The Edit screen is presented as a modal
*/

const AppNavigation = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
          <Stack.Screen name='MainTabs' component={MyTabBar} />
          <Stack.Screen
            name='Edit'
            component={EditScreen}
            options={{
              presentation: 'modal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

export default AppNavigation;
