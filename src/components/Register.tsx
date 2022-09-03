import { Box, Heading, VStack, Image, Flex } from "native-base";
import { SignInForm } from "./Forms/SignInForm";

export function Register() {

  return (
    <>
      <Flex alignItems="center" justifyContent="center" h="100%">
        <Image source={require('../..//assets/logo-img.jpg')} alt="Jhon-Silva logo" borderRadius="xl" />
        <Flex alignItems="center" width="100%">
          <Box my="8" w="90%" maxW="290">
            <Heading textAlign="center" size="lg" fontWeight="600" color="coolGray.800" _dark={{color: "warmGray.50"}}>
              Bem-vindo barbeiro!💈
            </Heading>
            
            <Heading textAlign="center" mt="1" _dark={{color: "warmGray.200"}} color="coolGray.600" fontWeight="medium" size="xs">
              Crie sua conta
            </Heading>

            <VStack space={3} mt="5">
              <SignInForm />
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}
