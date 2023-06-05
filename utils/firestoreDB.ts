import firestore from '@react-native-firebase/firestore';
import { Product, User } from './types';

export const getProducts = (startAfterDate: number, limit: number) => {
    return (
        firestore()
            .collection('Products')
            .orderBy('dateTime', 'desc')
            // .startAt(startAfterDate)
            .limit(limit)
            .get()
    );
}

export const addProduct = (product: Product) => {
    return (
        firestore()
            .collection('Products')
            .add(product)
    );
}

export const updateProduct = (product: Product) => {
    return (
        firestore()
            .collection('Products')
            .doc(product.id)
            .update(product)
    );
}

export const getUser = (email: string) => {
    return (
        firestore()
            .collection('Users')
            .where('email', '==', email)
            .get()
    );
}

export const addUser = (user: User) => {
    return (
        firestore()
            .collection('Users')
            .add(user)
    );
}

export const updateUser = (user: User) => {
    return (
        firestore()
            .collection('Users')
            .doc(user.userId)
            .update(user)
    );
}