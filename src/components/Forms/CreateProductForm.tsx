import { useState, useContext } from "react";
import { useForm, Controller } from 'react-hook-form'
import { Button, Flex, FormControl, Icon, Input, Modal } from "native-base";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';

import { ProductsContext } from '../../contexts/ProductsContext'

type FormData = {
  name: string,
  price: string,
  picture: string,
}


export function CreateProductForm() {
  const { isLoading, setIsLoading, modalVisible, setModalVisible, handleCreateProduct } = useContext(ProductsContext)
  const { control, handleSubmit } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    const { name, price, picture } = data
    await handleCreateProduct({name, price, picture})
    setModalVisible(false)
  }

  return (
    <>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Criar novo produto</Modal.Header>
          <Modal.Body>
            <FormControl isRequired>
              <FormControl.Label>Nome</FormControl.Label>
              <Controller
                control={control}
                name="name"
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange } }) => (
                  <Input InputLeftElement={<Icon as={<AntDesign name="tagso" />} size={6} ml="2" />} fontSize="md" value={value} onChangeText={onChange} type="name" name="name" placeholder="Água com gás" />
                )}
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Preço</FormControl.Label>
              <Controller
                control={control}
                name="price"
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange } }) => (
                  <Input InputLeftElement={<Icon as={<MaterialIcons name="attach-money" />} size={6} ml="2" />} fontSize="md" value={value} onChangeText={onChange} name="price" />
                )}
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label>Foto</FormControl.Label>
              <Controller
                control={control}
                name="picture"
                rules={{
                  required: true,
                  minLength: 5,
                }}
                render={({ field: { value, onChange } }) => (
                  <Input InputLeftElement={<Icon as={<AntDesign name="picture" />} size={6} ml="2" />} fontSize="md" value={value} onChangeText={onChange} name="picture" />
                )}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => { setModalVisible(false) }}>
                Cancelar
              </Button>
              <Button bg="#6E1821" isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
                Criar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Flex position="relative" h="65%" justify="flex-end" align="center">
        <Button position="absolute" bg="#242424" w="40%" borderRadius="5px" onPress={() => { setModalVisible(!modalVisible); }}>
          Novo produto
        </Button>
      </Flex>
    </>
  )
}