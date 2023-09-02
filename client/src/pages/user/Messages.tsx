import { useEffect } from "react"

const Messages: React.FC = () => {
    useEffect(() => {
        console.log("messaging")
    })
    return (
        <div>
            Messages
        </div>
    )
}

export default Messages