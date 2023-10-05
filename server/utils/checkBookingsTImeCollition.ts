import moment from "moment"
import bookingModel from "../models/slotModel"

export const checkBookingsTimeCollition = async (startTime: string) => {
    const allBookings = await bookingModel.find({})
    let collision = true

    allBookings.map((e) => {
        let diff = Math.abs(moment(e.startTime).diff(startTime, "minutes"))
        console.log(diff)
        if (diff < 1) {
            collision = false;
        }
    })

    return collision
}