
import { Link } from "react-router-dom"
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

interface Props {
    to: string,
    icon: FontAwesomeIconProps['icon'],
    text: string
}


const SideBar: React.FC<{ buttons: Props[] }> = ({ buttons }) => {
    const [active, setActive] = useState(false)

    const handleResize = () => {
        setActive(window.innerWidth > 640);
    };
    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    return (
        <>
            {
                active &&
                <div className={`flex gap-5 text-blue-600 bg-white flex-col shadow-lg w-fit px-5 py-10 ${!active && `hidden`}`}>
                    <Link to="/"
                        className="text-4xl font-semibold font-sans mb-5">
                        Mentoore
                    </Link>
                    {buttons.map((e, i) => {
                        return <Button key={i} to={e.to} icon={e.icon} text={e.text} />
                    })}
                </div>

            }
            <button
                className="text-white sm:hidden bg-blue-600 p-1 h-[30px] flex items-center justify-center w-[30px] rounded-md fixed top-2 left-2"
                onClick={() => setActive(!active)}
            >
                <FontAwesomeIcon icon={active ? faArrowLeft : faArrowRight} />
            </button>
        </>
    )
}

interface ButtonProps {
    to: string,
    icon: FontAwesomeIconProps['icon'],
    text: string,
}

const Button: React.FC<ButtonProps> = ({ to, icon, text }) => {
    const currlocation = window.location.href.split("/").pop()

    return (
        <Link to={to} className={`${to.split("/").pop() == currlocation && "text-white bg-blue-600"} hover:text-white transition-all hover:scale-105 hover:translate-x-1 hover:bg-blue-600 rounded-lg py-2 px-4 font-semibold flex gap-2 items-center text-center`} >
            <FontAwesomeIcon icon={icon} />
            <span> {text}</span>
        </Link>
    )
}

export default SideBar