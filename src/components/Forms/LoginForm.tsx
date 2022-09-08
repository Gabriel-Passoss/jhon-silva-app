import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useForm, Controller } from 'react-hook-form'
import { FormControl, Input, Button, Icon, VStack, Text, Alert, Flex, HStack } from 'native-base'

import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';

type FormData = {
  email: string,
  password: string,
}


export function LoginForm({ navigation }) {
  const { handleLogIn, error, isLoading, setIsLoading } = useContext(AuthContext)
  const { control, handleSubmit } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    const { email, password } = data
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
            rules={{
              required: true,
              minLength: 15,
            }}
            render={({ field: { value, onBlur, onChange } }) => (
              <Input InputLeftElement={<Icon as={<MaterialCommunityIcons name="email-open-outline" />} size={6} ml="2" />} autoCapitalize='none' autoCorrect={false} fontSize="md" value={value} onChangeText={onChange} onBlur={onBlur} type="email" name="email"  placeholder="jhondoe@email.com" />
            )}
          />
        </FormControl>

        <FormControl isRequired>
          <FormControl.Label>Senha</FormControl.Label>
          <Controller
            control={control}
            name="password"
            rules={{
              required: true,
              minLength: 5,
            }}
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
        <Alert w="100%" status="error" variant="left-accent" mt="20px">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="sm" color="coolGray.800">
                {error}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Alert>
        : null}
      </Flex>
    </>
  )
}