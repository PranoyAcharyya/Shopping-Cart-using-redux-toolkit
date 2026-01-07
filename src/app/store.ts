import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import wishlsitReducer from "../features/wishlist/wishlistSlice"
import type { WishlistState } from "../features/wishlist/wishlistTypes";

const savedCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!):[];
// const wishlists = localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")!):[];

const savedWishlist: WishlistState['wishlistitems'] = (() => {
  const raw = localStorage.getItem("wishlist");
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to parse wishlist from localStorage:", error);
    return [];
  }
})();


export const store = configureStore({
    reducer:{
        products:productReducer,
        cart:cartReducer,
        wishlist: wishlsitReducer
    },
    preloadedState:{
        cart:{items:savedCart},
        wishlist: { wishlistitems: savedWishlist },
    }
})

store.subscribe(()=>{
    const state = store.getState();
    localStorage.setItem("cart",JSON.stringify(state.cart.items));
    localStorage.setItem("wishlist", JSON.stringify(state.wishlist.wishlistitems));
})


export type RootState = ReturnType<typeof store.getState>; //delcare the types for useAppDispatch
export type AppDispatch = typeof store.dispatch; //declare the types for useAppSelector