import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product, ProductCart, User } from "../../utils/types";
import { updateUser } from "../../utils/firestoreDB";

const initialState: User = {
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<User>) => {
            state = { ...action.payload };
            return state;
        },
        addToCart: (state, action: PayloadAction<ProductCart>) => {
            const cartList = state.cart ? state.cart : [];
            cartList.push(action.payload);
            state.cart = cartList;
            updateUser(state);
            return state;
        },
        updateCart: (state, action: PayloadAction<ProductCart>) => {
            const cartList = state.cart ? state.cart : [];
            const newCartList = cartList.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload
                }
                return item;
            })
            state.cart = newCartList;
            updateUser(state);
            return state;
        },
        deleteItemCart: (state, action: PayloadAction<ProductCart>) => {
            const cartList = state.cart ? state.cart : [];
            const newCartList = cartList.filter(item => item.id !== action.payload.id);
            state.cart = newCartList;
            updateUser(state);
            return state;
        },
        updateFavourites: (state, action: PayloadAction<Product[]>) => {
            state.favourites = [...action.payload];
            updateUser(state);
            return state;
        }
    }

})

export const { loginUser, addToCart, updateCart, deleteItemCart, updateFavourites } = userSlice.actions;
export default userSlice.reducer;