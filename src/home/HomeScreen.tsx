import { FC, useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";
import { addProduct, getProducts, updateProduct } from "../../utils/firestoreDB";
import { Category, Product, Size } from "../../utils/types";
import { CustomCardItem } from "../components/CustomCardItem";
import { CustomTextInput } from "../components/CustomTextInput";
import { CustomCart } from "../components/CustomCart";
import { useSelector } from "react-redux";
import { RootState } from "../redux-toolkit/store";

export const HomeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
    const user = useSelector((state: RootState) => state.user);
    console.log('homeeeeeeee=>', user)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [navigation])
    // for (let i = 0; i < 20; i++) {
    //     console.log(i)
    //     addProduct({
    //         // id: `product-${Math.random()}-${i}`,
    //         name: `product ${i}`,
    //         dateTime: Date.now(),
    //         category: Category.Men,
    //         isMyFavourit: false,
    //         price: 1000 + i,
    //         star: 3,
    //         brand: {
    //             name: 'Nike',
    //             icon: 'https://cdn-icons-png.flaticon.com/512/732/732229.png'
    //         },
    //         description: `This is a test product from Nike ${i}`,
    //         type: 'Jacket',
    //         imageUrl: 'https://picsum.photos/200/300',
    //         size: [Size.XL, Size.LARGE, Size.MEDIUM, Size.SMALL],
    //         count: 20
    //     }).then(res => {
    //         console.log(res)
    //     }).catch(err => console.log(err))
    // }
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        getProducts(1, 10).then(querySnapshot => {
            let productList: Product[] = [];
            querySnapshot.forEach(documentSnapshot => {
                const product = { id: documentSnapshot.id, ...documentSnapshot.data() }
                productList.push(product as Product)
            });
            setProducts(productList);
        })
    }, [])

    const onFavPress = (id: string, isFavourit: boolean) => {
        const productList: Product[] = products.map((product) => {
            if (product.id === id) {
                product.isMyFavourit = isFavourit;
            }
            updateProduct(product);
            return product;
        })
        setProducts(productList);
    }

    const onItemPress = (product: Product) => {
        navigation.navigate('Product', { product })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                <TouchableOpacity style={styles.cart} onPress={() => navigation.navigate('Cart')}>
                    <CustomCart itemsCount={user.cart?.length || 0} />
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <CustomTextInput placeholder="" style={styles.searchInput} icon={require('../../assets/images/search.png')} />
                <TouchableOpacity style={styles.filterContainer} onPress={() => navigation.navigate('Category')}>
                    <Image source={require('../../assets/images/filter.png')} style={styles.filter} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={products}
                renderItem={({ item }) => <CustomCardItem data={item} onFavPress={onFavPress} onItemPress={onItemPress} />}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5
    },
    headerContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    logo: {
        width: 150,
        height: 30
    },
    cart: {
        flex: 1,
        alignItems: 'flex-end',
        marginEnd: 10
    },
    searchInput: {
        flex: 1
    },
    filterContainer: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 10
    },
    filter: {
        width: 35,
        height: 35
    },
    searchContainer: {
        margin: 10,
        flexDirection: 'row'
    }
})