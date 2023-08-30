import mongoose from "mongoose";
import colors from "colors"

export default  () => {
    try{
        mongoose.connect(process.env.db as string)
        console.log(colors.cyan.bold("connected to database successfully"))
    }catch(err){
        console.log(colors.red.bold(`Database: ${err}`))
    }
}