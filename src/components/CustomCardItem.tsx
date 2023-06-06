import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Product } from "../../utils/types"
import { useSelector } from "react-redux"
import { RootState } from "../redux-toolkit/store"

interface PropType {
    data: Product,
    onFavPress: (product: Product) => void,
    onItemPress: (product: Product) => void
}

export const CustomCardItem = (props: PropType) => {
    const user = useSelector((state: RootState) => state.user);
    const data = props.data;
    const onFavBtnPress = props.onFavPress;
    const onItemPress = props.onItemPress;
    const favImage = user.favourites?.find(item => item.id === data.id) ?
        require('../../assets/images/heart-filled.png') :
        require('../../assets/images/heart.png');
    
    return (
        <TouchableOpacity style={styles.container} onPress={() => onItemPress(data)}>
            <Image source={{ uri: data.imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.price}>${data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                <TouchableOpacity style={styles.favContainer} onPress={() => onFavBtnPress(data)}>
                    <Image source={favImage} style={styles.favourit} />
                </TouchableOpacity>
            </View>
            <Text numberOfLines={1} style={styles.name}>{data.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    infoContainer: {
        flexDirection: 'row',
        padding: 5
    },
    image: {
        height: 300,
        borderRadius: 20
    },
    favourit: {
        width: 20,
        height: 20,
        alignSelf: 'flex-end'
    },
    price: {
        flex: 1
    },
    favContainer: {
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
        paddingHorizontal: 5
    }
})