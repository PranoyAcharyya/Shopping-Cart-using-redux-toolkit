import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppSelector } from '../app/hook';
import CartDialog from './CartDialog';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import Autocomplete from '@mui/material/Autocomplete';
// import { TextField } from '@mui/material';


export default function PrimarySearchAppBar() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlistitems);
  const wishlistCount = wishlistItems.length;
  console.log(wishlistCount);
  

  // State for cart dialog
  const [cartOpen, setCartOpen] = React.useState(false);
  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);
  const navigate = useNavigate();
  // const {items} = useAppSelector((state)=>state.products);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:"#000"}}>
        <Toolbar>
          

          {/* Logo / Title */}
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }} onClick={()=>navigate("/")}>
            MyShop
          </Typography>

          {/* Search */}
          {/* <Autocomplete
      disablePortal
      options={items}
      getOptionLabel={(option)=>option.title}
       sx={{
    width: 300,
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      "& fieldset": {
        borderColor: "#fff",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
    },
    "& .MuiSvgIcon-root": {
      color: "#fff",
    },
  }}
      renderInput={(params) => <TextField {...params} label="products" />}

    /> */}

          <Box sx={{ flexGrow: 1 }} />

          {/* Cart Icon Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit" onClick={handleCartOpen}>
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>

          {/* {widshlist icon} */}
            <IconButton size="large" color="inherit" onClick={()=> navigate("/wishlist")}>
              <Badge badgeContent={wishlistCount} color='error'>
                <FavoriteIcon/>
              </Badge>
              
          </IconButton>

          {/* Cart Icon Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" color="inherit" onClick={handleCartOpen}>
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Cart Dialog */}
      <CartDialog open={cartOpen} onClose={handleCartClose} />
    </Box>
  );
}
