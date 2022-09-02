import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Login } from '../components/Login'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="Login" component={Login} />
    </Navigator>
  )
}