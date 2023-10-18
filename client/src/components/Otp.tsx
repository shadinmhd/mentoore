import { useEffect, useRef, useState } from "react"
import { Input } from "./ui/input"
import Api from "@/services/Api"
import { toast } from "react-toastify"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

const Otp = () => {
  const [otp, setOtp] = useState("")
  const [active, setActive] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("token")) {
        const { data: { verified } } = await Api.get("/otp/status")
        if (verified)
          navigate("/")
        const { data } = await Api.get("/otp")
        if (data.success) {
          toast.success("otp send successfully check your email")
        } else {
          toast.error(data.message)
        }
      }else{
        navigate("/")
      }
    })()
  }, [])

  useEffect(() => {
    if (otp.length != 6) {
      console.log(otp.length)
      inputRef.current!.style.outlineColor = "red"
      setActive(false)
    } else {
      setActive(true)
      inputRef.current!.style.outlineColor = "blue"
    }
  }, [otp])

  const verify = async () => {
    console.log(otp)
    const { data } = await Api.post("/otp", { otp })
    if (data.success) {
      toast.success(data.message)
      navigate("/")
    } else {
      toast.error(data.message)
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="rounded-lg gap-5 border-blue-600 border-[1px] shadow-md p-5 flex flex-col items-center justify-center">
        <span className="text-xl text-center font-semibold w-full">
          Verify Otp
        </span>
        <p className="text-gray-500 text-sm">
          Please verify your account with otp
        </p>
        <Input
          ref={inputRef}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
          placeholder="Otp"
          type="text"
          name="otp"
        />
        <Button disabled={!active} onClick={verify}>
          Verify
        </Button>
      </div>
    </div>
  )
}

export default Otp