import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CreateBlogForm from './CreateBlogForm'
import React, { useRef } from 'react'
import Toggleable from './Toggleable'
import Notification from './Notification'

const AllBlogsView = () => {
  const blogs = useSelector(state => state.blogs )
  const notification = useSelector(state => state.notification )

  const toggleableRef = useRef()
  const toggleVisibility = () => { toggleableRef.current.toggleVisibility() }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  if (!blogs) {
    return null
  }

  return (
    <div id='logged-in-user'>
      <Notification notification={notification}/>
      <h2>Blogs</h2>
      <Toggleable showButtonLabel='create new'
        hideButtonLabel='cancel'
        ref={toggleableRef}>
        <CreateBlogForm toggleVisibility={toggleVisibility}/>
      </Toggleable>
      <h4>all blogs</h4>
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
  )
}

export default AllBlogsView