import  { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Box, TextField, Button, Typography } from '@mui/material';

// GraphQL mutation for creating an order
const CREATE_ORDER = gql`
  mutation CreateOrder($userId: Int!, $productIds: [Int!]!, $totalPrice: Float!, $status: String) {
    createOrder(userId: $userId, productIds: $productIds, totalPrice: $totalPrice, status: $status) {
      id
      totalPrice
      status
    }
  }
`;

const CreateOrderPage = () => {
  const [userId, setUserId] = useState<number>(0);
  const [productIds, setProductIds] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER);

  const handleCreateOrder = async () => {
    try {
      await createOrder({
        variables: { userId, productIds, totalPrice, status },
      });
      alert('Order created successfully!');
    } catch (err) {
      alert('Error creating order!');
      console.error(err);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create Order
      </Typography>
      <TextField
        label="User ID"
        type="number"
        variant="outlined"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
        sx={{ mb: 2, width: '300px' }}
      />
      <TextField
        label="Product IDs (comma separated)"
        variant="outlined"
        value={productIds.join(',')}
        onChange={(e) => setProductIds(e.target.value.split(',').map(Number))}
        sx={{ mb: 2, width: '300px' }}
      />
      <TextField
        label="Total Price"
        type="number"
        variant="outlined"
        value={totalPrice}
        onChange={(e) => setTotalPrice(Number(e.target.value))}
        sx={{ mb: 2, width: '300px' }}
      />
      <TextField
        label="Status"
        variant="outlined"
        type='string'
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />
      <Button variant="contained" color="primary" onClick={handleCreateOrder} disabled={loading}>
        {loading ? 'Creating...' : 'Create Order'}
      </Button>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error.message}</Typography>}
    </Box>
  );
};

export default CreateOrderPage;
