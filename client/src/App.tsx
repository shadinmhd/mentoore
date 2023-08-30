import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/MentorRegister'
import { ToastContainer } from 'react-toastify'
import Mentors from './pages/Mentors'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './redux/store'
import Contact from './pages/Contact'
import TypeRouter from './pages/components/TypeRouter'
import UserRegister from './pages/userRegister'
import MentorRegister from './pages/MentorRegister'
import authSlice from './redux/features/authSlice'
import About from './pages/About'

const App = () => {
  const dispatch: AppDispatch = useDispatch()
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn)

  dispatch(authSlice.actions.init())

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
        <Route path='/user/register' element={<UserRegister />} />
        <Route path='/mentor/register' element={<MentorRegister />} />
        <Route path='/user/*' element={loggedIn ? <TypeRouter /> : <Navigate to="/login" />} />
      </Routes>
    </>
  )
}


export default App