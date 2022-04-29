import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // notification = {message, type}
  const [notification, setNotification] = useState(null)

  // Toggleable component will be stored as an object instance in ref
  const toggleableRef = useRef()

  useEffect(() => {
    user &&
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [user])


  // check if logged user details can be found in the local storage of the app
  // user is saved as a DOMstring --> need to be converted back to JSON with json.parse
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])  // deps: [] --> execute only only with 1st rendering


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // login returns an object {token, username, name}
      const user = await loginService.login({ username, password })

      // save user data in local storage of this web app
      // Note: js object must be converted to string to be saved as a DOMstring in local storage
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))

      // set a token for all blog-related API
      blogService.setToken(user.token)

      setUser(user)
      // empty the login fields
      setUsername('')
      setPassword('')
    } catch (error) {
      notify({
        message: 'wrong username or password',
        type: 'alert'
      })
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
  }


  const createBlog = blogObj => {
    blogService.create(blogObj)
      .then(returnedBlog => {
        // hide Create Blog Form when new blog is created
        toggleableRef.current.toggleVisibility()

        setBlogs(blogs.concat(returnedBlog))
        notify({
          message: `a new blog '${returnedBlog.title}' by ${returnedBlog.author} was created`,
          type: 'info'
        })
      })
      .catch(error => {
        notify({
          message: error.response.data.error,
          type: 'alert'
        })
      })
  }

  const updateBlog = (blogId, blogObj) => {
    blogService.update(blogId, blogObj)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id === blogId ? returnedBlog : b))
      })
      .catch( error => {
        console.log(error.response.data)
        notify({
          message: error.response.data,
          type: 'alert'
        })
      })
  }


  const removeBlog = async blogObj => {
    window.confirm(`Remove blog '${blogObj.title}'?`) &&
      blogService.remove(blogObj.id)
        .then(() => {
          setBlogs(blogs.filter(p => p.id !== blogObj.id))
        })
        .catch(() => {
          notify({
            message: `Blog '${blogObj.title}' has been already removed`,
            type: 'alert'
          })
        })
  }


  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
            username <input id='username' type='text' value={username} name='Username' onChange={
            (e) => setUsername(e.target.value)}/>
        </div>
        <div>
            password <input id='password' type='password' value={password} name='Password' onChange={
            (e) => setPassword(e.target.value)}/>
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </>
  )


  const displayLoggedInUser = () => (
    <>
      <h2>blogs</h2>
      <div>
        {user.username} is logged in
        <span> </span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </>
  )

  const notify = ({ message, type }) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const blogsSorted = [].concat(blogs).sort((a, b) => {
    return b.likes - a.likes
  })

  if (!user) {
    return (
      <>
        <Notification notification={notification}/>
        <div>{loginForm()}</div>
      </>
    )
  }

  // We want to 'close' Create Blog Form when clicking create button.
  //
  // Ways to do this:
  // 1) add toggleVisibility function to createBlog function in App component;
  // 2) pass toggleVisibility function to CreateBlogForm component and call it inside of it.
  // No matter what option is chosen, App needs to access Toggleable function!!!
  // useRef hook can enable a parent component to access parameters of its child component.
  //
  // Steps for adding ref to Toggleable component using useRef hook:
  // code in App:
  // - add ref to Toggleable in App (toggleableRef).
  // code in Toggleable:
  // - wrap Toggleable component inside of a forwardRef.
  //   This way the component can access the ref that is assigned to it.
  // - specify the functions we want to be accessible with the help of useImperativeHandle in Toggleable.
  return (
    <>
      <Notification notification={notification}/>
      <div id='logged-in-user'>{displayLoggedInUser()}</div>

      <Toggleable
        showButtonLabel='create new blog'
        hideButtonLabel='cancel'
        ref={toggleableRef}>
        <CreateBlogForm createBlog={createBlog}/>
      </Toggleable>

      <h4>blog list of {user.username}</h4>
      <div id='blog-list'>
        {blogsSorted
          .map(blog =>
            <Blog key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              user={user}/>
          )}
      </div>
    </>
  )

}



export default App