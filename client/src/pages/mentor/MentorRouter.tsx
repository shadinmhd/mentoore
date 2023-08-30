import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Home'


const MentorRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/user/dashboard" />} />
      <Route path='/:tab' element={<Home />} />
    </Routes>
  )
}

export default MentorRouter