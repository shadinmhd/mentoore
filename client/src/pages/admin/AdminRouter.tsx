import SideBar from '../../components/SideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Messages from './Messages';
import Bookings from './Bookings';
import Settings from './Settings';
import Transactions from './Transactions';
import { faBook, faDashboard, faGear, faMessage, faWallet, faExchange } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import adminActions from '../../redux/features/adminActions';

const AdminRouter = () => {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(adminActions.adminGet())
    })
    const buttons = [
        { to: "dashboard", icon: faDashboard, text: "dashboard" },
        { to: "messages", icon: faMessage, text: "messages" },
        { to: "bookings", icon: faBook, text: "bookings" },
        { to: "wallet", icon: faWallet, text: "wallet" },
        { to: "transaction", icon: faExchange, text: "transactions" },
        { to: "settings", icon: faGear, text: "settings" }
    ]
    return (
        <div className='flex'>
            <SideBar buttons={buttons} />
            <div className='flex items-center justify-center w-screen'>
                <Routes>
                    <Route index element={<Navigate to="/admin/dashboard" />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/messages' element={<Messages />} />
                    <Route path='/bookings' element={<Bookings />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/transcations' element={<Transactions />} />
                </Routes >
            </div>
        </div>
    );
};


export default AdminRouter