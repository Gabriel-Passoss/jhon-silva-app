import { useContext, useState } from "react";
import { Flex, Image, Button, Text, Box, Icon, HStack } from "native-base";

import { ProductsContext } from "../contexts/ProductsContext";
import { AntDesign } from '@expo/vector-icons';

type ProductOrderProps = {
  image: string,
  product: string,
  price: string,
  amount: number,
  barber: string
}

export function OrdersCard({image, product, price, amount, barber}: ProductOrderProps) {

  return (
    <Flex flexDirection="row" mt="20px" bg="#242424" w="90%" h="150px">
      <Flex justify="center">
        <Image source={{uri: `${image}`}} alt="product-image" h="100px" w="100px" ml="20px" />
      </Flex>
      <Flex mt="25px" ml="20px" w="40%">
        <Text fontSize="lg" color="light.200">{product}</Text>
        <Text fontSize="sm" color="light.200" mt="5px">R${price}</Text>
        <Text fontSize="sm" color="light.200" mt="5px">Quantidade: {amount}</Text>
        <Text fontSize="sm" color="light.200" mt="5px">Pedido por: {barber}</Text>
      </Flex>
      <Flex justify="flex-end" mb="10px">
      </Flex>
    </Flex>
  )
}