import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import {User} from "next-auth";

export async function POST(request: Request) {
    await dbConnect();

    const session= await getServerSession(authOptions)
    const user:User = session?.user as User;

    if(!session || !session.user) {
        return Response.json(
            { 
                success: false, 
                error: "Unauthorized" 
            }, 
            { status: 401 }
        );
    }

    const userId = user._id
    const {acceptMessages} = await request.json();

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId, 
            { isAcceptingMessages: acceptMessages }, 
            { new: true }
        );
        if(!updatedUser) {
            return Response.json(
                { 
                    success: false, 
                    error: "User not found" 
                }, 
                { status: 404 }
            );
        }

        return Response.json(
            { 
                success: true, 
                message: "User status updated successfully", 
                user: updatedUser 
            }, 
            { status: 200 }
        );
    } catch (error) {
        console.log("Error accepting messages");
        return Response.json(
            { 
                success: false, 
                error: "Failed to update user status to accept messages" 
            }, 
            { status: 500 }
        );
    }
        
    }
export async function GET(request: Request) {
    await dbConnect();

    const session= await getServerSession(authOptions)
    const user:User = session?.user as User;

    if(!session || !session.user) {
        return Response.json(
            { 
                success: false, 
                error: "Unauthorized" 
            }, 
            { status: 401 }
        );
    }

    const userId = user._id

    try {
        const updatedUser = await UserModel.findById(userId);
        if(!updatedUser) {
            return Response.json(
                { 
                    success: false, 
                    error: "User not found" 
                }, 
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true, 
                user: updatedUser 
            },
            { status: 200 }
        );
    } catch (error) {
        console.log("Error fetching user status");
        return Response.json(
            { 
                success: false, 
                error: "Failed to fetch user status" 
            },
            { status: 500 }
        );
    }
}



    

