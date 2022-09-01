import { Box, Button, Center, FormControl, Heading, HStack, Input, Link, VStack, Text, Image, Flex } from "native-base";

export function Login() {
  return (
    <>
      <Flex alignItems="center" justifyContent="center" h="100%">
        <Image source={require('../assets/logo-img.jpg')} borderRadius="xl" />
        <Flex alignItems="center" width="100%">
          <Box p="2" my="8" w="90%" maxW="290">
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
              <FormControl>
                <FormControl.Label>Nome</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl>
                <FormControl.Label>Senha</FormControl.Label>
                <Input type="password" />
              </FormControl>
              <Button mt="2" colorScheme="indigo">
                Entrar
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}
