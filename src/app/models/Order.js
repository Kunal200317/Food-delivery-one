import mongoose from "mongoose";

const {Schema,model} = mongoose;

const OrderSchema = new Schema({
    userEmail: {type: String,},
    order_id: {type:String,},
    phone: {type: String,},
    streetAddress: {type: String,},
    pincode: {type: String,},
    city: {type: String,},
    country: {type: String,},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    Total: {type: Number,},
    cartProduct: {type: Array,},
    paid: {type: Boolean, default: false},
   

},{Timestamps: true});

export default mongoose.models.Order || model("Order", OrderSchema);