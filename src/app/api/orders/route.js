import connectDB from "@/app/DB/cunnectDb";
import Order from "@/app/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import UserInfo from "@/app/models/UserInfo";
export async function GET(req){
    await connectDB()

    const session =await getServerSession(authOptions)
    let UserEmail = session?.user?.email;

    let isAdmin= false;

    let url = new URL(req.url)
    let order_id = url.searchParams.get('_id')

    if (order_id) {
        return Response.json(await Order.find({order_id:order_id}))
    }
  
    if (UserEmail) {
        let userinfo = await UserInfo.findOne({email:UserEmail})
        if (userinfo) {
            isAdmin = userinfo.admin
        }
        
    }
  
    if (isAdmin) {
        return Response.json(await Order.find({}))
    }

    if (UserEmail) {
        return Response.json(await Order.find({userEmail:UserEmail}))
    }

   

   

}