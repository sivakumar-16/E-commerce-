import { useMutation, gql  } from '@apollo/client';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// GraphQL mutation for login
const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);
  const navigate= useNavigate()

  const handleLogin = async () => {
    try {
      await login({
        variables: {
          email,
          password,
        },
      });
    //   alert('Login successful!');
      navigate('/product')
      console.log('Logged in user:', data);
    } catch (err) {
      alert('Error during login!, Register Please 🙏');
      navigate('/register')
      console.error('Login error:', err);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

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

      <Button variant="contained" color="primary" onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Submit'}
      </Button>

      {/* <Button variant="contained" color="secondary" onClick={()=>navigate('/register')} sx={{mt:'2px'}}>
        Resister
          </Button> */}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error.message}
        </Typography>
      )}

      {data && (
        <Typography color="success" sx={{ mt: 2 }}>
          Welcome, {data.login.name}!
        </Typography>
      )}
    </Box>
  );
};

export default Login;
