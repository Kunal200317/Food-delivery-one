
import mongoose from "mongoose";


const {Schema,model} = mongoose;

const UserInfoSchema = new Schema({
    email: {type: String, required: true,},
    phone: {type: String},
    streetaddress: {type: String},
    pincode: {type: String},
    city: {type: String},
    country: {type: String},
    admin: {type: Boolean, default: false},
}, {timestamps: true});





export default  mongoose.models.UserInfo || model("UserInfo", UserInfoSchema);