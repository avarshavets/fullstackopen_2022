import React, { useState } from 'react'

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
      <h2>create a new blog</h2>
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
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default CreateBlogForm