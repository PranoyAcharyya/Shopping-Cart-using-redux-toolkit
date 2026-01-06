import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";

const savedCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!):[];

export const store = configureStore({
    reducer:{
        products:productReducer,
        cart:cartReducer
    },
    preloadedState:{
        cart:{items:savedCart},
    }
})

store.subscribe(()=>{
    const state = store.getState();
    localStorage.setItem("cart",JSON.stringify(state.cart.items));
})


export type RootState = ReturnType<typeof store.getState>; //delcare the types for useAppDispatch
export type AppDispatch = typeof store.dispatch; //declare the types for useAppSelector