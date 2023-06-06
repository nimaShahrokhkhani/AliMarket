import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useLayoutEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../App";
import { Colors } from "../../assets/colors/Colors";
import Animated, { SharedValue, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Category } from "../../utils/types";

export const CategoryScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Category'>) => {
    const offsetMenX = useSharedValue(0);
    const scaleMen = useSharedValue(1);
    const offsetWomenX = useSharedValue(0);
    const scaleWomen = useSharedValue(1);
    const offsetKidsX = useSharedValue(0);
    const scaleKids = useSharedValue(1);
    const [category, setCategory] = useState<Category>();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [navigation])

    const navigateToHome = () => {
        navigation.navigate('Home', { category })
    }

    const reset = () => {
        setCategory(undefined);
        navigateToHome();
    }

    const animatedStyle = (offsetX: SharedValue<number>, scale: SharedValue<number>) => useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withSpring(offsetX.value) }, {
                scale: withSpring(scale.value, {}, (finished) => {
                    if (finished && scale.value > 1) {
                        runOnJS(navigateToHome)()
                    }
                })
            }],
            zIndex: scale.value
        }
    })

    const onImagePress = (category: Category) => {
        setCategory(category);
        switch (category) {
            case Category.Men:
                offsetMenX.value = 400;
                scaleMen.value = 7;
                break;
            case Category.Women:
                offsetWomenX.value = 100;
                scaleWomen.value = 5;
                break;
            case Category.Kids:
                offsetKidsX.value = -100;
                scaleKids.value = 10;
                break;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.resetContainer} onPress={reset}>
                <Image source={require('../../assets/images/funnel.png')} style={styles.resetIcon}/>
                <Text style={styles.reset}>Reset Filter...</Text>
            </TouchableOpacity>
            <Animated.View style={[styles.imageContainer, animatedStyle(offsetMenX, scaleMen)]}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => onImagePress(Category.Men)}>
                    <Image source={require('../../assets/images/man.jpg')} style={styles.manImage} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.imageContainer, animatedStyle(offsetWomenX, scaleWomen)]}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => onImagePress(Category.Women)}>
                    <Image source={require('../../assets/images/woman.jpeg')} style={styles.womanImage} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[{ alignSelf: 'flex-end' }, styles.imageContainer, animatedStyle(offsetKidsX, scaleKids)]}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => onImagePress(Category.Kids)}>
                    <Image source={require('../../assets/images/kids.jpeg')} style={styles.kidsImage} />
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.balck,
    },
    imageContainer: {
        flex: 1,
        margin: 10,
    },
    manImage: {
        flex: 1,
        width: 150,
        borderRadius: 20,
    },
    womanImage: {
        flex: 1,
        width: 300,
        borderRadius: 20,
        overflow: 'hidden'
    },
    kidsImage: {
        flex: 1,
        width: 150,
        borderRadius: 20,
    },
    resetContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    reset: {
        fontSize: 18,
        color: Colors.red,
        fontWeight: 'bold'
    },
    resetIcon: {
        width: 20,
        height: 20,
        marginEnd: 5
    }
})