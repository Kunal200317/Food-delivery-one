import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; 
import connectDB from "@/app/DB/cunnectDb";
import User from "@/app/models/User";
import UserInfo from "@/app/models/UserInfo";

export async function PUT(req) {
    try {
        // Update the user's profile
        await connectDB();
        const data = await req.json();
        
        // Get session using authOptions (not aouthoptions)
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const email = session.user.email;

        if (data._id) {
            // Admin updating another user
            const user = await User.findOne({_id: data._id}).lean();
            
            // Check if current user is admin
            const currentUserInfo = await UserInfo.findOne({email: email});
            if (!currentUserInfo?.admin) {
                return Response.json({ error: "Admin access required" }, { status: 403 });
            }
            
            await User.updateOne(
                {_id: data._id}, 
                {name: data.name, image: data.image}
            );
            
            await UserInfo.findOneAndUpdate(
                {email: user.email},
                { 
                    phone: data.phone, 
                    streetaddress: data.streetAddress, 
                    pincode: data.pincode, 
                    city: data.city,
                    country: data.country,
                    admin: data.admin 
                }, 
                {upsert: true, new: true}
            );
        } else {
            // User updating their own profile
            await User.updateOne(
                {email: email}, 
                {name: data.name, image: data.image}
            );
            
            await UserInfo.findOneAndUpdate(
                {email: email},
                { 
                    phone: data.phone, 
                    streetaddress: data.streetAddress, 
                    pincode: data.pincode, 
                    city: data.city,
                    country: data.country,
                    admin: data.admin || false 
                }, 
                {upsert: true, new: true}
            );
        }
        
        return Response.json({ success: true, message: "Profile updated successfully" });
        
    } catch (error) {
        console.error("Error in PUT profile:", error);
        return Response.json(
            { error: "Failed to update profile", details: error.message }, 
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        await connectDB();

        const url = new URL(req.url);
        const _id = url.searchParams.get('_id');
        
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (_id) {
            // Admin viewing another user's profile
            const currentUserInfo = await UserInfo.findOne({email: session.user.email});
            
            if (!currentUserInfo?.admin) {
                return Response.json({ error: "Admin access required" }, { status: 403 });
            }
            
            const user = await User.findOne({_id: _id}).lean();
            
            if (!user) {
                return Response.json({ error: "User not found" }, { status: 404 });
            }
            
            const userInfo = await UserInfo.findOne({email: user.email}).lean();
            
            // Remove sensitive data
            if (user.password) delete user.password;
            
            return Response.json({...user, ...userInfo});
        } else {
            // User viewing their own profile
            const user = await User.findOne({email: session.user.email}).lean();
            
            if (!user) {
                return Response.json({ error: "User not found" }, { status: 404 });
            }
            
            const userInfo = await UserInfo.findOne({email: session.user.email}).lean();
            
            // Remove sensitive data
            if (user.password) delete user.password;
            
            return Response.json({...user, ...userInfo});
        }
        
    } catch (error) {
        console.error("Error in GET profile:", error);
        return Response.json(
            { error: "Failed to fetch profile", details: error.message }, 
            { status: 500 }
        );
    }
}