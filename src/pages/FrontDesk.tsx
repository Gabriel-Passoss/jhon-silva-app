import { useContext } from 'react'
import { Flex, VStack, HStack, Text, Button, Image, ScrollView} from 'native-base'

import { OrdersCard } from '../components/OrdersCard'
import { AuthContext } from '../contexts/AuthContext'
import { ProductsContext } from '../contexts/ProductsContext'
import { CreateProductForm } from '../components/Forms/CreateProductForm'

export function FrontDesk() {
  const { modalVisible, setModalVisible } = useContext(ProductsContext)
  const { handleSignOutUser } = useContext(AuthContext)
  const { orders } = useContext(ProductsContext)

  return (
    <Flex bg="#6E1821" h="100%">
      <HStack h="15%" justifyContent="center" alignItems="center" space={5}  mt="25px">
        <Button bg="gray.800" h="40px" w="80px" onPress={handleSignOutUser}>
          Sair
        </Button>
        <Image source={require('../../assets/logo-img.jpg')} alt="jhon silva logo"/>
      </HStack>
      <Flex bg="#242424" h="10%" align="center" justify="center">
        <Text fontSize="2xl" color="coolGray.100">Lista de pedidos</Text>
      </Flex>

      <ScrollView>
        <Flex align="center">
          {orders.map((orders: any, index: number) => {
            return (
              <OrdersCard image={orders.image} product={orders.product} price={orders.price} amount={orders.amount} barber={orders.barber} key={index} />
            )
          })
          }
        </Flex>
      </ScrollView>

      <CreateProductForm />
      <Flex position="relative" h="20%" justify="flex-end" align="center" mb="15px">
        <Button position="absolute" bg="#242424" w="40%" borderRadius="5px" onPress={() => { setModalVisible(!modalVisible); }}>
          Novo produto
        </Button>
      </Flex>
    </Flex>
  )
}