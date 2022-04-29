import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
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
    <div style={blogStyle} className='blogDiv'>
      {blog.title} by {blog.author}
      <button className='toggleable-button' onClick={handleViewClick}>{visible ? 'hide': 'view'}</button>

      <div style={ displayStyle } className='toggleableContent'>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button className='like-button' onClick={handleLikeClick}>like</button>
        </div>
        <div>by user: {user.username}</div>
        <button className='remove-button' onClick={handleRemoveClick}>remove</button>
      </div>
    </div>
  )
}

export default Blog