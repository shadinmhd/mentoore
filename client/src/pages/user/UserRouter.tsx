import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Settings from './Settings';
import Messages from './Messages';
import Bookings from './Bookings';
import Wallet from './Wallet';
import SideBar from '../../components/SideBar';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../../redux/features/userActions';
import { faGear, faBook, faWallet, faDashboard, faMessage } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"

const UserRouter = () => {
    const type = useSelector((state: RootState) => state.auth.type)

    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (type !== "user") {
            navigate("/")
            toast.error("not authorized")
        }
        else
            dispatch(userActions.userGet())
    })

    const buttons = [
        { to: "dashboard", icon: faDashboard, text: "dashboard" },
        { to: "messages", icon: faMessage, text: "messages" },
        { to: "bookings", icon: faBook, text: "bookings" },
        { to: "wallet", icon: faWallet, text: "wallet" },
        { to: "settings", icon: faGear, text: "settings" }
    ]
    return (
        <div className='flex'>
            <SideBar buttons={buttons} />
            <div className='flex items-center justify-center w-screen'>
                <Routes>
                    <Route index element={<Navigate to="/user/dashboard" />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/messages' element={<Messages />} />
                    <Route path='/bookings' element={<Bookings />} />
                    <Route path='/wallet' element={<Wallet />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes >
            </div>
        </div>
    );
};

export default UserRouter;
