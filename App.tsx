import React from "react";
import 'react-native-gesture-handler';
import { NativeBaseProvider } from "native-base";

import { AppRoutes } from "./src/routes/app.routes";
import { AuthProvider } from "./src/contexts/authContext";

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
          <AppRoutes />
      </AuthProvider>
    </NativeBaseProvider>
  );
}