import { Box, Flex, VStack, HStack, Text, Avatar, Button, Image } from 'native-base'

export function Home() {
  return (
    <Flex bg="#6E1821" h="100%">
      <HStack h="15%" justifyContent="center" alignItems="center" space={5}  mt="25px">
        <Button bg="gray.800" h="40px" w="80px">
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