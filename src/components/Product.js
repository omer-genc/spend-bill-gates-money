import { Button, Flex, Image, Input, Spacer, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleCart } from '../redux/walletSlice'

const Product = ({ item }) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(0)
    const [status, setStatus] = useState("hidle")

    useEffect(() => {
        if (status === "hidle")
            return
        dispatch(handleCart({ item, quantity }))
    }, [quantity, item, dispatch, status])

    const handleChange = (e) => {
        setQuantity(Number(e.target.value))
        setStatus("success")
    }

    const handleSell = () => {
        setQuantity(state => state - 1)
        setStatus("success")
    }

    const handleBuyButton = () => {
        setQuantity(state => state + 1)
        setStatus("success")
    }
    return (
        <Flex
            w={['100%', '100%', '46%', '32%']}
            h={300}
            mt={3}
            bgColor={'white'}
            boxShadow="base"
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Image h={120} mx="auto" src={item.image} />
            <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>{item.name}</Text>
            <Text fontSize={"2xl"} fontWeight={"bold"} color={"green.500"} textAlign={"center"}>${item.price}</Text>
            <Flex mt={"6"}>
                <Spacer />
                <Button disabled={quantity === 0} onClick={handleSell} colorScheme={"red"} flex={1}>Sell</Button>
                <Spacer />
                <Input onChange={handleChange} value={quantity ? quantity : ""} type='number' flex={2} min={0} />
                <Spacer />
                <Button onClick={handleBuyButton} flex={1} colorScheme={"green"}>Buy</Button>
                <Spacer />
            </Flex>
        </Flex>
    )
}

export default Product
