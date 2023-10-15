import Api from "@/services/Api"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface IUser {
  _id: string,
  name: string
}

interface IMessage {
  content: string,
  sender: IUser
}

const Dashboard = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [wallet,setWallet] = useState({
    balance : ""
  })

  useEffect(() => {
    (async () => {
      const { data } = await Api.get("/dash/student")
      if (data.success) {
        console.log(data)
        setMessages(data.messages)
        setWallet(data.wallet)
      } else {
        toast.error(data.message)
      }
    })()
  }, [])

  return (
    <div className="flex gap-2 p-5 text-white">
      <div className="flex flex-col items-center justify-center p-2 bg-blue-500 rounded-md">
        <div className="self-start font-semibold">Wallet</div>
        <div>
          balance: {wallet.balance}
        </div>
        <div>

        </div>
      </div>
      <div className="flex flex-col p-2 bg-blue-500 rounded-md justify-center items-center">
        <div className="self-start font-semibold">
          Messages
        </div>
        <div>
          {
            messages.length != 0 ?
              messages.map((e, i) => (
                <div key={i}>
                  {e.sender.name}:{e.content}
                </div>
              ))
              :
              "No messages"
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard