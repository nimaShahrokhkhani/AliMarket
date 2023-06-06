export enum Category {
    Men,
    Women,
    Kids
}

export interface Product {
    id?: string,
    name: string,
    dateTime: number,
    category: Category,
    isMyFavourit: boolean,
    price: number,
    star: number,
    brand: Brand,
    description: string,
    type: string,
    imageUrl: string,
    count: number,
    size: Size[]
}
export interface ProductCart {
    id?: string,
    name: string,
    dateTime: number,
    category: Category,
    isMyFavourit: boolean,
    price: number,
    star: number,
    brand: Brand,
    description: string,
    type: string,
    imageUrl: string,
    count: number,
    size: Size
}

export enum Size {
    XXL='xxl',
    XL='xl',
    LARGE='large',
    MEDIUM='medium',
    SMALL='small',
    XS='xs'
}

export interface Brand {
    name: string,
    icon: string
}

export interface User {
    userId?: string,
    email?: string,
    cart?: ProductCart[],
    favourites?: Product[]
}