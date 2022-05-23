import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import React from 'react'
import { removeBlog, selectBlogById, updateBlog } from '../reducers/blogReducer'
import Comments from './Comments'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'

const IndividualBlogView = () => {
  const blogId = useParams().id
  const blog = useSelector(state => selectBlogById(state, blogId))
  const loggedInUser = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  // initial rendering after dispatch(remove) will not find a blog --> check if blog exists
  const blogBelongsToLoggedInUser = blog && blog.user.id === loggedInUser.id

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLikeClick = () => {
    const newBlog = {
      likes: blog.likes + 1
    }
    dispatch(updateBlog(blog.id, newBlog))
  }

  const handleRemoveClick = async () => {
    try {
      const confirmDelete = window.confirm(`Delete blog '${blog.title}' ?`)
      if (confirmDelete) {
        await dispatch(removeBlog(blog))
        navigate('/')
        dispatch(setNotification(
          `Blog '${blog.title}' has been successfully removed`,
          'info',
          3
        ))
      }
    }
    catch (error) {
      dispatch(setNotification(
        `Blog '${blog.title}' is already removed.`,
        'alert',
        3
      ))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div id='logged-in-user'>
      <Notification notification={notification}/>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
                likes {blog.likes}
        <button className='like-button' onClick={handleLikeClick}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {blogBelongsToLoggedInUser &&
                <button className='remove-button' onClick={handleRemoveClick}>remove</button>}
      <Comments blogObj={blog}/>
    </div>
  )
}

export default IndividualBlogView