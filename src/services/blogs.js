import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'


const headers = {
  Authorization: localStorage.getItem('loggedBlogappUser')
    ? `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    : null
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  const request = await axios.post(baseUrl, newObject, { headers })
  return request.data
}

const update = async (newObject) => {
  const request = await axios.put(`${baseUrl}/${newObject.id}`, newObject, { headers })
  return request.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers })
}

export default { getAll, create, update, remove }