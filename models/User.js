import mongoose from "mongoose"

const User = new mongoose.Schema({
    email : { type: String},
    password : {type : String}
},{
    timestamps:true
})

export default mongoose.model("User", User)