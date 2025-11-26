import axios from 'axios'

const register = async (userData) =>{
    const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/user/register`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))


        return response.data
    }
}

const authService = {
    register
}

export default authService