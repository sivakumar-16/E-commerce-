import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const GET_ORDERS_QUERY = gql`
  query GetOrders {
    getOrders {
      id
      totalPrice
      status
     
    }
  }
`;

interface Orders{
    id:number;
    totalPrice:number;
    status:string;
    // userId:number;
    // productId:number
   // createdAt:number;
    // user:number;
    // product:number
}

const OrdersPage: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ORDERS_QUERY);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error fetching orders!</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Orders List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead >
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              {/* <TableCell>UserId</TableCell>
              <TableCell>ProductId</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.getOrders.map((order: Orders) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrdersPage;
