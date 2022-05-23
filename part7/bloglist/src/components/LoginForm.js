import React from 'react'
import { TextField, Button, Box } from '@mui/material'

// username and password are states of useField hook
const LoginForm = ({ username, password, handleLogin }) => (
  <>
    <h2>log in to application</h2>
    <form onSubmit={handleLogin}>
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
    </form>
  </>
)

export default LoginForm