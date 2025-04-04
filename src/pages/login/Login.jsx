import './login.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getUserProfile, login } from '../../reducer/authReducer.js'

//Fill out credentials
const Login = () => {
  const { loading, userToken, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    if (userToken) {
      navigate('/profile')
      dispatch(getUserProfile(userToken))
    }
  }, [navigate, userToken, dispatch])

  const submitForm = (data) => {
    dispatch(login({ ...data, rememberMe }))
  }

  const isAuthError = error && error.status === 400

  return (
    <>
      {isAuthError ? (
        <main className="main bg-dark">
          <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <div className="error-message">
              Identifiants incorrects. Veuillez réessayer.
            </div>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  {...register('email')}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register('password')}
                  required
                />
              </div>
              <div className="input-remember">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">Remember me</label>
              </div>

              <button
                type="submit"
                className="sign-in-button"
                disabled={loading}
              >
                {loading ? 'Loading' : 'Sign In'}
              </button>
            </form>
          </section>
        </main>
      ) : error ? (
        <Navigate to={'/error'} />
      ) : (
        <main className="main bg-dark">
          <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  {...register('email')}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register('password')}
                  required
                />
              </div>
              <div className="input-remember">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">Remember me</label>
              </div>

              <button
                type="submit"
                className="sign-in-button"
                disabled={loading}
              >
                {loading ? 'Loading' : 'Sign In'}
              </button>
            </form>
          </section>
        </main>
      )}
    </>
  )
}

export default Login
