import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CreateBlogForm from './CreateBlogForm'
import React, { useRef } from 'react'
import Toggleable from './Toggleable'
import { selectBlogsByUserId } from '../reducers/blogReducer'
import Notification from './Notification'
import BlogTable from './BlogTable'

const LoggedInUserView = () => {
  // { token, id, username, name }
  const loggedInUser = useSelector(state => state.user)

  // it is more efficient to loop through list of blog ids in a specific user
  // rather than select blog by user ids from ALL blogs by
  const blogs = useSelector(state =>
      selectBlogsByUserId(state, loggedInUser.id))

  const notification = useSelector(state => state.notification)

  const toggleableRef = useRef()
  const toggleVisibility = () => { toggleableRef.current.toggleVisibility() }

  if (!loggedInUser) {
    return null
  }
  return (
    <div id='logged-in-user'>
      <Notification notification={notification}/>
      <h2>My Blogs</h2>
      <Toggleable showButtonLabel='create new'
                  hideButtonLabel='cancel'
                  ref={toggleableRef}>
          <CreateBlogForm toggleVisibility={toggleVisibility}/>
      </Toggleable>
      <h4>added blogs</h4>
      <BlogTable blogs={blogs}/>
    </div>
  )
}

export default LoggedInUserView