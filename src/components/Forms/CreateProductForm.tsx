import { useState, useContext } from "react";
import { useForm, Controller } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker';
import { Button, FormControl, Icon, Input, Modal } from "native-base";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';

import { ProductsContext } from '../../contexts/ProductsContext'

type FormData = {
  name: string,
  price: string,
}


export function CreateProductForm() {
  const [image, setImage] = useState(null);
  const { isLoading, setIsLoading, modalVisible, setModalVisible, handleCreateProduct } = useContext(ProductsContext)
  const { control, handleSubmit } = useForm<FormData>()

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      //@ts-ignore
      setImage(result.uri)
    }
  }

  function handleCloseModal() {
    setModalVisible(false)
    setImage(null)
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    const { name, price } = data
    await handleCreateProduct({name, price, image})
    setModalVisible(false)
  }

  return (
    <>
      <Modal isOpen={modalVisible} onClose={handleCloseModal}>
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
              <Button onPress={pickImage} bg="#6E1821">{!image ? "Selecione uma imagem" : "Imagem selecionada"}</Button>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={handleCloseModal}>
                Cancelar
              </Button>
              <Button size="md" bg="#6E1821" isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
                Criar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      
    </>
  )
}