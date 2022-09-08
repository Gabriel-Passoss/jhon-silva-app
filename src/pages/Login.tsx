import { Box, Heading, VStack, Text, Image, Flex, Alert } from "native-base";
import { StatusBar } from 'expo-status-bar'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'

import { LoginForm } from "../components/Forms/LoginForm";

export function Login({ navigation }) {

  return (
    <>
      <StatusBar style="dark" />
      <Flex alignItems="center" justifyContent="center" h="100%">
        <Image source={require('../../assets/logo-img.png')} h="250px" w="250px" alt="Jhon-Silva logor" borderRadius="xl" />
        <Flex alignItems="center" width="100%">
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Box p="2" w="90%" maxW="290">
              <Heading textAlign="center" size="lg" fontWeight="600" color="coolGray.800" _dark={{
                color: "warmGray.50"
              }}>
                Bem-vindo barbeiro!
              </Heading>
              <Heading textAlign="center" mt="1" _dark={{
                color: "warmGray.200"
              }} color="coolGray.600" fontWeight="medium" size="xs">
                Entre na sua conta para continuar
              </Heading>

              <VStack space={3} mt="5">
                <LoginForm navigation={navigation} />
              </VStack>
            </Box>
          </TouchableWithoutFeedback>
        </Flex>
      </Flex>
    </>
  )
}
