
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
    <form onSubmit={handleCreate} className='mb-1'>
      <h2>Create New Blog:</h2>
      <div className='input-group input-group-sm'>
        <span className='input-group-text'><b>Title</b></span>
        <input
          className='form-control'
          type="text"
          name="Title"
          placeholder='Title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className='input-group input-group-sm'>
        <span className='input-group-text'><b>Author</b></span>
        <input
          className='form-control'
          type="text"
          name="Author"
          placeholder='Author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div className='input-group input-group-sm'>
        <span className="input-group-text"><b>Url</b></span>
        <input
          className='form-control'
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