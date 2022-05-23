import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const CreateBlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleCreateBlog = async (e) => {
    try {
      e.preventDefault()
      const blogObj = {
        title, author, url
      }
      await dispatch(createBlog(blogObj))

      setTitle('')
      setAuthor('')
      setUrl('')
      toggleVisibility()

      dispatch(setNotification(
        `a new blog '${blogObj.title}' by ${blogObj.author} was created`,
        'info',
        3
      ))
    }
    catch (error) {
      dispatch(setNotification(
        error.response.data.error,
        'alert',
        3
      ))
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <>
      <h4>create a new blog</h4>
      <form onSubmit={ handleCreateBlog } id='create-blog-form'>
        <div>title <input
          type='text'
          value={title}
          name='Title'
          onChange={(e) => setTitle(e.target.value)}
          placeholder='enter a blog title'
          id='title-input' />
        </div>
        <div>author <input
          type='text'
          value={author}
          name='Author'
          onChange={(e) => setAuthor(e.target.value)}
          id='author-input' />
        </div>
        <div>url <input
          type='text'
          value={url}
          name='Url'
          onChange={(e) => setUrl(e.target.value)}
          id='url-input'/>
        </div>
        <button type='submit'>create new</button>
      </form>
    </>
  )
}

export default CreateBlogForm