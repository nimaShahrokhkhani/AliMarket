import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux-toolkit/store";
import { CartItem } from "./CartItem";
import { Colors } from "../../assets/colors/Colors";
import { useMemo } from "react";

export const CartScreen = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'Cart'>) => {
    const user = useSelector((state: RootState) => state.user);
    const total = useMemo(() => {
        let total = 0;
        user.cart?.map(item => {
            total += (item.price * item.count)
        })
        return total;
    }, [user.cart])
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={user.cart}
                renderItem={({ item }) => <CartItem product={item} />}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list} />
            <View style={styles.bottomContainer}>
                <View style={styles.totalContainer}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.title}>Sub Total</Text>
                        <Text style={styles.value}>${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.title}>Shipping</Text>
                        <Text style={styles.value2}>$50.00</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.title2}>Total</Text>
                        <Text style={styles.value3}>${(total + 50).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.checkoutBtnContainer}>
                    <Text style={styles.checkoutBtn}>CHECKOUT</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1
    },
    bottomContainer: {
        flex: 0,
        marginHorizontal: 10
    },
    checkoutBtnContainer: {
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.balck,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkoutBtn: {
        color: Colors.white
    },
    totalContainer: {
        backgroundColor: 'black',
        borderRadius: 40,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    itemContainer: {
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        fontSize: 18,
        color: Colors.darkGray
    },
    title2: {
        flex: 1,
        fontSize: 18,
        color: Colors.lemon
    },
    value: {
        flex: 0,
        fontSize: 20,
        color: Colors.white,
    },
    value2: {
        flex: 0,
        fontSize: 20,
        color: Colors.darkGray,
    },
    value3: {
        flex: 0,
        fontSize: 20,
        color: Colors.lemon,
    }
})