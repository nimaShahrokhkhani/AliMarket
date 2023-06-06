import { View, Image, StyleSheet, Text } from "react-native"
import { Colors } from "../../assets/colors/Colors"

interface PropType {
    itemsCount: number,
    style?: Object
}

export const CustomCart = (props: PropType) => {
    return(
        <View style={[props.style]}>
            <Image source={require('../../assets/images/cart.png')} style={styles.cart}/>
            <View style={styles.countContainer}>
                <Text style={styles.count}>{props.itemsCount}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cart: {
        width: 25,
        height: 25
    },
    countContainer: {
        position: 'absolute',
        zIndex: 100,
        left: -5,
        top: 15,
        width: 15,
        height: 15,
        borderRadius: 5,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    count: {

    }
})