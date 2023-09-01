import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/mentor/Register'
import { ToastContainer } from 'react-toastify'
import Mentors from './pages/Mentors'
import Contact from './pages/Contact'
import About from './pages/About'
import UserRouter from './pages/user/UserRouter'
import MentorRouter from './pages/mentor/MentorRouter'
import { useEffect } from "react"
import { AppDispatch } from './redux/store'
import { useDispatch } from 'react-redux'
import authSlice from './redux/features/authSlice'
import AdminRouter from './pages/admin/AdminRouter'

const App = () => {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(authSlice.actions.init())
  })

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/mentors' element={<Mentors />} />
        <Route path='/admin/*' element={<AdminRouter />} />
        <Route path='/mentor/*' element={<MentorRouter />} />
        <Route path='/user/*' element={<UserRouter />} />
      </Routes>
    </>
  )
}


export default App