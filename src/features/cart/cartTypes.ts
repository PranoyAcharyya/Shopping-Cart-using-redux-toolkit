import type {Product} from "../products/productTypes";

export interface CartItem{
    product: Product;
    quantity: number;
}

export interface CartState{
    items: CartItem[];
    
}