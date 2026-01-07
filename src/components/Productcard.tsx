// src/components/ProductCard.tsx
import React from "react";
import type { Product } from "../features/products/productTypes";
import { Card, CardContent, CardMedia, Typography, Button, IconButton } from "@mui/material";
import { useAppDispatch} from "../app/hook";
import { addToCart } from "../features/cart/cartSlice";
import { toast } from "sonner";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addtoWishlist } from "../features/wishlist/wishlistSlice";

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
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" , position:"relative"}}>
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
      <IconButton size="large" color="inherit" sx={{position:"absolute",left:"10px",top:"10px"}} onClick={()=>dispatch(addtoWishlist(product),toast('added to wishlist'))}>
          <FavoriteBorderIcon/>
      </IconButton>
    </Card>
  );
};

export default ProductCard;
