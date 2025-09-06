import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    // Connect to database first
    try {
        await dbConnect();
    } catch (dbError) {
        console.error('Database connection error:', dbError);
        return Response.json({
            success: false,
            message: 'Database connection failed'
        }, { status: 500 });
    }

    try {
        const { username, email, password } = await request.json();

        // Validate required fields
        if (!username || !email || !password) {
            return Response.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 });
        }

        // Check if username already exists and is verified
        const existingUserVerifiedByUsername = await UserModel.findOne({ 
            username, 
            isVerified: true 
        });

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username already exists."
            }, { status: 400 });
        }

        // Check if user exists by email
        const existingUserByEmail = await UserModel.findOne({ email });

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "Email already exists and is verified."
                }, { status: 400 });
            } else {
                // Update existing unverified user with new password and verification code
                const hashedPassword = await bcrypt.hash(password, 10);

                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

                await existingUserByEmail.save();
            }
        } else {
            // Create new user
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

        // Send verification email
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

    } catch (error) {
        console.error('Error during sign-up:', error);
        return Response.json({
            success: false,
            message: 'An error occurred during sign-up.'
        }, { status: 500 });
    }
}