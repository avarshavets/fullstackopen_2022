import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const NavigationMenu = ({ userName, handleLogout }) => {
  const pages = [
      {name: 'home', link: '/home'},
      {name: 'blogs', link: '/'},
      {name: 'users', link: '/users'}
  ]

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            {pages.map(page => (
                <Button
                    key={page.name}
                    variant='h6'
                    component={Link}
                    to={page.link}
                    sx={{ flexGrow: 1 }}>
                    {page.name}
                </Button>
            ))}
          <Typography>{userName} is logged in</Typography>
          <Button variant='h6'
                color="inherit"
                onClick={handleLogout}>
                Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavigationMenu