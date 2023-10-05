import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../redux/store"
import mentorActions from "../redux/features/mentorActions"
import userIcon from "../assets/user.png"
import { PuffLoader } from "react-spinners"
import moment from "moment"
import Checkout from "./Checkout"


interface bookingType {
   _id : string,
   mentor: string,
   user: string | null | undefined,
   status: string,
   date: string,
   startTime: string,
}

interface MentorsType {
   firstName: string,
   lastName: string,
   _id: string,
   image: string,
   email: string,
   category: string,
   status: string,
   description: string,
   bookings: bookingType[]
}

const Mentor = () => {

   const [mentor, setMentor] = useState<MentorsType>({
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      category: "",
      image: "",
      description: "",
      status: "",
      bookings: [],
   })

   let selectedSlot: string = mentor.bookings[0]._id
   const loading = useSelector((state: RootState) => state.mentor.loading)
   const params = useParams<{ id: string }>()
   const dispatch: AppDispatch = useDispatch()

   useEffect(() => {
      (async () => {
         const { payload } = await dispatch(mentorActions.getMentorDetails(params.id!))
         if (payload.success)
            setMentor(payload.mentor)
      })()
   }, [dispatch])

   return (
      <>
         <Checkout id={selectedSlot} />
         <div className="flex h-screen items-center mx-10 text-blue-600">
            {
               loading ?
                  <PuffLoader />
                  :
                  <div className="flex flex-col gap-5">
                     <img
                        className="w-64"
                        src={mentor.image || userIcon} alt="icon" />
                     <div className="flex flex-col">
                        <h1 className="text-xl">{mentor.firstName.split("").map((e, i) => i == 0 ? e.toUpperCase() : e).join("")} {mentor.lastName}</h1>
                        <p>{mentor.description}</p>
                        <p className="bg-blue-600 text-white w-max rounded-md px-2 py-1">{mentor.category}</p>
                        <div className="mt-5 flex flex-col gap-2">
                           <p className="text-xl">Open slots</p>
                           <div className="flex flex-col w-full items-center gap-2  text-white">
                              <div className="flex w-full items-center px-2 py-1 text-blue-600 justify-between">
                                 <p>
                                    Day
                                 </p>
                                 <p>
                                    Time
                                 </p>
                                 <div></div>
                              </div>
                              {
                                 mentor.bookings.map((e, i) =>
                                    <div key={i} className="flex w-full items-center px-3 py-1 bg-blue-600 justify-between">
                                       <p>
                                          {moment(e.date).format("DD/MM/YY")}
                                       </p>
                                       <p>
                                          {moment(e.startTime).format("HH:mm")}
                                       </p>
                                       <button className="rounded-lg bg-white text-blue-600 px-2 py-1">
                                          Book
                                       </button>
                                    </div>
                                 )
                              }
                           </div>
                        </div>
                     </div>
                  </div>
            }
         </div>
      </>
   )
}

export default Mentor