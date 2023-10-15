import moment from "moment"

interface IMessages {
    sender: string,
    reciever: string,
    time: string,
    content: string
}

interface Props {
    messages: Set<IMessages>,
    current: string
}

const Chat: React.FC<Props> = ({ messages, current }) => {
    return (
        <div className="flex flex-col min-h-full p-2 w-full  h-full max-h-screen justify-end gap-2 overflow-auto scroll-smooth">
            {
                current ?
                    [...messages].map((e, i) => (
                        <div key={i} className={`flex items-center justify-center ${current == e.sender ? "self-start" : "self-end"}`}>
                            <div className={`bg-blue-600 p-1 rounded-sm `} key={i}>
                                {e.content}
                            </div>
                            <div className="text-xs">
                                {moment(e.time).format("MM-dd HH:mm")}
                            </div>
                        </div>
                    ))
                    :
                    <div className="w-full  h-full flex items-center justify-center">
                        Select a chat
                    </div>
            }
        </div>
    )
}

export default Chat