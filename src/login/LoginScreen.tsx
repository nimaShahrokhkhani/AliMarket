import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useLayoutEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/colors/Colors";
import { CustomTextInput } from "../components/CustomTextInput";
import auth from '@react-native-firebase/auth';

export const LoginScreen = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'Login'>) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [navigation])

    const onGoToSignupPress = () => {
        navigation.navigate('Register');
    }

    const login = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.navigate('Home');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert('That email address is invalid!');
                }

                Alert.alert(error.message);
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.loginText}>Login</Text>
                <Text style={styles.signinText}>Please sign in to continue.</Text>
                <CustomTextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    icon={require('../../assets/images/mail.png')}
                    style={styles.input} />
                <CustomTextInput
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    icon={require('../../assets/images/password.png')}
                    style={styles.input} />
                <TouchableOpacity style={styles.loginBtnContainer} onPress={login}>
                    <Text style={styles.loginBtn}>LOGIN</Text>
                </TouchableOpacity>
                <View style={styles.signupContainer}>
                    <Text>Dont have an account?</Text>
                    <TouchableOpacity onPress={onGoToSignupPress}>
                        <Text style={styles.signupBtn}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1
    },
    main: {
        marginTop: 50,
    },
    loginText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    signinText: {
        color: Colors.darkGray,
        marginTop: 10,
        fontSize: 16
    },
    input: {
        marginTop: 20
    },
    loginBtnContainer: {
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.balck,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        marginTop: 40
    },
    loginBtn: {
        color: Colors.white
    },
    signupContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    signupBtn: {
        marginStart: 5,
        color: Colors.red
    }
})