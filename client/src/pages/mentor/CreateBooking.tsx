import SubmitButton from "../../components/form/SubmitButton";
import { useState } from "react";
import moment from "moment";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import mentorActions from "../../redux/features/mentorActions";

interface Props {
    setCreateBooking: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateBooking: React.FC<Props> = ({ setCreateBooking }) => {

    const [booking, setBooking] = useState({
        date: moment(),
        startTime: moment(),
        endTime: moment()
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

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { date, startTime } = booking;
        if (!moment(date).isValid() || !moment(startTime).isValid()) {
            return;
        }
        setBooking((prevBooking) => ({ ...prevBooking, endTime: startTime.clone().add(1, "hour") }))
        const formdata = {
            date: booking.date.format(),
            startTime: booking.startTime.format(),
            endTime: booking.endTime.format()
        }
        dispatch(mentorActions.createBooking(formdata))
        setCreateBooking(false)
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
                <SubmitButton text="create" />
                <button className="" onClick={cancelHandler}>
                    cancel
                </button>
            </form>
        </div>
    )
}

export default CreateBooking;
