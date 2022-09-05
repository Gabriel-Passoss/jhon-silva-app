import { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../contexts/authContext';
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Barber } from '../pages/Barber';

const Stack = createNativeStackNavigator()

export function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // No token found, user isn't signed in
            <Stack.Screen name="Home" component={Barber} />
        ) : (
          // User is signed in
          <>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}