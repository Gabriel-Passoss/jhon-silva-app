import { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../contexts/authContext';
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Home } from '../pages/Home';

const Stack = createNativeStackNavigator()

export function AppRoutes() {
  const { user } = useContext(AuthContext)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
          </>
        ) : (
          // User is signed in
          <Stack.Screen name="Home" component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}