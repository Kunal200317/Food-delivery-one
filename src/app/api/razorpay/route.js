import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDB from "@/app/DB/cunnectDb";
import Order from "@/app/models/Order";
export async function POST(req) {
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)

    let p = await Order.findOne({ order_id: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({ success: false, message: "Order id is not found" });
    }

    let verified = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, 'IJM0eHFmjmdOLpxaT3e1S7Vi');

    //update the payment
    if (verified) {
        const updatedPayment = await Order.findOneAndUpdate({ order_id: body.razorpay_order_id }, { paid: "true" }, { new: true })
        return NextResponse.redirect(`https://food-delivery-one-nine.vercel.app/order/${body.razorpay_order_id}?paymentdone=true`);
    }
    else {
        return NextResponse.redirect(`https://food-delivery-one-nine.vercel.app/cart?paymentdone=false`);
    }
}