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
import Call from "./components/shared/Call"
import MessageNotification from "./components/shared/MessageNotification"


const App = () => {
	const navigate = useNavigate()
	const [call, setCall] = useState(false)
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
			const type = localStorage.getItem("type");
			let data
			if (type) {
				if (type == "student")
					data = await Api.get("/student")
				else if (type == "mentor")
					data = await Api.get("/mentor")
				else if (type == "admin")
					data = await Api.get("/admin")

				if (data?.data.success) {
					setUser(data.data.user)
					console.log("user recieved")
					if (!user.verified) {
						navigate("/otp")
						console.log("going to otp")
					}
					socket.emit("user:add", data.data.user._id)
				} else {
					toast.error(data?.data.message)
				}
			}
		})();

		socket.on("msg:nt", async (name, content) => {
			toast(<MessageNotification name={name} content={content} />)
		})

	}, [])

	useEffect(() => {
		const time = setTimeout(() => {
			setCall(false)
		}, 10000)

		return () => {
			clearTimeout(time)
		}
	}, [call])

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<ToastContainer draggable position="bottom-right" />
			{
				call &&
				<Call setCall={setCall} name={user.name} id={caller._id} />
			}
			<Routes>
				<Route path="/" element={<Home />} />
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
