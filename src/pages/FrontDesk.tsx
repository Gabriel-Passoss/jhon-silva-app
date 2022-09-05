import { useContext } from 'react'
import { Flex, VStack, HStack, Text, Button, Image } from 'native-base'

import { AuthContext } from '../contexts/authContext'

export function FrontDesk() {
  const { handleSignOutUser } = useContext(AuthContext)

  return (
    <Flex bg="#6E1821" h="100%">
      <HStack h="15%" justifyContent="center" alignItems="center" space={5}  mt="25px">
        <Button bg="gray.800" h="40px" w="80px" onPress={handleSignOutUser}>
          Sair
        </Button>
        <Image source={require('../../assets/logo-img.jpg')} alt="jhon silva logo"/>
      </HStack>
      <Flex bg="#242424" h="10%" align="center" justify="center">
        <Text fontSize="2xl" color="coolGray.100">Lista de pedidos</Text>
      </Flex>
    </Flex>
  )
}