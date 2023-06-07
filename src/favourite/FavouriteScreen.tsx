import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootBottomTabParamList } from "../homeApp/HomeApp";
import { FlatList, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux-toolkit/store";
import { CustomCardItem } from "../components/CustomCardItem";
import { Product } from "../../utils/types";
import { updateFavourites } from "../redux-toolkit/userSlice";

export const FavouriteScreen = ({ navigation, route }: NativeStackScreenProps<RootBottomTabParamList, 'Favourites'>) => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const onItemPress = (product: Product) => {
        navigation.navigate('Product', { product })
    }
    const onFavPress = (product: Product) => {
        let favourites: Product[] = user.favourites || [];
        favourites = favourites.filter(item => product.id !== item.id);
        dispatch(updateFavourites(favourites));
    }

    return (
        <SafeAreaView>
            <FlatList
                data={user.favourites}
                renderItem={({ item }) => <CustomCardItem data={item} onItemPress={onItemPress} onFavPress={onFavPress} />}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()} />
        </SafeAreaView>
    )
}