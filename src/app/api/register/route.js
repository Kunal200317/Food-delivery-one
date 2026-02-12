import connectDB from "@/app/DB/cunnectDb";
import User from "@/app/models/User";
export async function POST(req) {
    await connectDB();
    const body = await req.json();
    console.log(body);
    // Create a new document
   const createduser = await User.create(body);

   return Response.json(createduser);
}