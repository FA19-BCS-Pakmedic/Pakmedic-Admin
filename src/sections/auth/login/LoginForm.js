import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import {
  loginAdmin
} from '../../../utils/api';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async() => {

    setIsBtnLoading(true);

    try {
      const data = {email, password};

      const response = await loginAdmin(data);

      console.log(response);



    }catch(err) {

      setError(err.response.data.message);

    }finally {
      setIsBtnLoading(false);
    }
  

    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack spacing={3} sx={{ my: 3 }}>
        <TextField name="email" label="Email address" onChange={(e) => setEmail(e.target.value)} value={email}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} loading={isBtnLoading}>
        Login
      </LoadingButton>
    </>
  );
}
