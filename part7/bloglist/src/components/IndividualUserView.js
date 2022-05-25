import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUserById } from '../reducers/usersReducer'
import { selectBlogsByUserId } from '../reducers/blogReducer'
import BlogTable from './BlogTable'

const IndividualUserView = () => {
  const userId = useParams().id
  const user = useSelector(state => selectUserById(state, userId))
  const blogs = useSelector(state => selectBlogsByUserId(state, userId))

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
      <BlogTable blogs={blogs}/>
    </div>
  )
}

export default IndividualUserView