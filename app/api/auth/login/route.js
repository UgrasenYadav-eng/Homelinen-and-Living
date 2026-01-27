
import { connectDB } from "@/lib/databaseConnection";
import { emailVerificationLink } from "@/email/emailVerificationLink";
import { otpEmail } from "@/email/otpEmail";
import { catchError, generateOTP, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import userModel from "@/models/userModel";
import { SignJWT } from "jose";
import { z } from "zod";

export async function POST(request) {
  try {
    // Connect to database
    await connectDB();

    const payload = await request.json();

    // Validate request body
    const validationSchema = zSchema
      .pick({
        email: true,
      })
      .extend({
        password: z.string(),
      });

    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalid or missing input field.",
        validatedData.error
      );
    }

    const { email, password } = validatedData.data;

    // Find user
    const getUser = await userModel
      .findOne({ deletedAt: null, email })
      .select("+password");

    if (!getUser) {
      return response(false, 400, "Invalid login credentials.");
    }

    // If email not verified, resend verification link
    if (!getUser.isEmailVerified) {
      const secret = new TextEncoder().encode(process.env.SECRET_KEY);
      const token = await new SignJWT({ userId: getUser._id.toString() })
        .setIssuedAt()
        .setExpirationTime("1h")
        .setProtectedHeader({ alg: "HS256" })
        .sign(secret);

      await sendMail(
        "Email Verification request from Homelinen & Living",
        email, emailVerificationLink(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`
        )
      );

      return response(
        false,
        401,
        "Your email is not verified. A verification link has been sent to your registered email."
      );
    }

    // Verify password
    const isPasswordVerified = await getUser.comparePassword(password);
    if (!isPasswordVerified) {
      return response(false, 400, "Invalid login credentials.");
    }

    // Generate and store OTP
    await OTPModel.deleteMany({ email }); // delete old OTPs

    const otp = generateOTP();

    // Store OTP in database
    const newOtpData = new OTPModel({
      email,
      otp,
    });

    await newOtpData.save();

    // Send OTP email
    const otpEmailStatus = await sendMail(
  "Your login verification code.",
  email,
  otpEmail(otp)
);

// Safe check for undefined or failed mail
if (!otpEmailStatus || otpEmailStatus.success === false) {
  return response(false, 400, "Something went wrong while sending OTP.");
}


    return response(true, 200, "Please verify your device using the OTP sent to your email.");
  } catch (error) {
    console.error("🔥 LOGIN ERROR:", error);
    return catchError(error);
  }
}
