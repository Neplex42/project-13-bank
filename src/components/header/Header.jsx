import './header.scss'
import Logo from '/img/argentBankLogo.png?url'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../../reducer/authReducer.js'

const Header = () => {
  const { userInfo, userToken } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <nav className='main-nav'>
      <NavLink className='main-nav-logo' to={'/'}>
        <img
          className='main-nav-logo-image'
          src={Logo}
          alt='Argent Bank Logo'
        />
        <h1 className='sr-only'>Argent Bank</h1>
      </NavLink>
      <div>
        {userToken && userInfo ? (
          <>
            <NavLink to={'/profile'} className='main-nav-item'>
              <FontAwesomeIcon icon={faCircleUser} />
              {/* get user first name and last name when login*/}

              {userInfo.body.firstName} {userInfo.body.lastName}
            </NavLink>

            <button onClick={() => onLogout()} className='main-nav-item'>
              <FontAwesomeIcon icon={faRightFromBracket} />
              Sign Out
            </button>
          </>
        ) : (
          <NavLink to={'/login'} className={({ isActive }) => isActive ? `main-nav-item active` : 'main-nav-item'}>
            <FontAwesomeIcon icon={faCircleUser} />
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  )
}

export default Header

