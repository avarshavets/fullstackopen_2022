import axios from "axios";

const baseUrl = 'http://localhost:3002/persons'

const getAll = () => {
    const promise = axios.get(baseUrl)
    return promise.then(response => response.data)
}

const create = newObj => {
    const promise = axios.post(baseUrl, newObj)
    return promise.then(response => response.data)
}

const update = (id, newObj) => {
    const promise = axios.put(`${baseUrl}/${id}`, newObj)
    return promise.then(response => response.data)
}

const remove = (id) => axios.delete(`${baseUrl}/${id}`)


export default { getAll, create, update, remove }