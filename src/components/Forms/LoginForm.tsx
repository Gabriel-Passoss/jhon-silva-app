import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { useForm, Controller } from 'react-hook-form'
import { FormControl, Input, Button, Icon, VStack, Text, Alert, Box, Flex } from 'native-base'

import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';

type FormData = {
  email: string,
  password: string,
}


export function LoginForm({ navigation }) {
  const [isLoading, setIsLoading] = useState(false)
  const { handleLogIn, error } = useContext(AuthContext)
  const { control, handleSubmit } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    const { email, password } = data
    setIsLoading(true)
    await handleLogIn({ email, password })
  }

  return (
    <>
      <VStack space={3}>

        <FormControl isRequired>
          <FormControl.Label>Email</FormControl.Label>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input InputLeftElement={<Icon as={<MaterialCommunityIcons name="email-open-outline" />} size={6} ml="2" />} fontSize="md" value={value} onChangeText={onChange} type="email" name="email" placeholder="jhondoe@email.com" />
            )}
          />
        </FormControl>

        <FormControl isRequired>
          <FormControl.Label>Senha</FormControl.Label>
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Input InputLeftElement={<Icon as={<Ionicons name="key-outline" />} size={6} ml="2" />} fontSize="md" value={value} onChangeText={onChange} type="password" name="password" placeholder="Senha" />
            )}
          />
        </FormControl>

        <VStack alignItems="center" justifyContent="center" space={2}>
          <Button w="100%" mt="10px" fontSize="md" backgroundColor="#6E1821" isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
            Entrar
          </Button>
          <Text>Ou</Text>
          <Button w="100%" fontSize="md" backgroundColor="#6E1821" isLoading={isLoading} onPress={() => navigation.navigate('Register')}>
            Cadastrar-se
          </Button>
        </VStack>
      </VStack>
      <Flex justify="flex-end" w="100%">
      {error ?
        <Alert status="error">
          <Text>{error}</Text>
        </Alert> : null}
      </Flex>
    </>
  )
}