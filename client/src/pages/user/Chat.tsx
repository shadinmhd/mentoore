import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import socketio from "socket.io-client"

const ENDPOINT = "http://localhost:8000"
const socket = socketio(ENDPOINT, { transports: ["websocket"] })

const Chat = () => {

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected")
    })
  }, [])

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex p-5 gap-2 border w-full h-full border-black">
        <div className="flex border-blue-600 border flex-col w-1/3">
          <div className="border border-blue-600">shadin</div>
          <div className="border border-blue-600">shabab</div>
          <div className="border border-blue-600">faris</div>
        </div>
        <div className="flex gap-2 flex-col w-full">
          <div className="w-full h-full border border-blue-600">

          </div>
          <div className="flex gap-2">
            <Input placeholder="Enter message" />
            <Button>
              <FontAwesomeIcon
                className="w-full hover:translate-x-1 hover:-translate-y-1 transition-all"
                icon={faPaperPlane} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat