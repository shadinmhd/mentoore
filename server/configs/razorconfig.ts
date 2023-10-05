import razorpay from "razorpay"

export const instance = new razorpay({
    key_id : process.env.razor_key_id as string,
    key_secret : process.env.razor_secret as string
})