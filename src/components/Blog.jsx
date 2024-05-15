
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, blogLike, canRemove, remove }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle}>
      <Link to={`/blogs/${blog.id}`} >
        {blog.title} - {blog.author}
      </Link>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'show'}
      </button>
      {visible &&
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}<button onClick={blogLike}>like</button></div>
          <div>{blog.user.name}</div>
          {canRemove && <button onClick={remove}>delete</button>}
        </div>
      }
    </div>
  )
}


export default Blog