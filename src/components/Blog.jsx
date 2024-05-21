
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, blogLike, canRemove, remove }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className='blog border border-2 border-info rounded mb-2'>
      <div className="p-2">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} - {blog.author}
        </Link>
        <button
          className='btn btn-outline-info mx-2'
          data-bs-toggle='button'
          onClick={() => setVisible(!visible)}
        >
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
    </div>
  )
}


export default Blog