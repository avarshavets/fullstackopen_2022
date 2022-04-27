import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState()

  const handleViewClick = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  const handleLikeClick = () => {
    const newBlog = {
      likes: blog.likes + 1
    }
    updateBlog(blog.id, newBlog)
  }

  const handleRemoveClick = () => {
    removeBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const displayStyle = { display: visible? '' : 'none' }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={handleViewClick}>{visible ? 'hide': 'view'}</button>
      <div style={ displayStyle }>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={handleLikeClick}>like</button>
        </div>
        <div>{blog.author}</div>
        <button onClick={handleRemoveClick}>remove</button>
      </div>
    </div>
  )
}

export default Blog