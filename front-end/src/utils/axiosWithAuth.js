import axios from 'axios'

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token')

    return axios.create({
        headers: {
            Authorization: token,
        },
        baseURL: 'https://secret-recipes-2.herokuapp.com/api',
    })
}