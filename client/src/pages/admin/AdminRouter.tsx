import SideBar from '../../components/SideBar';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Messages from './Messages';
import Bookings from './Bookings';
import Settings from './Settings';
import Transactions from './Transactions';
import { faBook, faDashboard, faGear, faMessage, faExchange, faUserGraduate, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import adminActions from '../../redux/features/adminActions';
import Mentors from './Mentors';
import Users from './Users';
import { toast } from "react-toastify";
import User from './User';
import Mentor from './Mentor';
import "react-toastify"


const AdminRouter = () => {
    const type = useSelector((state: RootState) => state.auth.type)

    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (type !== "admin") {
            navigate("/")
            toast.error("not authorized")
        }
        else
            dispatch(adminActions.adminGet())
    })

    const buttons = [
        { to: "dashboard", icon: faDashboard, text: "dashboard" },
        { to: "messages", icon: faMessage, text: "messages" },
        { to: "mentors", icon: faChalkboardTeacher, text: "mentors" },
        { to: "users", icon: faUserGraduate, text: "users" },
        { to: "bookings", icon: faBook, text: "bookings" },
        { to: "transcations", icon: faExchange, text: "transactions" },
        { to: "settings", icon: faGear, text: "settings" }
    ]
    return (
        <div className='flex'>
            <SideBar buttons={buttons} />
            <div className='flex items-center justify-center w-screen'>
                <Routes>
                    <Route path='' element={<Navigate to="/admin/dashboard" />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/messages' element={<Messages />} />
                    <Route path='/bookings' element={<Bookings />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/mentors' element={<Mentors />} />
                    <Route path='/user/:id' element={<User />} />
                    <Route path='/mentor/:id' element={<Mentor />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/transcations' element={<Transactions />} />
                </Routes >
            </div>
        </div>
    );
};


export default AdminRouter
