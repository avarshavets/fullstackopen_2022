import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const Comments = ({ blogObj }) => {
  const [comments, setComments] = useState([])

  useEffect(async () => {
    if (blogObj) {
      const data = await getBlogComments(blogObj.id)
      setComments(data)
    }
  }, [blogObj])

  const getBlogComments = async (blogId) => {
    return await blogService.getComments(blogId)
  }

  const addCommentToBlog = async (blogId, commentObj) => {
    return await blogService.createComment(blogId, commentObj)
  }

  const handleSubmitClick = async (e) => {
    e.preventDefault()
    const commentObj = {
      content: e.target.comment.value,
    }
    const newComment = await addCommentToBlog(blogObj.id, commentObj)
    setComments(comments.concat(newComment))
    e.target.comment.value = ''
  }

  return (
    <>
      <h4>comments</h4>
      <form onSubmit={handleSubmitClick}>
        <input type='text' name='comment'/>
        <button>add comment</button>
      </form>
      <ul>
        {comments.map(c => (<li key={c.id}>{c.content}</li>))}
      </ul>

    </>
  )
}

export default Comments