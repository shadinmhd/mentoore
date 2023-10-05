import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './admin/Dashboard'
import Category from './admin/Category'
import Users from './admin/Users'
import Mentors from './admin/Mentors'
import SideBar from '@/components/SideBar'
import {  faBoxesStacked, faChalkboardTeacher, faDashboard, faGear, faUser } from "@fortawesome/free-solid-svg-icons"
import Settings from './admin/Settings'
import Mentor from './admin/Mentor'
import User from './admin/User'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const buttons = [
    { to: "/admin", text: "Dashboard", icon: faDashboard },
    { to: "/admin/mentors", text: "Mentors", icon: faChalkboardTeacher },
    { to: "/admin/users", text: "Users", icon: faUser },
    { to: "/admin/category", text: "Categories", icon: faBoxesStacked },
    { to: "/admin/settings", text: "Settings", icon: faGear },
]

const Admin = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem("type")){
            if(localStorage.getItem("type") != "admin"){
                toast.error("you are not authorized")
                navigate("/")
            }
            
        }else{
            toast.error("please login")
            navigate("/login")
        }
    })
    return (
        <div className='flex w-screen'>
            <SideBar buttons={buttons} />
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/mentors' element={<Mentors />} />
                <Route path='/mentor/:id' element={<Mentor />} />
                <Route path='/user/:id' element={<User />} />
                <Route path='/category' element={<Category />} />
                <Route path='/users' element={<Users />} />
                <Route path='/settings' element={<Settings />} />
            </Routes>
        </div>
    )
}

export default Admin