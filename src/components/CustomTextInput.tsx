import { FC } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../../assets/colors/Colors";

interface PropType {
    placeholder: string,
    style?: Object,
    icon: any,
    onChangeText?: (text: string) => void,
    value?: string,
    secureTextEntry?: boolean 
}

export const CustomTextInput: FC<PropType> = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            <Image source={props.icon} style={styles.image} />
            <TextInput
                secureTextEntry={props.secureTextEntry}
                placeholder={props.placeholder}
                style={styles.input}
                onChangeText={props.onChangeText}
                value={props.value} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        height: 40,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    image: {
        width: 20,
        height: 20,
        marginHorizontal: 10
    },
    input: {
        flex: 1
    }
})