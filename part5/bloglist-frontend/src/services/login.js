import axios from "axios";

const baseUrl = '/api/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    // axios response.data returns HTTP response.body
    // (in our case it is an obj { token, username, name })
    return response.data
}

export default { login }