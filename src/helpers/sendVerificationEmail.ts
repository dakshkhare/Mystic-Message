import {resend} from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse<null>> {
  try {

    await resend.emails.send({
      from: 'oboarding@resend.dev',
      to: email,
      subject: 'Mystery message | Verification Code',
      react: VerificationEmail({
        username,
        otp: verifyCode,}),
    });
    return {
      success: true,
      message: 'Verification email sent successfully.',
    }
  }
  catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return {
      success: false,
      message: 'Failed to send verification email.',
    }
  }
}