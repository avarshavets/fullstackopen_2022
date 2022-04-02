import axios from "axios";

const baseUrl = 'http://localhost:3002/persons'

const getAll = () => {
    const promise = axios.get(baseUrl)
    return promise.then(response => {response.data})
}