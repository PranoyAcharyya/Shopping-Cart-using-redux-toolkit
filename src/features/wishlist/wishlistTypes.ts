import type { Product } from "../products/productTypes";

export interface WishlistItem{
    product:Product;
}

export interface WishlistState {
    wishlistitems: WishlistItem[];
}

