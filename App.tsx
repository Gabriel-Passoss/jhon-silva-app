import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider, Text, Box } from "native-base";

import { AppRoutes } from "./src/routes/app.routes";
import { Login } from "./src/components/Login";
import { AuthProvider } from "./src/contexts/authContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
          <AppRoutes />
      </AuthProvider>
    </NativeBaseProvider>
  );
}