import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { TextField, Button, Box, Alert, CircularProgress, Typography } from '@mui/material';

const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $description: String, $price: Float!, $imageUrl: String) {
    createProduct(name: $name, description: $description, price: $price, imageUrl: $imageUrl) {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

const CreateProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct({ variables: { name, description, price, imageUrl } });
    setName('');
    setDescription('');
    setPrice(0);
    setImageUrl('');
  };

  return (
    <Box component="form" width='50%'onSubmit={handleSubmit} sx={{ mt: 3 ,mx:'auto',alignItems:'center'}}>
     <Typography variant='h3' align='center'>
     Create Products
     </Typography>
      <TextField
        label="Product Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Product Description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Product Price"
        type="number"
        fullWidth
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Image URL"
        fullWidth
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Create Product'}
      </Button>
      {error && <Alert severity="error">Error: {error.message}</Alert>}
      {data && <Alert severity="success">Product created successfully!</Alert>}
    </Box>
  );
};

export default CreateProduct;
