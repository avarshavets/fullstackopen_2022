import React from 'react'
import { TextField, Button, Box } from '@mui/material'

// username and password are states of useField hook
const LoginForm = ({ username, password, handleLogin }) => (
      <Box component='form'
           sx={{
               '& .MuiTextField-root': { m: 1, width: '25ch' },
           }}
           noValidate
           onSubmit={handleLogin}>
          <div>
              <TextField id="filled-basic"
                         label="username"
                         variant="outlined"
                         name='Username'
                         type={username.type}
                         value={username.value}
                         onChange={username.onChange}/>
          </div>
          <div>
              <TextField
                  id="filled-basic"
                  label="password"
                  variant="outlined"
                  name='Password'
                  type={password.type}
                  value={password.value}
                  onChange={password.onChange}/>
          </div>
          <Button variant="contained" color="primary" id='login-button' type='submit'>login</Button>
      </Box>
)

export default LoginForm