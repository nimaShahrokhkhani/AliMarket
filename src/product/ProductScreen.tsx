import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLayoutEffect, useState } from "react";
import StarRating from "react-native-star-rating-widget";
import { Colors } from "../../assets/colors/Colors";

export const ProductScreen = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'Product'>) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [navigation])
    const product = route.params.product;
    const favImage = product.isMyFavourit ?
        require('../../assets/images/heart-filled.png') :
        require('../../assets/images/heart.png');
    const [rating, setRating] = useState(product.star);

    const onBackPress = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.main}>
            <TouchableOpacity style={styles.backContainer} onPress={onBackPress}>
                <Image source={require('../../assets/images/back.png')} style={styles.backImage} />
            </TouchableOpacity>
            <ScrollView style={styles.container}>
                <Image source={{ uri: product.imageUrl }} style={styles.image} />
                <SafeAreaView>
                    <View style={styles.topInfoContainer}>
                        <View style={styles.brandContainer}>
                            <Image source={{ uri: product.brand.icon }} style={styles.brandIcon} />
                            <Text style={styles.brandName}>{product.brand.name}</Text>
                        </View>
                        <TouchableOpacity style={styles.favContainer}>
                            <Image source={favImage} style={styles.favourit} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{product.name}</Text>
                        <Text style={styles.price}>$ {product.price}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <StarRating
                            rating={rating}
                            onChange={setRating}
                            starSize={20}
                        />
                        <Text style={styles.rate}>{product.star}</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>
                </SafeAreaView>
            </ScrollView>
            <TouchableOpacity style={styles.addToCartContainer}>
                <Text style={styles.addToCart}>Add to cart</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    container: {
        marginHorizontal: 10
    },
    image: {
        height: 400,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
    },
    topInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    brandContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 5
    },
    brandIcon: {
        width: 40,
        height: 40
    },
    brandName: {
        marginStart: 10,
        fontSize: 20
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    name: {
        flex: 1,
        marginEnd: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
    price: {
        flex: 0,
        fontSize: 16
    },
    favourit: {
        width: 20,
        height: 20,
    },
    favContainer: {
        flex: 0,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    rate: {
        marginStart: 5
    },
    descriptionContainer: {
        marginTop: 20
    },
    description: {
        color: Colors.darkGray
    },
    addToCartContainer: {
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.balck,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        marginHorizontal: 10
    },
    addToCart: {
        color: Colors.white
    },
    backContainer: {
        position: 'absolute',
        width: 40,
        height: 40,
        top: 50,
        left: 20,
        borderRadius: 25,
        backgroundColor: Colors.white,
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backImage: {
        width: 20,
        height: 20
    }
})