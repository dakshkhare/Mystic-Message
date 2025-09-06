import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import {User} from "next-auth";
import mongoose, { mongo } from "mongoose";

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


    const userId = new mongoose.Types.ObjectId(user._id);
    try {
        const user = await UserModel.aggregate([
            {
                $match: {
                    _id: userId
                }
            },
            {$unwind: '$messages'},
            {$sort: {'messages.createdAt': -1}},
            {$group: {
                _id: '$_id', messages: {$push: '$messages'}
            }},
        ]);

        if(!user || user.length === 0) {
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
                messages: user[0].messages 
            }, 
            { status: 200 }
        );
    } catch (error) {
        console.log("Error fetching messages", error);
        return Response.json(
            { 
                success: false, 
                error: "Failed to fetch messages" 
            }, 
            { status: 500 }
        );
    }

}