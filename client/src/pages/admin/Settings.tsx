import ResetPassword from "@/components/shared/ResetPassword"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const Settings = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("type")
        navigate("/")
    }

    return (
        <div className="flex items-center gap-2 flex-col justify-center w-full">
            <div className="flex flex-col gap-2">
                <ResetPassword />
                <Button onClick={handleClick} variant="destructive">
                    logout
                </Button>
            </div>
        </div>
    )
}

export default Settings