import connectDB from "@/app/DB/cunnectDb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Order from "@/app/models/Order";
import Razorpay from 'razorpay';
export async function POST(req) {
    // Create a new document
    await connectDB();
    const data = await req.json();
    const session = await getServerSession(authOptions)
    const UserEmail = session?.user?.email;
    const { phone, streetAddress, pincode, city, country, Total, cartProduct } = data;

    var instance = new Razorpay({ key_id: 'rzp_test_YlsIMKyGXhS3ih', key_secret: 'IJM0eHFmjmdOLpxaT3e1S7Vi' })

    const options = {
        amount: Number.parseInt(Total * 100),
        currency: "INR",
    }

    let razorpayOrder = await instance.orders.create(options);

    const newOrder = await Order.create({
        userEmail: UserEmail,
        order_id: razorpayOrder.id,
        phone,
        streetAddress,
        pincode,
        city,
        country,
        Total,
        cartProduct,
    });

    return Response.json(razorpayOrder);
}