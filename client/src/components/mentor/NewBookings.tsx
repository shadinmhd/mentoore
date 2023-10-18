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
import Api from "@/services/Api"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import moment from "moment"
import "react-time-picker/dist/TimePicker.css"
import { Input } from "../ui/input"

interface Props {
	refresh: React.Dispatch<React.SetStateAction<number>>
}

const NewBooking: React.FC<Props> = ({ refresh }) => {
	const [date, setDate] = useState<Date | undefined>(new Date())
	const [time, setTime] = useState(moment())

	const handleSubmit = async () => {
		const { data } = await Api.post("/slot", { startTime: time.format(), date: moment(date).format() })
		if (data.success) {
			toast.success("booking created successfully")
			refresh((e) => e + 1)
		} else {
			toast.error(data.message)
		}
	}

	const handleSelectTime = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		setTime(moment(e.target.value, "HH:mm"))
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					<FontAwesomeIcon className="text-green-600" icon={faPlus} />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>New Booking</DialogTitle>
					<DialogDescription>
						Create a new Booking, current version of the app only support 1 hour sessions
					</DialogDescription>
				</DialogHeader>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={cn(
								"w-[280px] justify-start text-left font-normal",
								!date && "text-muted-foreground"
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{date ? moment(date).format("yyyy/MM/DD") : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p	-0">
						<div className="felx flex-col">
							<Calendar
								mode="single"
								selected={date}
								onSelect={setDate}
								initialFocus
							/>
						</div>
					</PopoverContent>
				</Popover>
				<div className="w-[280px] p-0">
					<div className="felx flex-col">
						<Input
							type="time"
							value={time.format("HH:mm")}
							onChange={handleSelectTime}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={handleSubmit} type="submit">Create</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default NewBooking
