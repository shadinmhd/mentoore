import Chat from "@/components/shared/Chat"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UserContext from "@/context/UserContext"
import Api from "@/services/Api"
import socket from "@/services/Socket"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"
import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"


interface IMentor {
  _id: string,
  name: string
}

interface IMessage {
  reciever: string,
  sender: string,
  content: string,
  time: string
}

const Messages = () => {
  const [users, setUsers] = useState<IMentor[]>([])
  const [current, setCurrent] = useState("")
  const [messages, setMessages] = useState<Set<IMessage>>(new Set())
  const [content, setContent] = useState("")
  const user = useContext(UserContext)

  useEffect(() => {
    (async () => {
      const { data } = await Api.get("/message/conversations")
      if (data.success) {
        console.log(data.users)
        setUsers(data.users)
      } else {
        toast.error(data.message)
      }
    })();

    socket.on("msg:get", ({ reciever, sender, content, time }) => {
      try {
        console.log({ reciever, sender, content, time })
        setMessages((prev) => new Set([...prev, { reciever, sender, content, time }]))
        
      } catch (error) {
        console.log(error)
      }
    })
  }, [])

  useEffect(() => {
    (async () => {
      if (current) {
        const { data } = await Api.get(`/message/messages/${current}`)
        if (data.success) {
          console.log(data.messages)
          setMessages(data.messages)
        } else {
          toast.error(data.message)
        }
      }
    })()
  }, [current])


  const sendMessage = async () => {
    try {
      const message = {
        sender: user?.user._id!,
        reciever: current,
        content,
        time: moment().toString()
      }
      setMessages((prev) => new Set([...prev, message]))
      socket.emit("msg:send", message)
      setContent("")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex items-center justify-center w-full p-3 h-screen max-h-screen">
      <div className="flex gap-2 w-full h-full">
        <div className="flex w-1/4 border-blue-600 border flex-col items-center p-2">
          {
            users.map((e, i) => (
              <Button key={i}
                className="w-full"
                onClick={() => setCurrent(e?._id)}>
                {e?.name?.split(" ")[0]}
              </Button>
            ))
          }
        </div>
        <div className="flex gap-2 flex-col justify-between w-full h-full ">
          <div className="w-full h-5/6 border border-blue-600">
            <Chat current={current} messages={messages} />
          </div>
          <div className="flex gap-2 h-1/6">
            <Input
              disabled={!current}
              className="w-full"
              onKeyDownCapture={(e) => e.code == "Enter" && sendMessage()}
              value={content}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setContent(e.target.value)
              }}
              placeholder="Enter message" />
            <div className="flex">
              <Button disabled={!current || !content} onClick={sendMessage}>
                <FontAwesomeIcon
                  className="w-full hover:translate-x-1 hover:-translate-y-1 transition-all"
                  icon={faPaperPlane} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages