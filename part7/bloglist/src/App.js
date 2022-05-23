import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useField } from './hooks'
import { addTokenForServices, setUser, userLogin, userLogout } from './reducers/loggedInUserReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'

import { Routes, Route, Link, useNavigate } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import UsersView from './components/UsersView'
import IndividualUserView from './components/IndividualUserView'
import IndividualBlogView from './components/IndividualBlogView'
import BlogsView from './components/BlogsView'
import DisplayLoggedInUser from './components/DisplayLoggedInUser'
import LoggedInUserView from './components/LoggedInUserView'
import Notification from './components/Notification'
// css from material ui
import { Container, Typography } from '@mui/material'

const App = () => {
  const username = useField('text')
  const password = useField('text')

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const userFromStorage = JSON.parse(loggedUserJSON)
      // token for blog services is set inside setUser action
      dispatch(setUser(userFromStorage))
      addTokenForServices(userFromStorage)
    }
  }, [])  // deps: [] --> execute only only with 1st rendering


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // login returns an object {token, id, username, name}
      await dispatch(userLogin({
        username: username.value,
        password: password.value
      }))

      // empty the login fields
      username.reset()
      password.reset()
      navigate('/')

    } catch (error) {
      dispatch(setNotification(
        'wrong username or password',
        'alert',
        3))
      username.reset()
      password.reset()
    }
  }

  const handleLogout = () => {
    dispatch(userLogout())
    navigate('/login')
  }

  const menuStyle = {
    padding: 5,
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  const padding = {
    paddingRight: 15
  }


  if (!user) {
    return (
      <Container>
        <Notification notification={notification}/>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <LoginForm username={username}
            password={password}
            handleLogin={handleLogin}/>
        </Typography>
      </Container>
    )
  }

  return (
    <Container>
      <div id='navigation-menu' style={menuStyle}>
        <Link style={padding} to="/home">home</Link>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <DisplayLoggedInUser userName={user.name} handleLogout={handleLogout}/>
      </div>
      <Routes>
        <Route path="/login"
          element={<LoginForm username={username}
            password={password}
            handleLogin={handleLogin}/>} />
        <Route path="/"
          element={<BlogsView  />} />
        <Route path="/users/"
          element={<UsersView />} />
        <Route path="/users/:id"
          element={<IndividualUserView />} />
        <Route path="/home"
          element={<LoggedInUserView />} />
        <Route path="/blogs/:id"
          element={<IndividualBlogView />} />
      </Routes>
    </Container>
  )

}



export default App