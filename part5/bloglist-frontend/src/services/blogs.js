import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObj => {
  // alternative local definition of Auth header instead of global
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const update = async (id, newObj) => {
  const promise = axios.put(`${baseUrl}/${id}`, newObj)
  return promise.then(response => response.data)
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}


export default { getAll, create, update, remove, setToken }