import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

import { connectDB } from "@/lib/databaseConnection";
import OTPModel from "@/models/Otp.model";
import userModel from "@/models/userModel";

export async function POST(request) {
  try {
    await connectDB();

    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Email and OTP are required." },
        { status: 400 }
      );
    }

    // 🔎 Check OTP
    const otpDoc = await OTPModel.findOne({ email, otp });
    if (!otpDoc) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired OTP." },
        { status: 400 }
      );
    }

    // 👤 Get User
    const user = await userModel
      .findOne({ email, deletedAt: null })
      .lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // 🔐 Create JWT Payload
    const loggedInUserData = {
      _id: user._id.toString(),
      role: user.role,
      name: user.name,
      email: user.email,
      avatar: user.avatar || null,
    };

    // const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    // 🔐 Create JWT

if (!process.env.SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in environment variables");
}

const secret = new TextEncoder().encode(process.env.SECRET_KEY);

    const token = await new SignJWT(loggedInUserData)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    // 🍪 Set Cookie (Vercel + Local Safe)
    const cookieStore = await cookies(); // ❌ NO await here

    cookieStore.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only on Vercel
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // 🧹 Delete OTP after success
    await otpDoc.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: loggedInUserData, // ✅ IMPORTANT (fixes your role error)
    });

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}



// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { SignJWT } from "jose";

// import { connectDB } from "@/lib/databaseConnection";
// import OTPModel from "@/models/Otp.model";
// import userModel from "@/models/userModel";

// export async function POST(request) {
//   try {
//     await connectDB();

//     const { email, otp } = await request.json();

//     const otpDoc = await OTPModel.findOne({ email, otp });
//     if (!otpDoc) {
//       return NextResponse.json(
//         { success: false, message: "Invalid or expired OTP" },
//         { status: 400 }
//       );
//     }

//     const user = await userModel.findOne({ email, deletedAt: null });
//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "User not found" },
//         { status: 404 }
//       );
//     }

//     // 🔐 Create JWT
//     const secret = new TextEncoder().encode(process.env.SECRET_KEY);
//     const token = await new SignJWT({
//       _id: user._id.toString(),
//       role: user.role,
//       name: user.name,
//     })
//       .setIssuedAt()
//       .setExpirationTime("24h")
//       .setProtectedHeader({ alg: "HS256" })
//       .sign(secret);

//     // 🍪 Set cookie (VERCEL SAFE)
//     const cookieStore = await cookies();
//     cookieStore.set("access_token", token, {
//       httpOnly: true,
//       secure: true,       // REQUIRED for Vercel
//       sameSite: "lax",
//       path: "/",
//     });

//     await otpDoc.deleteOne();

//     return NextResponse.json({
//       success: true,
//       message: "Login successful",
//     });
//   } catch (error) {
//     console.error("VERIFY OTP ERROR:", error);
//     return NextResponse.json(
//       { success: false, message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }




// import { connectDB } from "@/lib/databaseConnection";
// import { catchError, response } from "@/lib/helperFunction";
// import { zSchema } from "@/lib/zodSchema";
// import OTPModel from "@/models/Otp.model";
// import userModel from "@/models/userModel";

// import { SignJWT } from "jose";
// import { cookies } from "next/headers";

// export async function POST(request) {
//   try {
//     await connectDB();
//     const payload = await request.json();
//     const validationSchema = zSchema.pick({
//       otp: true,
//       email: true,
//     });

//     const validatedData = validationSchema.safeParse(payload);
//     if (!validatedData.success) {
//       return response(
//         false,
//         401,
//         "Invalid or missing input field.",
//         validatedData.error
//       );
//     }

//     const { email, otp } = validatedData.data;

//     const getOtpData = await OTPModel.findOne({ email, otp });
//     if (!getOtpData) {
//       return response(false, 404, "Invalid or expired otp.");
//     }

//     const getUser = await userModel.findOne({ deletedAt: null, email }).lean();
//     if (!getUser) {
//       return response(false, 404, "User not found.");
//     }

//     const loggedInUserData = {
//       _id: getUser._id.toString(),
//       role: getUser.role,
//       name: getUser.name,
//       avatar: getUser.avatar,
//     };

//     const secret = new TextEncoder().encode(process.env.SECRET_KEY);
//     const token = await new SignJWT(loggedInUserData)
//       .setIssuedAt()
//       .setExpirationTime("24h")
//       .setProtectedHeader({ alg: "HS256" })
//       .sign(secret);

//     // const cookieStore = await cookies();

//     // cookieStore.set({
//     //   name: "access_token",
//     //   value: token,
//     //   httpOnly: process.env.NODE_ENV === "production",
//     //   path: "/",
//     //   secure: process.env.NODE_ENV === "production",
//     //   sameSite: "lax",
//     // });
// const cookieStore = await cookies(); // ✅ await REQUIRED

// cookieStore.set("access_token", token, {
//   httpOnly: true,
//   secure: true,     // REQUIRED for Vercel
//   sameSite: "lax",
//   path: "/",
// });


//     // remove otp after validation
//     await getOtpData.deleteOne();

//     return response(true, 200, "Login successfull.", loggedInUserData);
//   } catch (error) {
//     return catchError(error);
//   }
// }
