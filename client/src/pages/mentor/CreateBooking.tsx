import SubmitButton from "../../components/form/SubmitButton";
import { useState } from "react";
import moment, { Moment } from "moment";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import mentorActions from "../../redux/features/mentorActions";
import { toast } from "react-toastify";

interface Props {
    setCreateBooking: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateBooking: React.FC<Props> = ({ setCreateBooking }) => {
    const bookings = useSelector((state: RootState) => state.mentor.mentor.bookings)
    const [booking, setBooking] = useState({
        date: moment(),
        startTime: moment(),
    });

    const dispatch: AppDispatch = useDispatch()



    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target
        setBooking((prevBooking) => ({
            ...prevBooking,
            [name]: moment(value, name == "date" ? "YYYY-MM-DD" : "HH:mm")
        }));
    };

    const checkTimeConflict = (): boolean => {
        let result = true
        for (let i = 0; i < bookings.length; i++) {
            let diff = (Math.abs(moment(bookings[i].startTime).diff(booking.startTime, "minute")))
            console.log(diff)
            console.log(moment(bookings[i].date).isSame(booking.date, "date"))
            if (moment(bookings[i].date).isSame(booking.date, "date")) {
                if (diff < 65) {
                    toast.error("please have 5min between sessions")
                    result = false
                    break
                } else {
                    result = true
                }
            } else {
                result = true
            }
        }

        return result
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { date, startTime } = booking;
        if (!moment(date).isValid() || !moment(startTime).isValid()) {
            return;
        }
        const formdata = {
            date: booking.date.format(),
            startTime: booking.startTime.format(),
        }
        let conflict = checkTimeConflict()
        if (conflict!) {
            dispatch(mentorActions.createBooking(formdata))
            setCreateBooking(false)
        } else {
            setCreateBooking(false)
        }
    };

    const cancelHandler = () => {
        setCreateBooking(false);
    };

    return (
        <div className="w-screen h-screen bg-white bg-opacity-50 fixed top-0 left-0 flex items-center justify-center">
            <form onSubmit={submitHandler} className="bg-white flex flex-col items-center shadow-black shadow-lg p-10 gap-5" id="create-booking-form">
                <label className="font-semibold text-blue-600 text-2xl">New Booking</label>
                <div>
                    <label htmlFor="date">date: </label>
                    <input onChange={changeHandler} id="date" className="border-blue-600 border rounded-lg px-2 py-1 placeholder:text-blue-600 hover:outline-none" placeholder="date" name="date" type="date" />
                </div>
                <div>
                    <label htmlFor="startTime">start time: </label>
                    <input onChange={changeHandler} id="startTime" className="border-blue-600 border rounded-lg px-2 py-1 placeholder:text-blue-600 hover:outline-none" placeholder="start time" name="startTime" type="time" />
                </div>
                <p className="text-gray-500 font-regular text-sm flex flex-col">
                    <span>
                        Don't forget add some break between sessons.
                    </span>
                    <span>
                        In this version of this app we only support 1 hour sessions.
                    </span>
                </p>
                <SubmitButton text="create" />
                <button className="" onClick={cancelHandler}>
                    cancel
                </button>
            </form>
        </div>
    )
}

export default CreateBooking;
