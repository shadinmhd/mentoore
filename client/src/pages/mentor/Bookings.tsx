import React, { useEffect, useState } from "react";
import Select from "../../components/form/Select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { PuffLoader } from "react-spinners";
import mentorActions from "../../redux/features/mentorActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateBooking from "./CreateBooking";
import moment from "moment";

interface bookingType {
  mentor: string,
  user: string | null | undefined,
  status: string,
  date: string,
  startTime: string,
  endTime: string
}

const Bookings = () => {
  const [filteredBookings, setFilteredBookings] = useState<Array<bookingType>>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("status");
  const [newBooking, setNewBookings] = useState(false)

  const loading = useSelector((state: RootState) => state.mentor.loading);
  const mentor = useSelector((state: RootState) => state.mentor.mentor);

  const dispatch: AppDispatch = useDispatch();
  const status = [{ name: "open" }, { name: "pending" }, { name: "booked" }, { name: "completed" }, { name: "cancelled" }]


  useEffect(() => {
    dispatch(mentorActions.getAllBookings())
  }, [dispatch, newBooking]);

  useEffect(() => {
    filterBookings(selectedStatus);
  }, [search, selectedStatus, mentor.bookings]);

  const filterBookings = (status: string) => {
    const bookings = mentor.bookings.filter(
      (booking) =>
        (status === "status" || booking.status === status)
    );
    setFilteredBookings(bookings);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <>

      <div className={`h-screen w-full px-10 pt-20 flex flex-col gap-5 ${loading && "items-center justify-center"}`}>
        {loading ? (
          <PuffLoader color="#2563eb" />
        ) : (
          <>
            {
              newBooking && <CreateBooking setCreateBooking={setNewBookings} />
            }
            <div className="flex flex-col gap-5">
              <div className="flex gap-2">
                <input
                  className="w-fit focus:outline-blue-700 border-[1.4px] rounded-md border-blue-500 px-2 py-1 text-blue-600"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search by name"
                  type="text"
                />
                <Select
                  className="w-44"
                  value={selectedStatus}
                  defaultValue="status"
                  onchange={handleStatusChange}
                  options={status}
                  name="status"
                />
                <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); setNewBookings(true) }} className="flex gap-2 items-center text-white bg-blue-600 rounded-lg px-2">
                  add
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="flex flex-col gap-2 px-5">
                <div className="text-blue-600 text-xl font-bold flex justify-between">
                  <div className="w-full text-center">user</div>
                  <div className="w-full text-center">date</div>
                  <div className="w-full text-center">starting time</div>
                  <div className="w-full text-center">endt time</div>
                  <div className="w-full text-center">status</div>
                </div>
                {
                  filteredBookings.map((booking, index) => (
                    <div className="{text-blue-600} flex justify-between text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg p-2 transition-all hover:scale-105 hover:p-3 cursor-pointer" key={index}>
                      <div className={`${booking.user ? "" : "text-red-500"} w-full`}>{booking.user || "no booked yet"}</div>
                      <div className="text-center w-full">{(moment(booking.date).format("MM-DD"))}</div>
                      <div className="text-center w-full">{(moment(booking.startTime).format("HH:mm:ss"))}</div>
                      <div className="text-center w-full">{(moment(booking.endTime).format("HH:mm:ss"))}</div>
                      <div className="text-center w-full">{booking.status}</div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Bookings;