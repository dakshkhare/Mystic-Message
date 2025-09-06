import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import {z} from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { ca } from "zod/v4/locales";
import { decode } from "punycode";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const {username, code} = await request.json();

        const decodeUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({ username: decodeUsername });
        if (!user) {
            return Response.json(
                { 
                    success: false, 
                    error: "User not found" 
                }, 
                { status: 500 }
            );
        }

        const isCodeValid = user.verifyCode === code 
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if(isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save();

            return Response.json(
                { 
                    success: true, 
                    message: "Username verified successfully" 
                }, 
                { status: 200 }
            );
        } else if(!isCodeNotExpired){
            return Response.json(
                { 
                    success: false, 
                    error: "Verification code has expired" 
                }, 
                { status: 400 }
            );
        } else {
            return Response.json(
                { 
                    success: false, 
                    error: "Invalid verification code" 
                }, 
                { status: 400 }
            );
        }
    }
    catch (error) {
        console.error("Error verifying username", error);
        return Response.json(
            { 
                success: false,
                error: "Internal Server Error" 
            }, 
            { status: 500 }
        );
    }
}