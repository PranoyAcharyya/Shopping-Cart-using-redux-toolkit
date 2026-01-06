import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  increaseQuantity,
  removeCart,
  decreaseQuantity,
} from "../features/cart/cartSlice";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import { toast } from "sonner";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <Box sx={{ minHeight: "100vh", p: { xs: 2, md: 4 }, bgcolor: "#f5f5f5" }}>
      <Box maxWidth="1200px" mx="auto">
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Shopping Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Typography
            variant="h6"
            color="text.secondary"
            textAlign="center"
            mt={10}
          >
            Your cart is empty 🛒
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {/* Cart Items */}
            <Box>
              <Stack spacing={2}>
                {cartItems.map((item) => (
                  <Card key={item.product.id} sx={{ display: "flex", mb: 2 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 120, height:180,objectFit: "contain", p: 2 }}
                      image={item.product.image}
                      alt={item.product.title}
                    />

                    <Box
                      sx={{ display: "flex", flexDirection: "column", flex: 1 }}
                    >
                      {/* Product Info */}
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography variant="h6">
                          {item.product.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          ${item.product.price} × {item.quantity}
                        </Typography>
                      </CardContent>

                      {/* Quantity Controls */}
                      <CardActions
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            dispatch(decreaseQuantity(item.product))
                          }
                          disabled={item.quantity <= 1} // prevent minus below 1
                        >
                          -
                        </Button>
                        <Typography variant="body1" sx={{ mx: 1 }}>
                          {item.quantity}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            dispatch(increaseQuantity(item.product))
                          }
                        >
                          +
                        </Button>
                        <Box sx={{ flexGrow: 1 }} />{" "}
                        {/* push remove button to right */}
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => {
                            dispatch(removeCart(item.product));
                            toast(`${item.product.title} removed from cart`);
                          }}
                        >
                          Remove
                        </Button>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ ml: 2 }}
                        >
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </Typography>
                      </CardActions>
                    </Box>
                  </Card>
                ))}
              </Stack>
            </Box>

            {/* Summary */}
            <Box>
              <Card sx={{ p: 3, bgcolor: "white" }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Order Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Items</Typography>
                    <Typography>{cartItems.length}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography fontWeight="bold">Total</Typography>
                    <Typography fontWeight="bold">
                      ${totalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  Checkout
                </Button>
              </Card>
            </Box>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Cart;
