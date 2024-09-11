import  { useState } from 'react';
import { useMutation,gql } from '@apollo/client';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// GraphQL mutation for registration
const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, { data, loading, error }] = useMutation(REGISTER_USER);
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      await register({
        variables: {
          name,
          email,
          password,
        },
      });
      navigate('/login')
      console.log('Registered user:', data);
    } catch (err) {
      alert('Error during registration!');
      console.error('Registration error:', err);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />

      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />

      <Button variant="contained" color="primary" onClick={handleRegister} disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error.message}
        </Typography>
      )}

      {data && (
        <Typography color="success" sx={{ mt: 2 }}>
          Welcome, {data.register.name}! Registration successful.
        </Typography>
      )}
    </Box>
  );
};

export default Register;
