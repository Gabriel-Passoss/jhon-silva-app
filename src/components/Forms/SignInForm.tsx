import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { useForm, Controller } from 'react-hook-form'
import { FormControl, Input, Select, Button, Icon, VStack } from 'native-base'

import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

type FormData = {
  name: string,
  email: string,
  password: string,
}


export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [service, setService] = useState("barber")
  const { signIn } = useContext(AuthContext)
  const { control, handleSubmit } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    const { name, email, password } = data
    setIsLoading(true)
    await signIn({ name, email, password, service })
  }

  return (
    <VStack space={3}>
      <FormControl isRequired>
        <FormControl.Label>Nome</FormControl.Label>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange }}) => (
            <Input InputLeftElement={<Icon as={<Feather name="user" />} size={6} ml="2" />} fontSize="md" value={value} onChangeText={onChange} type="name" name="name" placeholder="Jhon Doe" />
          )}
        />
      </FormControl>

      <FormControl isRequired>
        <FormControl.Label>Email</FormControl.Label>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange }}) => (
            <Input InputLeftElement={<Icon as={<MaterialCommunityIcons name="email-open-outline" />} size={6} ml="2" />} fontSize="md" value={value} onChangeText={onChange} type="email" name="email" placeholder="jhondoe@email.com" />
          )}
        />
      </FormControl>

      <FormControl isRequired>
        <FormControl.Label>Senha</FormControl.Label>
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange }}) => (
            <Input InputLeftElement={<Icon as={<Ionicons name="key-outline" />} size={6} ml="2" />} fontSize="md" value={value} onChangeText={onChange} type="password" name="password" placeholder="Senha" />
          )}
        />
      </FormControl>

      <Select mt="5px" selectedValue={service} accessibilityLabel="Selecione o tipo da conta" placeholder="Selecione o tipo" onValueChange={selected => setService(selected)} _selectedItem={{
        bg: "teal.600",
        endIcon: <Icon as={<AntDesign name="down" />} />
      }}>
        <Select.Item label="Barbeiro" value="barber"/>
        <Select.Item label="Recepção" value="front-desk"/>
      </Select>

      <Button mt="10px" fontSize="md" backgroundColor="#6E1821" isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
        Criar conta
      </Button>
    </VStack>
  )
}