import axios from 'axios'
import store from '../store'

export default () => {
    return axios.create({
        baseURL: process.env.VUE_APP_API_SERVER,
        headers: {
            Authorization: `Bearer ${store.state.token}`
        }
    })
}