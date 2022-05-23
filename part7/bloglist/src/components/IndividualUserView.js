import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from '../reducers/usersReducer'
import { selectBlogByUserId } from '../reducers/blogReducer'

const IndividualUserView = () => {
  const userId = useParams().id
  const user = useSelector(state => selectUserById(state, userId))
  const blogs = useSelector(state => selectBlogByUserId(state, userId))

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  // the first rendering after refresh does not have a user data -->
  // Thus, first useEffect with fetching blogs and users in the App.js is skipped
  // Then, second useEffect is executed --> user data is taken from the local window storage
  // Second useEffect causes another rendering --> then first useEffect is executed --> blogs/users are fetched
  // For this reason, we add condition if users exists (to avoid an error in first rendering, when users are null)
  if (!user) {
    return null
  }

  return (
    <div id='logged-in-user'>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>
  )
}

export default IndividualUserView