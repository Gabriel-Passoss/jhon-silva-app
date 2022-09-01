import React from "react";
// 1. import `NativeBaseProvider` component
import { NativeBaseProvider, Text, Box } from "native-base";
import { Login } from "./components/Login";

export default function App() {
  return (
    <NativeBaseProvider>
     <Login />
    </NativeBaseProvider>
  );
}