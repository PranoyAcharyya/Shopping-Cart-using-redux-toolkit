// src/components/ProductCard.tsx
import React from "react";
import type { Product } from "../features/products/productTypes";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useAppDispatch} from "../app/hook";
import { addToCart } from "../features/cart/cartSlice";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const dispatch =useAppDispatch()
//  const cartItems = useAppSelector((state) => state.cart.items);
  
//  useEffect(()=>{
//   console.log(cartItems);
//  },[cartItems])
  

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{ height: 200, objectFit: "contain", mt: 2 }}
      />
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="h6">${product.price}</Typography>
      </CardContent>
      <Button variant="contained" color="primary" sx={{ m: 2 , backgroundColor:"#000"}} onClick={()=>dispatch(addToCart(product),toast(`${product.title} has been added to card`))}>
        Add to Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
