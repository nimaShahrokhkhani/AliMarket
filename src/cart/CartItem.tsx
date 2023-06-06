import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Product, ProductCart } from "../../utils/types"
import { Colors } from "../../assets/colors/Colors";
import { useDispatch } from "react-redux";
import { addToCart, updateCart } from "../redux-toolkit/userSlice";

interface PropType {
    product: ProductCart
}

export const CartItem = (props: PropType) => {
    const product = props.product;
    const dispatch = useDispatch();
    const onIncreaseCount = () => {
        const cartProduct: ProductCart = { ...product, count: ++product.count };
        dispatch(updateCart(cartProduct));
    }
    const onDecreaseCount = () => {
        const cartProduct: ProductCart = { ...product, count: --product.count };
        dispatch(updateCart(cartProduct));
    }
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>$ {product.price}</Text>
                <View style={styles.sizeContainer}>
                    <Text style={styles.sizeTitle}>size</Text>
                    <Text style={styles.size}>{product.size}</Text>
                </View>
            </View>
            <View style={styles.countContainer}>
                <View style={styles.counterContainer}>
                    <TouchableOpacity onPress={onIncreaseCount}>
                        <Text style={styles.counter}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.counter}>{product.count}</Text>
                    <TouchableOpacity onPress={onDecreaseCount}>
                        <Text style={styles.counter}>-</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageContainer: {
        flex: 1,
        height: 100,
        margin: 10,
    },
    image: {
        borderRadius: 20,
        height: 100,
    },
    nameContainer: {
        flex: 1,
        justifyContent: 'center',
        margin: 10
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.darkGray
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.balck,
        marginTop: 20
    },
    countContainer: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    counterContainer: {
        borderColor: Colors.darkGray,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        flex: 1
    },
    counter: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5
    },
    size: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.balck,
        marginStart: 5
    },
    sizeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.darkGray,
    },
    sizeContainer: { 
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    }
})