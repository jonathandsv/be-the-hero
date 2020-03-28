import axios from 'axios'

const api = axios.create({
    baseUrl: 'http://192.168.1.2:3333'
    // baseUrl: 'https://192.168.1.2:44375/api/profile'
})

export default api;