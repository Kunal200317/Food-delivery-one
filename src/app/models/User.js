
import mongoose from "mongoose";


const {Schema,model} = mongoose;

const UserSchema = new Schema({
    name:{type: String,},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: false},
    image: {type: String}, 
});





export default  mongoose.models.User || model("User", UserSchema);