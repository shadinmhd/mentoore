import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import Mentors from "./pages/Mentors"
import Login from "./pages/Login"
import UserRegister from "./pages/UserRegister"
import MentorRegister from "./pages/MentorRegister"
import Admin from "./pages/Admin"
import MentorRouter from "./pages/mentor/MentorRouter"
import UserRouter from "./pages/user/UserRouter"
import { ToastContainer, toast } from "react-toastify"
import Mentor from "./pages/Mentor"
import { useEffect, useState } from "react"
import UserContext from "./context/UserContext"
import Api from "./services/Api"
import Otp from "./components/Otp"
import socket from "./services/Socket"
import MessageNotification from "./components/shared/MessageNotification"
import Banned from "./pages/shared/Banned"


const App = () => {
	const navigate = useNavigate()
	// @ts-ignore
	const [caller, setCaller] = useState({
		name: "",
		_id: ""
	})
	const [user, setUser] = useState({
		_id: "",
		name: "",
		email: "",
		verified: true,
		status: ""
	})


	useEffect(() => {
		(async () => {
			if (localStorage.getItem("token")) {
				const { data } = await Api.get("/user")

				if (data.success) {
					setUser(data.user)
					console.log(data)
					if (data.user.status == "banned") {
						navigate("/banned")
					}
					if (!user.verified) {
						navigate("/otp")
						console.log("going to otp")
					}
					socket.emit("user:add", data.data.user._id)
				} else {
					toast.error(data?.data.messagzae)
				}
			}
		})();

		socket.on("msg:nt", async (name, content) => {
			toast(<MessageNotification name={name} content={content} />)
		})

	}, [])

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<ToastContainer draggable position="bottom-right" />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/banned" element={<Banned />} />
				<Route path="/otp" element={<Otp />} />
				<Route path="/admin/*" element={<Admin />} />
				<Route path="/mentor/*" element={<MentorRouter />} />
				<Route path="/student/*" element={<UserRouter />} />
				<Route path="/mentors" element={<Mentors />} />
				<Route path="/mentors/:id" element={<Mentor />} />
				<Route path="/login" element={<Login />} />
				<Route path="/userRegister" element={<UserRegister />} />
				<Route path="/mentorRegister" element={<MentorRegister />} />
			</Routes>
		</UserContext.Provider>
	)
}

export default App
