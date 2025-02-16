import Header from '../components/header/Header.jsx'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer.jsx'
import { getUserProfile } from '../reducer/authReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const Layout = () => {
  const dispatch = useDispatch()
  const { loading, userInfo, userToken, error } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!userInfo && userToken && !loading && !error) {
      dispatch(getUserProfile(userToken))
    }
  }, [dispatch, userToken])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout