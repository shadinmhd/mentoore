import Deposit from "@/components/shared/Deposit"
import Transactions from "@/components/shared/Transactions"
import { Button } from "@/components/ui/button"
import Api from "@/services/Api"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface ITransactions {
  from: {
    name: string,
    _id: string
  },
  to: {
    name: string,
    _id: string
  },
  amount: string,
  type: string,
}


const Wallet = () => {
  const [refresh, setRefresh] = useState(0)
  const [balance, setBalance] = useState<number>()
  const [transactions, setTransactions] = useState<ITransactions[]>([])
  let id = ""

  useEffect(() => {
    (async () => {
      const { data } = await Api.get("/wallet")
      if (data.success) {
        id = data.userId
        setBalance(data.wallet.balance)
      } else {
        toast.error(data.message)
      }
    })(),
      (async () => {
        const { data } = await Api.get("/payment/transactions")
        console.log(data)
        if (data.success) {
          setTransactions(data.transactions)
        } else {
          toast.error("error fetching transaction history")
        }
      })()
  }, [refresh])

  return (
    <div className="flex flex-col items-center p-10 justify-center w-full">
      <div className="flex items-center justify-between w-full">
        <div color="text-blue-600">
          Balance: {balance}
        </div>
        <div className="flex gap-2">
          <Deposit refresh={setRefresh} ></Deposit>
          <Button>Withdraw</Button>
        </div>
      </div>
      <div className="border w-full mt-5 rounded-lg flex flex-col items-center justify-center">
        <Transactions id={id} transactions={transactions} />
      </div>
    </div>
  )
}

export default Wallet