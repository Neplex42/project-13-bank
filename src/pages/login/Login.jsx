import './login.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getUserProfile, login } from '../../reducer/authReducer.js'


const Login = () => {
  const { loading, userToken, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (userToken) {
      navigate('/profile')
      dispatch(getUserProfile(userToken))
    }
  }, [navigate, userToken])

  const submitForm = (data) => {
    dispatch(login(data))
  }

  return (
    <>
      {
        error ? (
          <Navigate to={'/error'} />
        ) : (
          <main className='main bg-dark'>
            <section className='sign-in-content'>
              <i className='fa fa-user-circle sign-in-icon'></i>
              <h1>Sign In</h1>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className='input-wrapper'>
                  <label htmlFor='username'>Username</label>
                  <input
                    type='text'
                    id='username'
                    {...register('email')}
                    required
                  />
                </div>
                <div className='input-wrapper'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    id='password'
                    {...register('password')}
                    required
                  />
                </div>
                <div className='input-remember'>
                  <input type='checkbox' id='remember-me' />
                  <label htmlFor='remember-me'>Remember me</label>
                </div>

                <button type='submit' className='sign-in-button' disabled={loading}>
                  {loading ? 'Loading' : 'Sign In'}
                </button>
              </form>
            </section>
          </main>
        )
      }
    </>

  )
}

export default Login
