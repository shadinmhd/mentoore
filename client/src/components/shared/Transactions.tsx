import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

interface Transactions {
    from: {name : string, _id : string},
    to: {name : string, _id : string},
    amount: string,
    type: string,
}

interface Props {
    transactions: Transactions[],
    id : string
}

const Transactions: React.FC<Props> = ({ transactions }) => {

    return (
        <div className='flex flex-col items-center w-full'>
            <div className="font-sans text-xl font-bold p-2">Transactions</div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>from</TableHead>
                        <TableHead>to</TableHead>
                        <TableHead>amount</TableHead>
                        <TableHead>type</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions &&
                        transactions.map((e, i) => (
                            <TableRow className={"text-blue-600"} key={i}>
                                {e.from == e.to ?
                                    <>
                                        <TableCell>you</TableCell>
                                        <TableCell>you</TableCell>
                                    </>
                                    :
                                    <>
                                        <TableCell>{e.from.name}</TableCell>
                                        <TableCell>{e.to.name}</TableCell>
                                    </>
                                }
                                <TableCell>{e.amount}</TableCell>
                                <TableCell>{e.type}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default Transactions