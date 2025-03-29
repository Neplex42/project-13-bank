import axios from 'axios'

// URL de l'API backend
const backendURL = 'http://localhost:3001/api/v1'

/**
 * Déconnecte l'utilisateur en supprimant le token du localStorage
 */
const logout = () => {
  localStorage.removeItem('userToken')
}

/**
 * Authentifie l'utilisateur auprès de l'API
 * @param {Object} userData - Données d'authentification (email, password)
 * @returns {Object} Réponse de l'API contenant le token et les informations utilisateur
 */
const login = async (userData) => {
  try {
    const response = await axios.post(`${backendURL}/user/login`, userData)

    // Stockage du token dans le localStorage pour persister l'authentification
    if (response.data && response.data.body && response.data.body.token) {
      localStorage.setItem('userToken', response.data.body.token)
    }

    return response.data
  } catch (error) {
    // Transforme l'erreur pour qu'elle soit plus facilement exploitable
    if (error.response && error.response.status === 400) {
      // Cas spécifique d'erreur d'authentification (identifiants incorrects)
      return { error: true, status: 400, message: 'Identifiants incorrects' }
    }
    // Retourne l'erreur originale si ce n'est pas une erreur 400
    return error.response || error
  }
}

/**
 * Récupère le profil utilisateur depuis l'API
 * @param {string} token - Token d'authentification JWT
 * @returns {Object} Données du profil utilisateur
 */
const getUserProfile = async (token) => {
  try {
    const response = await axios.post(
      `${backendURL}/user/profile`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
    // Gestion des erreurs d'authentification
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('userToken')
    }

    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Met à jour le profil utilisateur via l'API
 * @param {Object} userData - Nouvelles données utilisateur (firstName, lastName)
 * @param {string} token - Token d'authentification JWT
 * @returns {Object} Profil utilisateur mis à jour
 */
const updateUserProfile = async (userData, token) => {
  try {
    const response = await axios.put(`${backendURL}/user/profile`, userData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('userToken')
    }

    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

// Export des services d'authentification
export const authService = {
  logout,
  login,
  getUserProfile,
  updateUserProfile,
}
