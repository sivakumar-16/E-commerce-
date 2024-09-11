import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Card, CardContent, Typography,  CircularProgress, Alert, Grid, Button, CardActions, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      name
      description
      price
      imageUrl
    }
  }
`;
interface ProductsType{
  id :number;
  name:string;
  description:string;
  price:number;
  imageUrl:string
}

const Products: React.FC = () => {
  const navigate = useNavigate()
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;


  const handleClick=(productId:number,productPrice:number,productName:string)=>{
    localStorage.setItem('productId',productId.toString())
    localStorage.setItem('productPrice',productPrice.toString())
    localStorage.setItem('productName',productName)
    
    navigate('/order')
   
  }
  

  return (
    <>
    <Container maxWidth='lg' sx={{marginTop:'50px'}}>
      <Typography variant='h3' align='center' sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } }}>
        Shop now, thank yourself later. 
      </Typography>
    </Container>
  
    <Grid container spacing={2} sx={{marginTop:'20px' ,mx:'auto',mr:'20px'}}>
      {data.getProducts.map((product: ProductsType) => (
        <Grid item xs={12} sm={5} md={2} lg={2} key={product.id} >
          <Card sx={{maxWidth:245,border:'2px solid gray',borderRadius:'20px',mt:'20px',":hover":{boxShadow:20}}}>
            <CardContent >
          
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} width="200px" height='200px' />}
            
              <Typography variant="h5" >{product.name}</Typography>
              {/* <Typography variant="body2" color="textSecondary">
                {product.description}
              </Typography> */}
              <Typography variant="h6">Price: ₹{product.price}</Typography>
              <CardActions >
              <Button  
                variant="contained"
                color="primary"
                sx={{ mx:'auto' }}
                onClick={()=>handleClick(product.id,product.price,product.name)}
              >
                Buy
              </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    
    </>
  );
};

export default Products;
