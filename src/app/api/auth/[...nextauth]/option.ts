import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                username: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials:any): Promise<any> {
                await dbconnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { username: credentials.identifier},
                            { email: credentials.identifier}
                        ]
                    })
                    if (!user) {
                        throw new Error("User not found");
                    }
                    if (!user.isVerified) {
                        throw new Error("User not verified");
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if (isPasswordCorrect) {
                        return user;
                    }
                    else{
                        throw new Error("Invalid password");
                    }
                }
                catch (err: any) {
                    throw new Error(err);
                }
            }

        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token._isVerified = user.isVerified;
                token.username = user.username;
                token.isAcceptingMessages = user.isAcceptingMessages;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id as string;
                session.user.isVerified = token._isVerified as boolean;
                session.user.isAcceptingMessages = token.isAcceptingMessages as boolean;
                session.user.username = token.username as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
        // If NextAuth gives a callbackUrl (like ?callbackUrl=/something) respect that
        if (url.startsWith(baseUrl)) return url;

        // Fallback: always send to /dashboard
        return '/dashboard';
        },
    },
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}
