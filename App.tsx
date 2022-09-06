import React from "react";
import 'react-native-gesture-handler';
import { NativeBaseProvider } from "native-base";
import { LogBox } from 'react-native';

import { AppRoutes } from "./src/routes/app.routes";
import { AuthProvider } from "./src/contexts/authContext";

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
          <AppRoutes />
      </AuthProvider>
    </NativeBaseProvider>
  );
}