import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { getProducts } from '../features/products/productSlice';
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import Productcard from './Productcard';
import {  useNavigate } from 'react-router-dom';




export const Products = () => {
    const dispatch = useAppDispatch();
    const {items,isLoading,error} = useAppSelector((state)=>state.products);
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getProducts());
    },[dispatch])

    if(isLoading){
        return(
            <Container sx={{display:"flex",justifyContent:"center",alignItems:"center",mt:10}}>
                    <CircularProgress/>
            </Container>
        )
    }

    if (error) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Container>
    );
  }


    return (
    <Container sx={{ mt: 4 }}>
      
      

      <Box sx={{display:"flex",justifyContent:"space-between",marginBottom:"30px"}}>
        <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Button onClick={()=>navigate("/cart")} variant='outlined' sx={{borderColor:"#000",color:"#000"}}>Go to cart</Button>
      </Box>
      


      <div className='gridnew'>
        {items.map((product) => (
          
            <Productcard product={product} key={product.id}/>
          
        ))}
      </div>
    </Container>
  );
 
}

export default Products