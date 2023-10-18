import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const Banned = () => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("type")
        navigate("/")
    }

    return (
        <div className="h-screen w-screen flex flex-col gap-5 items-center justify-center">
            <div className="flex flex-col items-center justify-center text-red-500 font-bold text-xl">
                <p>
                    this account has been banned
                </p>
                <p>
                    for more detail please contact the admin at admin@mentoore.com
                </p>
            </div>
            <Button className="text-lg" variant={"destructive"} onClick={logout} >
                Logout
            </Button>
        </div>
    )
}

export default Banned