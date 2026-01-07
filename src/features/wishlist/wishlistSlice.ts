import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { WishlistState } from "./wishlistTypes"
import type { Product } from "../products/productTypes"

const initialState : WishlistState = {
    wishlistitems:[],
}

const wishListSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        addtoWishlist(state,action:PayloadAction<Product>){
            state.wishlistitems.push({
                product:action.payload
            })
        },
        removeWishlist(state,action:PayloadAction<Product>){
            state.wishlistitems = state.wishlistitems.filter((item)=>item.product.id !== action.payload.id)
        }
    }
})


export const {addtoWishlist} = wishListSlice.actions;
export const {removeWishlist} = wishListSlice.actions;
export default wishListSlice.reducer;