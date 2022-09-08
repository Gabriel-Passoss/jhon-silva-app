import { useContext } from 'react'
import { Flex, HStack, Text, Button, Image, ScrollView, Icon} from 'native-base'

import { OrdersCard } from '../components/OrdersCard'
import { AuthContext } from '../contexts/AuthContext'
import { ProductsContext } from '../contexts/ProductsContext'
import { CreateProductForm } from '../components/Forms/CreateProductForm'

import { AntDesign } from '@expo/vector-icons';

export function FrontDesk() {
  const { modalVisible, setModalVisible } = useContext(ProductsContext)
  const { handleSignOutUser } = useContext(AuthContext)
  const { orders } = useContext(ProductsContext)
  console.log(orders)

  return (
    <Flex bg="#6E1821" h="100%">
      <HStack h="15%" justifyContent="center" alignItems="center" space={5}  mt="25px">
        <Button bg="gray.800" h="40px" w="80px" onPress={handleSignOutUser}>
          Sair
        </Button>
        <Image source={require('../../assets/logo-img.png')} h="150px" w="150px" alt="jhon silva logo"/>
        <Button bg="#242424" size="lg" borderRadius="5px" onPress={() => { setModalVisible(!modalVisible); }}>
          <Icon as={<AntDesign name="plus"/>} size={4} color="white"/>
        </Button>
      </HStack>
      <Flex bg="#242424" h="10%" align="center" justify="center">
        <Text fontSize="2xl" color="coolGray.100">Lista de pedidos</Text>
      </Flex>

      <ScrollView>
        <Flex align="center">
          {orders.map((orders: any, index: number) => {
            return (
              <OrdersCard image={orders.image} product={orders.product} price={orders.price} amount={orders.amount} barber={orders.barber} date={orders.date.seconds} key={index} />
            )
          })
          }
        </Flex>
      </ScrollView>

      <CreateProductForm />
    </Flex>
  )
}