
import { Link } from "react-router-dom"
import { faGear, faBook, faMessage, faDashboard, faPerson } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome"

const SideBar = () => {
    return (
        <div className='flex gap-5 text-blue-600 bg-white flex-col h-screen shadow-lg w-fit px-5 py-10'>
            <Link to="/"
                className="text-4xl font-semibold font-sans mb">
                Mentoore
            </Link>
            <Button to="/user/dashboard" icon={faDashboard} text="dashboard" />
            <Button to="/user/messages" icon={faMessage} text="messages" />
            <Button to="/user/mentors" icon={faPerson} text="mentors" />
            <Button to="/user/bookings" icon={faBook} text="bookings" />
            <Button to="/user/settings" icon={faGear} text="settings" />
        </div>
    )
}

interface ButtonProps {
    to: string,
    icon: FontAwesomeIconProps['icon'],
    text: string
}

const Button: React.FC<ButtonProps> = ({ to, icon, text }) => {
    return (
        <Link to={to} className="hover:text-white transition-all hover:bg-blue-600 rounded-lg py-2 px-4 font-semibold flex gap-2 items-center text-center" >
            <FontAwesomeIcon icon={icon} />
            <span> {text}</span>
        </Link>
    )
}

export default SideBar