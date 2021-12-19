import { Avatar, Box, Container, Flex, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Product from "./components/Product";
import products from "./products";
import { balanceSelector, cartSelector } from "./redux/walletSlice";

function App() {

  const balance = useSelector(balanceSelector);
  const cart = useSelector(cartSelector);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container maxW='container.lg' p={0} mt={10}>
      <Flex
        h={250}
        bg="white"
        justifyContent="space-around"
        alignItems="center"
        direction="column"
        boxShadow="base"
        pt={5}

      >
        <Avatar size="2xl" src="https://neal.fun/spend/billgates.jpg" />
        <Heading>
          Spend Bill Gates' Money
        </Heading>
      </Flex>
      <Flex
        mt='3'
        h='20'
        justifyContent='center'
        alignItems='center'
        bgGradient='linear(to-b, green.200, green.600)'
        boxShadow="base" >
        <Heading color='white'>
          ${balance}
        </Heading>
      </Flex>

      <Flex wrap={"wrap"} justifyContent={"space-between"} alignItems={"center"}>
        {products.map(product => <Product key={product.id} item={product} />)}
      </Flex>

      <Flex
        direction={"column"}
        justifyContent={"space-around"}
        alignItems={"center"}
        bg={"white"}
        my={3}
        boxShadow="base"
      >
        <Heading
          size="lg"
          my={5}
        >
          Your Receipt
        </Heading>
        {
          cart.map(item => (
            <Flex mb={3} w={80}>

              <Box w={"50%"}>{item.name}</Box>
              <Box textAlign={"end"} w={"25%"}>X{item.quantity}</Box>
              <Heading size="md" textAlign={"end"} w={"25%"} fontWeight={"bold"} color={"green.500"}>${item.quantity * item.price}</Heading>

            </Flex>
          ))
        }
        <Flex justifyContent={"space-between"} py={3} w={80} borderTop='1px' borderColor='black'>
          <Heading size="md" fontWeight={"bold"}>
            Total:
          </Heading>
          <Heading color={"green.500"} size="md">
            ${total}
          </Heading>
        </Flex>
      </Flex>
    </Container>
  );
}

export default App;
