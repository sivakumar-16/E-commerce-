// src/pages/HomePage.tsx

import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Styles for the background and container
const styles = {
  background: {
    backgroundImage: 'url("https://i.pinimg.com/564x/b5/3b/f1/b53bf1fd71eeadcf0ac907ec47a933cf.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    position: 'relative' 
  },
  buttonContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  button: {
    marginRight: 1,
  },
};

const HomePage: React.FC = () => {
    const navigate = useNavigate()
  return (
    <Box sx={styles.background}>
      <Container>
        <Box sx={styles.buttonContainer}>
          <Button variant="contained" color="primary" sx={styles.button} onClick={()=>navigate('/login')}>
            Login
          </Button>
          <Button variant="contained" color="secondary" onClick={()=>navigate('/register')}>
            Register
          </Button>
        </Box>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to our SHOP
        </Typography>
        <Button variant="contained" color="primary" size="large" onClick={()=> navigate('/login ')}>
         Login and  Buy Products
        </Button>
      </Container>
    </Box>
  );
};

export default HomePage;
