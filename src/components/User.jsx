
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user = useSelector(({ users }) => users.find(user => user.id === id))

  // Fixes first render 'user' undefined problem
  if(!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs:</h3>
      <div className='row row-cols-1 row-cols-sm-2 g-1'>
        {user.blogs.map(blog =>
          <div key={blog.id} className="card">
            <h4 className="card-header">{blog.title}</h4>
            <div className="card-body">{blog.author}</div>
            <div className="card-footer">
              <a href={blog.url}>{blog.url}</a></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default User