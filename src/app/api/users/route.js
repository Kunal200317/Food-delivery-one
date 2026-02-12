import User from "@/app/models/User";
import connectDB from "@/app/DB/cunnectDb";
import { isAdmin } from "../auth/[...nextauth]/route";
export async function GET() {
      // Get all documents
      await connectDB();
      if (await isAdmin()) {
      const users = await User.find({});
       return Response.json(users);  
      }
      else{
       return Response.json({message : "not admin"});  
      }
     
}