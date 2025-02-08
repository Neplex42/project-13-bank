import './login.scss'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form'
import { userLogin } from "../../features/auth/authActions.js";

const Login = () => {
  const {loading, error} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm()

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }

  return (
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              {/*<input type="text" id="username" />*/}
              <input
                  type='text'
                  id="username"
                  {...register('email')}
                  required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              {/*<input type="password" id="password" />*/}
              <input
                  type='password'
                  id="password"
                  {...register('password')}
                  required
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            {/*<button className="sign-in-button">Sign In</button>*/}

            <button type='submit' className='sign-in-button' disabled={loading}>
              {loading ? 'Loading' : 'Sign In'}
            </button>
          </form>
        </section>
      </main>
  )
}

export default Login
