/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { HomeScreen } from './src/home/HomeScreen';
import { CategoryScreen } from './src/category/CategoryScreen';
import { ProductScreen } from './src/product/ProductScreen';
import { Category, Product } from './utils/types';
import { LoginScreen } from './src/login/LoginScreen';
import { RegisterScreen } from './src/register/RegisterScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux-toolkit/store';
import { CartScreen } from './src/cart/CartScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: { category?: Category };
  Category: undefined;
  Cart: undefined;
  Product: { product: Product };
};

function App(): JSX.Element {

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Category' component={CategoryScreen} />
          <Stack.Screen name='Cart' component={CartScreen} />
          <Stack.Screen name='Product' component={ProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
