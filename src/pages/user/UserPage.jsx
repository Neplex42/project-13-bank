import './userPage.scss'
import Account from '../../components/account/Account.jsx'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { reset, updateUserProfile } from '../../reducer/authReducer.js'

const UserPage = () => {
  const { loading, userInfo, userToken, error, success } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isEditMode, setIsEditMode] = useState(false)
  const [editedFirstName, setEditedFirstName] = useState(userInfo?.body.firstName || '')
  const [editedLastName, setEditedLastName] = useState(userInfo?.body.lastName || '')

  const handleEditClick = () => setIsEditMode(true)

  const handleSaveClick = () => {
    dispatch(updateUserProfile({
      userData: { firstName: editedFirstName, lastName: editedLastName },
      token: userToken
    }))
  }

  useEffect(() => {
    if (success) {
      setIsEditMode(false)
      dispatch(reset())
    }
  }, [success, dispatch])

  useEffect(() => {
    if (!userToken) {
      navigate('/login')
    }
  }, [navigate, userToken])

  return (
    <>
      {loading && <div className={'loading'}>Chargement...</div>}
      {error && <Navigate to={'/error'} replace={true} state={{ error: error }} />}
      {
        !loading && userInfo && (

          <main className='main bg-dark'>
            <div className='header'>
              {isEditMode ? (
                <>
                  <h1>Welcome back <br /></h1>

                  <div className='input-wrapper center'>
                    <label>
                      <input
                        type='text'
                        value={editedFirstName}
                        placeholder={userInfo.body.firstName}
                        onChange={(e) => setEditedFirstName(e.target.value)}
                      />
                    </label>
                    <label>
                      <input
                        type='text'
                        value={editedLastName}
                        placeholder={userInfo.body.lastName}
                        onChange={(e) => setEditedLastName(e.target.value)}
                      />
                    </label>
                  </div>
                  <button className='edit-button' onClick={handleSaveClick}>Save</button>
                  <button className='edit-button' onClick={() => setIsEditMode(false)}>Cancel</button>
                </>
              ) : (
                <>
                  <h1>
                    Welcome back<br />
                    {userInfo.body.firstName} {userInfo.body.lastName}!
                  </h1>
                  <button className='edit-button' onClick={handleEditClick}>
                    Edit Name
                  </button>
                </>
              )}

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