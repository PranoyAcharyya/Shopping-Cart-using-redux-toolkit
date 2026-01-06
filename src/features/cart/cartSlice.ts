import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartState } from "./cartTypes";
import type { Product } from "../products/productTypes";

const initialState: CartState = {
    items:[],
}


const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart(state,action:PayloadAction<Product>){
            
            const existingItem = state.items.find(
                (item) => item.product.id === action.payload.id
            );

            if(existingItem){
                existingItem.quantity += 1
            }else{
                state.items.push({
                    product:action.payload,
                    quantity:1,
                })
            }
            
        },
        removeCart(state,action:PayloadAction<Product>){
            state.items = state.items.filter((item)=> item.product.id !== action.payload.id)
        },
        increaseQuantity(state,action:PayloadAction<Product>){
             const existingItem = state.items.find(
                (item) => item.product.id === action.payload.id
            );
             if(existingItem){
                
                    existingItem.quantity += 1
                
            }
        },
        decreaseQuantity(state,action:PayloadAction<Product>){
             const existingItem = state.items.find(
                (item) => item.product.id === action.payload.id
            );
             if(existingItem){
                
                if(existingItem.quantity > 1)  { existingItem.quantity -= 1}
                
            }
        }

    }
})


export const {decreaseQuantity} = cartSlice.actions;
export const {increaseQuantity} = cartSlice.actions;
export const {addToCart} = cartSlice.actions;
export const {removeCart} = cartSlice.actions;
export default cartSlice.reducer;