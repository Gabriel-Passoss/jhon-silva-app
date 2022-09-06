import { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../contexts/authContext';
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Barber } from '../pages/Barber';
import { FrontDesk } from '../pages/FrontDesk';

const Stack = createNativeStackNavigator()

export function AppRoutes() {
  const { isAuthenticated , user} = useContext(AuthContext)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          user.service === "barber" ?
            <Stack.Screen name="Barber" component={Barber} />
            :
            <Stack.Screen name="FrontDesk" component={FrontDesk} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}