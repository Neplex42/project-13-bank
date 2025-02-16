import axios from 'axios'

const backendURL = 'http://localhost:3001/api/v1'

const logout = () => {
  localStorage.removeItem('userToken')
}

const login = async (userData) => {
  try {
    const response = await axios.post(`${backendURL}/user/login`, userData);

    if (response.data && response.data.body && response.data.body.token) {
      localStorage.setItem('userToken', response.data.body.token);
    }

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    return error.response || error;
  }
};


const getUserProfile = async (token) => {
  try {
    const response = await axios.post(`${backendURL}/user/profile`, {}, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('userToken')
    }

    return response.data
  } catch (error) {
    console.error('Error in authService.js', error)
    throw new Error(error)
  }
}

export const authService = {
  logout,
  login,
  getUserProfile
}