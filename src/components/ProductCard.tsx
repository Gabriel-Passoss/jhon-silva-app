import { useContext, useState } from "react";
import { Flex, Image, Button, Text, Box, Icon, HStack } from "native-base";

import { AuthContext } from "../contexts/AuthContext";
import { ProductsContext } from "../contexts/ProductsContext";
import { AntDesign } from '@expo/vector-icons';

type ProductCardProps = {
  image: string,
  name: string,
  price: string,
}

export function ProductCard({image, name: product, price}: ProductCardProps) {
  const [amount, setAmount] = useState(0)
  const { sendOrder } = useContext(ProductsContext)
  const { user } = useContext(AuthContext)
  const barber = user.username

  function handleSend() {
    sendOrder({product, price, image, amount, barber})
  }


  return (
    <Flex flexDirection="row" mt="20px" bg="#242424" w="90%" h="150px">
      <Flex justify="center">
        <Image source={{uri: `${image}`}} alt="product-image" h="100px" w="100px" ml="20px" />
      </Flex>
      <Flex mt="25px" ml="20px" w="40%">
        <Text fontSize="lg" color="light.200">{product}</Text>
        <Text fontSize="sm" color="light.200" mt="5px">R${price}</Text>
        <Flex flexDirection="row" align="center">
          <HStack space={2}>
            <Button mt="15px" h="25px" w="25px" bg="light.200" onPress={() => setAmount(amount - 1)}>
              <Icon as={<AntDesign name="down" />} />
            </Button>
            <Text mt="15px" fontSize="md" color="light.200">{amount}</Text>
            <Button mt="15px" h="25px" w="25px" bg="light.200" onPress={() => setAmount(amount + 1)}>
              <Icon as={<AntDesign name="plus" />} />
            </Button>
          </HStack>
        </Flex>
      </Flex>
      <Flex justify="flex-end" mb="10px">
        <Button size="sm" bg="#6E1821" onPress={handleSend}>
          Enviar
        </Button>
      </Flex>
    </Flex>
  )
}