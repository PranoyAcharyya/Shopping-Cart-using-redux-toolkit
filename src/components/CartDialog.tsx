import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { increaseQuantity, decreaseQuantity, removeCart } from "../features/cart/cartSlice";
import CloseIcon from "@mui/icons-material/Close";

interface CartDialogProps {
  open: boolean;
  onClose: () => void;
}

const CartDialog: React.FC<CartDialogProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Shopping Cart
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {cartItems.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            Your cart is empty 🛒
          </Typography>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            {cartItems.map((item) => (
              <Box
                key={item.product.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={1}
                borderRadius={1}
                bgcolor="grey.100"
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    style={{ width: 60, height: 60, objectFit: "contain" }}
                  />
                  <Box>
                    <Typography variant="subtitle1">{item.product.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.product.price.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => dispatch(decreaseQuantity(item.product))}
                    disabled={item.quantity <= 1} // prevent negative
                  >
                    -
                  </Button>
                  <Typography>{item.quantity}</Typography>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => dispatch(increaseQuantity(item.product))}
                  >
                    +
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => dispatch(removeCart(item.product))}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            ))}
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="contained" fullWidth onClick={onClose}>
          Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartDialog;
