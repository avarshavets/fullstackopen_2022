import { useSelector } from 'react-redux'
import CreateBlogForm from './CreateBlogForm'
import React, { useRef } from 'react'
import Toggleable from './Toggleable'
import Notification from './Notification'
import BlogTable from './BlogTable'

const AllBlogsView = () => {
  const blogs = useSelector(state => state.blogs )
  const notification = useSelector(state => state.notification )

  const toggleableRef = useRef()
  const toggleVisibility = () => { toggleableRef.current.toggleVisibility() }

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
      <BlogTable blogs={blogs}/>
    </div>
  )
}

export default AllBlogsView