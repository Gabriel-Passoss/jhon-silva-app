import { useContext } from 'react'
import { Box, Flex, VStack, HStack, Text, Button, Image } from 'native-base'

import { AuthContext } from '../contexts/authContext'

export function Barber() {
  const { handleSignOutUser } = useContext(AuthContext)

  return (
    <Flex bg="#6E1821" h="100%">
      <HStack h="15%" justifyContent="center" alignItems="center" space={5}  mt="25px">
        <Button bg="gray.800" h="40px" w="80px" onPress={handleSignOutUser}>
          Sair
        </Button>
        <Image source={require('../../assets/logo-img.jpg')} alt="jhon silva logo"/>
        <Image borderRadius="full" size="sm" bg="red.800" source={{uri: "https://cdn.discordapp.com/attachments/668834854376439844/1015475036909486090/vini.jpg"}} alt="profile photo"/>
      </HStack>
      <Flex bg="#242424" h="10%" align="center" justify="center">
        <Text fontSize="2xl" color="coolGray.100">Faça seu pedido</Text>
      </Flex>
    </Flex>
  )
}