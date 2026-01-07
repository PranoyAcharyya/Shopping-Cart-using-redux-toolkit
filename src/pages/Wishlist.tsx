import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { removeWishlist } from '../features/wishlist/wishlistSlice';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlistitems);

  useEffect(() => {
    console.log(wishlistItems);
  }, [wishlistItems]);

  if (wishlistItems.length === 0) {
    return (
      <Box sx={{ minHeight: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Your wishlist is empty 🛒
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold">
        My Wishlist
      </Typography>

      {wishlistItems.map((item) => (
        <Card
          key={item.product.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <CardMedia
            component="img"
            image={item.product.image}
            alt={item.product.title}
            sx={{ width: 100, height: 100, objectFit: 'contain', mr: 2 }}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6">{item.product.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              ${item.product.price}
            </Typography>
          </CardContent>
          <Button
            variant="contained"
            color="error"
            onClick={() => dispatch(removeWishlist(item.product))}
          >
            Remove
          </Button>
        </Card>
      ))}
    </Box>
  );
};

export default Wishlist;
