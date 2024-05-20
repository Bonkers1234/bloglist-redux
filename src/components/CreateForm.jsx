
import { useState } from 'react'

const CreateForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    createNewBlog({ title, author, url, likes: 0 })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreate}>
      <h2>Create New Blog:</h2>
      <div className='input-group input-group-sm'>
        {/* <label htmlFor='title' className='form-label'>title</label> */}
        <div className='input-group-text'><b>Title</b></div>
        <input
          className='form-control'
          // id='title'
          type="text"
          name="Title"
          placeholder='Title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className='input-group input-group-sm'>
        {/* <label htmlFor='author' className='form-label'>author</label> */}
        <div className='input-group-text'><b>Author</b></div>
        <input
          className='form-control'
          // id='author'
          type="text"
          name="Author"
          placeholder='Author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div className='input-group input-group-sm'>
        {/* <label htmlFor='url' className='form-label'>url</label> */}
        <div className="input-group-text"><b>Url</b></div>
        <input
          className='form-control'
          // id='url'
          type="text"
          name="Url"
          placeholder='Url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}/>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateForm