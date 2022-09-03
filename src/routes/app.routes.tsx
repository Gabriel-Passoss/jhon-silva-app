import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../components/Login'
import { Register } from '../components/Register'
import { Home } from '../components/Home';

const { Navigator, Screen } = createBottomTabNavigator()

const Stack = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false}}>
        <Screen name="Register" component={Register} />
        <Screen name="Login" component={Login} />
        <Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}