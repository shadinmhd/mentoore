import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Mentors from "./pages/Mentors"
import Login from "./pages/Login"
import UserRegister from "./pages/UserRegister"
import MentorRegister from "./pages/MentorRegister"
import Admin from "./pages/Admin"
import MentorRouter from "./pages/mentor/MentorRouter"
import UserRouter from "./pages/user/UserRouter"
import { ToastContainer } from "react-toastify"
import Mentor from "./pages/Mentor"


const App = () => {
	return (
		<>
			<ToastContainer draggable position="bottom-right" />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/admin/*" element={<Admin />} />
				<Route path="/mentor/*" element={<MentorRouter />} />
				<Route path="/student/*" element={<UserRouter />} />
				<Route path="/mentors" element={<Mentors />} />
				<Route path="/mentors/:id" element={<Mentor />} />
				<Route path="/login" element={<Login />} />
				<Route path="/userRegister" element={<UserRegister />} />
				<Route path="/mentorRegister" element={<MentorRegister />} />
			</Routes>
		</>
	)
}

export default App
