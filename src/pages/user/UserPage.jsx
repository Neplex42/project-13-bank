import './userPage.scss'
import Account from '../../components/account/Account.jsx'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const UserPage = () => {
  const { loading, userInfo, userToken, error } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userToken) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <>
      {loading && <div className={'loading'}>Chargement...</div>}
      {error && <Navigate to={'/error'} replace={true} state={{ error: error }} />}
      {
        !loading && userInfo && (

          <main className='main bg-dark'>
            <div className='header'>
              <h1>Welcome back<br />{userInfo.body.firstName} {userInfo.body.lastName}!</h1>
              <button className='edit-button'>Edit Name</button>

              <h2 className='sr-only'>Accounts</h2>
            </div>

            <Account title='Argent Bank Checking (x8349)' amount='$2,082.79' description='Available Balance' />
            <Account title='Argent Bank Savings (x6712)' amount='$10,928.42' description='Available Balance' />
            <Account title='Argent Bank Credit Card (x8349)' amount='$184.30' description='Current Balance' />
          </main>
        )
      }
    </>
  )
}

export default UserPage