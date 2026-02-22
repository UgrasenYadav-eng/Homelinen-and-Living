import { emailVerificationLink } from "../../../../email/emailVerificationLink";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { z } from "zod";
import userModel from "@/models/userModel";

import { SignJWT } from "jose";

export async function POST(request) {
  try {
    await connectDB();

    const validationSchema = z.object({
      name: z.string(),
      mobile: z.string().optional().or(z.literal("")),
      email: z.string().email(),
      password: z.string(),
    });

    const payload = await request.json();
    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(false, 401, "Invalid request data", validatedData.error);
    }

    const { name, email, mobile, password } = validatedData.data;

    const checkUser = await userModel.exists({ email });
    if (checkUser) {
  return response(false, 409, "An user already registered with this email");
}

    const newRegistration = new userModel({
      name,
      mobile,
      email,
      password,
    });

    await newRegistration.save();

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({ userId: newRegistration._id.toString() })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    try {
      await sendMail(
  "Email Verification From Homelinen & Living", // ✅ subject
  email,                                        // ✅ receiver
  emailVerificationLink(
  `${
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
  }/auth/verify-email/${token}`
)
);

    } catch (mailError) {
      console.error("Email sending failed:", mailError);
    }

    return response(
      true,
      201,
      "User registered successfully. Please open the registered email id and verify the email."
    );
  } catch (error) {
  console.error("REGISTER ERROR:", error);
  return response(false, 500, "Internal Server Error", error.message);
}
}



// import { emailVerificationLink } from "../../../../email/emailVerificationLink";
// import { connectDB } from "@/lib/databaseConnection";
// import { catchError, response } from "@/lib/helperFunction";
// import { sendMail } from "@/lib/sendMail";
// import { z } from "zod";
// // import { zSchema } from "@/lib/zodSchema";
// import userModel from "@/models/userModel";
// import { SignJWT } from "jose";

// // ✅ POST route
// export async function POST(request) {
//   try {
//     // ✅ uncommented try block to properly handle errors
//     await connectDB(); // ✅ Database connection

//     const validationSchema = z.object({
//       name: z.string(),
//       /* mobile: z.string(), */ mobile: z.string().optional().or(z.literal("")),
//       email: z.string().email(),

//       password: z.string(),
//     });

//     const payload = await request.json(); // ✅ Parse JSON body
//     const validatedData = validationSchema.safeParse(payload);

//     if (!validatedData.success) {
//       return response(false, 401, "Invalid request data", validatedData.error);
//     }

//     const { name, email, mobile, password } = validatedData.data;

//     // ✅ Check if user already exists
//     const checkUser = await userModel.exists({ email });
//     if (checkUser) {
//       return response(true, 409, "An user already registered with this email");
//     }

//     // ✅ Create new user
//     const newRegistration = new userModel({
//       name,
//       mobile,
//       email,
//       password,
//     });
//     await newRegistration.save();

//     // ✅ JWT Token creation
//     // ❌ Remove this
//     const secret = new TextEncoder().encode(process.env.SECRET_KEY);
//     const token = await new SignJWT({ userId: newRegistration._id.toString() })
//       .setIssuedAt()
//       .setExpirationTime("1h")
//       .setProtectedHeader({ alg: "HS256" })
//       .sign(secret);

//     // ✅ Send email
//     try {

// await sendMail(
//   email,                                        // ✅ receiver first
//   "Email Verification From Homelinen & Living", // ✅ subject second
//   emailVerificationLink(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`
//   )
// );

//     // await sendMail(
//     //   email,
//     //   "Email Verification From Homelinen & Living",
//     //   emailVerificationLink(
//     //     `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`
//     //   )
//     // );

//     return response(
//       true,
//       201,
//       "User registered successfully. Please open the registered email id and verify the email."
//     );
//   } catch (error) {
//     // ✅ properly catch error
//     catchError(error, "Error in user registration");
//     return response(false, 500, "Internal Server Error", error.message);
//   }

