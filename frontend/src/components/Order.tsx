import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CREATE_ORDER = gql`
  mutation (
    $status: String!
    $totalPrice: Float!
    $productId: Float!
    $userId: Float!
  ) {
    createOrder(
      status: $status
      totalPrice: $totalPrice
      productId: $productId
      userId: $userId
    ) {
      id
      status
    }
  }
`;

const CreateOrderPage = () => {
  const userId = Number(localStorage.getItem("userId"));
  const productId = Number(localStorage.getItem("productId"));
  const productName = localStorage.getItem("productName");
  const totalPrice = Number(localStorage.getItem("productPrice"));

  const [status, setStatus] = useState<string>("");
  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER);
  const navigate = useNavigate()

  const handleCreateOrder = async () => {
    try {
      await createOrder({
        variables: { status, totalPrice, productId, userId },
      });
      alert("Order created successfully!");
      navigate('/orders')
    } catch (err) {
      alert("Error creating order!");
      console.error(err);
    }
  };

  return (
    <Box  sx={{ padding: 3,display:'flex',flexDirection:'column', alignItems:'center' }}>
      <Typography variant="h4" gutterBottom>
        Create Order
      </Typography>
      <TextField
        label="User ID"
        type="number"
        variant="outlined"
        value={userId}
        
        sx={{ mb: 2, width: "300px" }}
      />
      <TextField
        label="Product IDs "
        variant="outlined"
        value={productId}
        
        sx={{ mb: 2, width: "300px" }}
      />
       <TextField
        label="Product Name)"
        variant="outlined"
        value={productName}
        sx={{ mb: 2, width: "300px" }}
      />
      <TextField
        label="Total Price"
        type="number"
        variant="outlined"
        value={totalPrice}
        
        sx={{ mb: 2, width: "300px" }}
      />
      <TextField
        label="Status"
        variant="outlined"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ mb: 2, width: "300px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateOrder}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Order"}
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default CreateOrderPage;
