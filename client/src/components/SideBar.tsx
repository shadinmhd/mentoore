
import { Link } from "react-router-dom"
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome"

interface Props {
    to: string,
    icon: FontAwesomeIconProps['icon'],
    text: string
}


const SideBar: React.FC<{ buttons: Props[] }> = ({ buttons }) => {
    return (
        <div className='flex gap-5 text-blue-600 bg-white flex-col h-screen shadow-lg w-fit px-5 py-10'>
            <Link to="/"
                className="text-4xl font-semibold font-sans mb">
                Mentoore
            </Link>
            {buttons.map((e, i) => {
                return <Button key={i} to={e.to} icon={e.icon} text={e.text} />
            })}
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