import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Api from "@/services/Api"
import { faArrowDown, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { toast } from "react-toastify"

interface Props {
    refresh: React.Dispatch<React.SetStateAction<number>>
}

const Deposit: React.FC<Props> = ({ refresh }) => {
    const [amount, setAmount] = useState("")

    const handleCHange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setAmount(e.target.value)
    }


    const handleCheckout = async () => {

        const { data: { order } } = await Api.post("/payment/checkout", {
            amount
        })

        const { data: { key } } = await Api.get("/payment/key")


        const options = {
            "key": key, // Enter the Key ID generated from the Dashboard
            "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Mentoore", //your business name
            "description": "Deposit",
            "image": "https://example.com/your_logo",
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response: any) {
                const { data } = await Api.post("/payment/verify", { ...response, amount})
                if (data.success) {
                    toast.success(data.message)
                    refresh((e) => e + 1)
                } else {
                    toast.error(data.message)
                }
            },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        //@ts-ignore
        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response: any) {
            toast.error(response.error.reason);
        });
        rzp1.open()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex gap-1">
                    <FontAwesomeIcon className="text-white" icon={faArrowDown} />
                    <div>
                        Deposit
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Deposit</DialogTitle>
                    <DialogDescription>
                        Enter amount to deposit
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Amount
                        </Label>
                        <Input
                            id="name"
                            defaultValue=""
                            placeholder="Enter amount"
                            className="col-span-3"
                            onChange={handleCHange}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleCheckout} type="submit">Deposit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Deposit