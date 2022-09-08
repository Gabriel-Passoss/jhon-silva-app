import { useContext } from 'react'
import {Flex, HStack, Text, Button, Image, ScrollView } from 'native-base'

import { ProductsContext } from "../contexts/ProductsContext";
import { AuthContext } from '../contexts/AuthContext'
import { ProductCard } from '../components/ProductCard'

export function Barber() {
  const { handleSignOutUser } = useContext(AuthContext)
  const { products } = useContext(ProductsContext)

  return (
    <Flex bg="#6E1821" h="100%">
      <HStack h="15%" justifyContent="center" alignItems="center" space={5} mt="25px">
        <Button bg="gray.800" h="40px" w="80px" onPress={handleSignOutUser}>
          Sair
        </Button>
        <Image source={require('../../assets/logo-img.png')} h="150px" w="150px" alt="jhon silva logo" />
        <Image borderRadius="full" size="sm" bg="red.800" source={{ uri: "https://cdn.discordapp.com/attachments/668834854376439844/1015475036909486090/vini.jpg" }} alt="profile photo" />
      </HStack>
      <Flex bg="#242424" h="10%" align="center" justify="center">
        <Text fontSize="2xl" color="coolGray.100">Faça seu pedido</Text>
      </Flex>

      <ScrollView>
        <Flex align="center">
          {products.map((product: any) => {
            return (
              <ProductCard image={product.imageURL} name={product.name} price={product.price} key={product.id} />
            )
          })
          }
        </Flex>
      </ScrollView>
    </Flex>
  )
}