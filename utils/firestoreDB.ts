import firestore from '@react-native-firebase/firestore';
import { Category, Product, User } from './types';

export const getProducts = (limit: number, category?: Category) => {
    return (
        firestore()
            .collection('Products')
            .orderBy('dateTime', 'desc')
            .limit(limit)
            // .where('category', '==', category)
            // .get()
    );
}

export const searchProducts = (category?: Category, searchName?: string) => {
    return (
        firestore()
            .collection('Products')
            .where('name', '>=', searchName)
            .where('name', '<=', searchName+ '\uf8ff')
            // .where('category', '==', Category.Men)
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