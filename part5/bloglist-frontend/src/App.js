import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification";
import blogService from './services/blogs'
import loginService from './services/login'


const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (e) => {
    // prevent automatic page refreshing
    e.preventDefault()
    const blogObj = {
      title, author, url
    }
    createBlog(blogObj)
    // clear the fields
    setTitle('')
    setAuthor('')
    setUrl('')

  }

  return (
      <>
        <h2>create new blog</h2>
        <form onSubmit={ handleCreateBlog }>
          <div>
            title <input type='text' value={title} name='Title' onChange={
            (e) => setTitle(e.target.value)}/>
          </div>
          <div>
            author <input type='text' value={author} name='Author' onChange={
            (e) => setAuthor(e.target.value)}/>
          </div>
          <div>
            url <input type='text' value={url} name='Url' onChange={
            (e) => setUrl(e.target.value)}/>
          </div>
          <button type='submit'>create</button>
        </form>
      </>
  )
}





const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // notification = {message, type}
  const [notification, setNotification] = useState(null)


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
      const user = await loginService.login({username, password})

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
        message: "wrong username or password",
        type: 'alert'
      })
    }
  }


  const handleLogout = (e) => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
  }


  const createBlog = blogObj => {
    blogService.create(blogObj)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          notify({
            message: `a new blog \'${returnedBlog.title}\' by ${returnedBlog.author} was created`,
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


  const loginForm = () => (
      <>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username <input type='text' value={username} name='Username' onChange={
            (e) => setUsername(e.target.value)}/>
          </div>
          <div>
            password <input type='text' value={password} name='Password' onChange={
            (e) => setPassword(e.target.value)}/>
          </div>
          <button type='submit'>login</button>
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



  if (!user) {
    return (
        <>
          <Notification notification={notification}/>
          <div>{loginForm()}</div>
        </>
    )
  }

  return (
      <>
        <Notification notification={notification}/>
        <div>{displayLoggedInUser()}</div>
        <div><CreateBlogForm createBlog={createBlog}/></div>
        <h4>blog list of {user.username}</h4>
        <div>
          {blogs.map(blog =>
              <Blog key={blog.id} blog={blog}/>
          )}
        </div>
      </>
  )

}



export default App