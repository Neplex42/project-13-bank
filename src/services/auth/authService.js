import axios from 'axios'

const logout = () => {
  localStorage.removeItem('userToken')
}
const backendURL = 'http://localhost:3001/api/v1'

const login = async (userData) => {
  const response = await axios.post(`${backendURL}/user/login`, userData)

  if (response.data) {
    localStorage.setItem('userToken', response.data.body.token)
  }

  return response.data
}

const getUserProfile = async (token) => {
  const response = await axios.post(`${backendURL}/user/profile`, {}, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  return response.data
}

export const authService = {
  logout,
  login,
  getUserProfile
}