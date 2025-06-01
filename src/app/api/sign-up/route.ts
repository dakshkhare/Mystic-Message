
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcrypt";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {

    try {
        const { username, email, password } = await request.json();

        const existingUserVerifiedByUsername = await UserModel.findOne({ username, isVerified: true });
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username already exists."
            }, { status: 400 });
        }


        const existingUserByEmail = await UserModel.findOne({ email})

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if( existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "Email already exists and is verified."
                }, { status: 400 });
            } else{
                // Update existing user with new password and verification code
                const hashedPassword = await bcrypt.hash(password, 10);

                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);

                await existingUserByEmail.save();
            }
        }

        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            });
            await newUser.save();
        }

        //send verification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 });
        }

        return Response.json({
            success: true,
            message: 'Sign-up successful. Please check your email for the verification code.',
            }, { status: 201 });
        }


      catch (error) {
        console.error('Error during sign-up:', error);
        return new Response(JSON.stringify({
            success: false,
            message: 'An error occurred during sign-up.'
        }), { status: 500 });
    }
}
// This code handles the sign-up process, including user creation, password hashing, and sending a verification email.
// It checks for existing users by username and email, and updates the user if they already exist but are not verified.
// The code uses bcrypt for password hashing and a helper function to send the verification email.
// It returns appropriate responses based on the success or failure of each operation, ensuring a smooth user experience during sign-up.
// The code also includes error handling to catch any issues that may arise during the sign-up process, ensuring that the user receives feedback on the success or failure of their sign-up attempt.
// The code is structured to be used in a Next.js API route, allowing it to handle HTTP POST requests for user sign-up.