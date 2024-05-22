
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, blogLike, canRemove, remove }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className='blog border border-2 border-info rounded mb-2'>
      <div className="position-relative p-3">
        <Link to={`/blogs/${blog.id}`} className='pe-5'>
          {blog.title} - {blog.author}
        </Link>
        <button
          className='btn btn-block btn-outline-info position-absolute top-0 end-0 m-2'
          data-bs-toggle='button'
          onClick={() => setVisible(!visible)}
        >
          {visible ? 'hide' : 'show'}
        </button>
        {visible &&
          <div>
            <div>{blog.url}</div>
            <div>likes {blog.likes}<button className='btn btn-outline-primary mx-1' onClick={blogLike}>like</button></div>
            <div>{blog.user.name}</div>
            {canRemove && <button className='btn btn-outline-danger' onClick={remove}>delete</button>}
          </div>
        }
      </div>
    </div>
  )
}


export default Blog