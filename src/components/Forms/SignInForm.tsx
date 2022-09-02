import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/authContext'

import { FormControl, Input, InputGroup, Button, Box, Text, Icon } from 'native-base'

import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useContext(AuthContext)

  return (
    <>
      <FormControl isRequired>
        <FormControl.Label>Nome</FormControl.Label>
        <Input InputLeftElement={<Icon as={<Feather name="user" />} size={6} ml="2" />} type="name" placeholder="Jhon Doe" />
        <FormControl.HelperText>
          Precisa ter pelo menos 6 caracteres
        </FormControl.HelperText>
        <FormControl.ErrorMessage>
          Precisa ter pelo menos 6 caracteres
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired>
        <FormControl.Label>Email</FormControl.Label>
        <Input InputLeftElement={<Icon as={<MaterialCommunityIcons name="email-open-outline" />} size={6} ml="2" />} type="email" placeholder="jhondoe@email.com" />
        <FormControl.HelperText>
          Precisa ter pelo menos 6 caracteres
        </FormControl.HelperText>
        <FormControl.ErrorMessage>
          Precisa ter pelo menos 6 caracteres
        </FormControl.ErrorMessage>
      </FormControl>

      <FormControl isRequired>
        <FormControl.Label>Senha</FormControl.Label>
        <Input InputLeftElement={<Icon as={<Ionicons name="key-outline" />} size={6} ml="2" />} type="password" placeholder="Senha" />
        <FormControl.HelperText>
          Precisa ter pelo menos 6 caracteres
        </FormControl.HelperText>
        <FormControl.ErrorMessage>
          Precisa ter pelo menos 6 caracteres
        </FormControl.ErrorMessage>
      </FormControl>

      <Button mt="5">Entrar</Button>
    </>
  )
}