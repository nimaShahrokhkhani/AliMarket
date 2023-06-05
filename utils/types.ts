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
    imageUrl: string
}

export interface Brand {
    name: string,
    icon: string
}

export interface User {
    userId?: string,
    email: string,
    cart?: Product[],
    favourites?: Product[]
}