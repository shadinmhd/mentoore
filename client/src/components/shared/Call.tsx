import socket from "@/services/Socket"

interface Props {
    name: string,
    id: string,
    setCall: React.Dispatch<React.SetStateAction<boolean>>,
}

const Call: React.FC<Props> = ({ name, id, setCall }) => {

    const accept = () => {
        socket.emit("call:accepted", id)
        console.log("accepted")
        setCall(false)
    }

    const reject = () => {
        socket.emit("call:rejected", id)
        console.log("rejected")
        setCall(false)
    }

    return (
        <div className="w-screen fixed top-1 left-0 z-10 flex items-center justify-center">
            <div className="flex flex-col px-2 py-1 gap-1 bg-white w-1/4 border-blue-600 border-[1.5px] rounded-sm">
                <div className="text-green-500">Incoming Call</div>
                <div className="text-green-500 text-xs">{name}</div>
                <div className="flex gap-1">
                    <button className="p-1  text-xs font-semibold text-white bg-green-500 rounded-lg" onClick={accept}>accept</button>
                    <button className="p-1  text-xs font-semibold text-white bg-red-500 rounded-lg" onClick={reject}>reject</button>
                </div>
            </div>
        </div>
    )
}

export default Call