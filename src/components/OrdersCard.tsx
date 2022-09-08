import { Flex, Image, Text, } from "native-base";
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale";

type ProductOrderProps = {
  image: string,
  product: string,
  price: string,
  amount: number,
  barber: string,
  date: string
}

export function OrdersCard({ image, product, price, amount, barber, date }: ProductOrderProps) {
  const newDate = Number(date)
  const dateToNumber = new Date(newDate * 1000)

  const OrderDateRelativeNow = formatDistanceToNow(dateToNumber, {
    locale: ptBR,
    addSuffix: true
  })

  return (
    <Flex rounded="10" align="center" flexDirection="row" mt="20px" bg="#242424" w="90%" h="160px">
      <Flex justify="center">
        <Image source={{ uri: `${image}` }} alt="product-image" h="100px" w="100px" ml="20px" />
      </Flex>
      <Flex mt="1px" ml="20px" w="50%">
        <Text fontSize="lg" color="light.200">{product}</Text>
        <Text fontSize="sm" color="light.200" mt="5px">R${price}</Text>
        <Text fontSize="sm" color="light.200" mt="5px">Quantidade: {amount}</Text>
        <Text fontSize="sm" color="light.200" mt="5px">Pedido por: {barber}</Text>
        <Text fontSize="xs" color="light.200" mt="5px">{OrderDateRelativeNow.toString()}</Text>
      </Flex>
      <Flex justify="flex-end" mb="10px">
      </Flex>
    </Flex> 
  )
}