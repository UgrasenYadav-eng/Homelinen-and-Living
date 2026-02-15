import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function isAuthenticated(role) {
  try {
    // ✅ Required in Route Handlers (Next 14+)
    const cookieStore = await cookies();

    const token = cookieStore?.get("access_token")?.value;

    if (!token) {
      return { isAuth: false };
    }

    if (!process.env.SECRET_KEY) {
      console.error("SECRET_KEY missing in environment variables");
      return { isAuth: false };
    }

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);

    const { payload } = await jwtVerify(token, secret);

    // Optional role check
    if (role && payload?.role !== role) {
      return { isAuth: false };
    }

    return {
      isAuth: true,
      user: payload,
    };

  } catch (error) {
    // Do NOT crash production
    console.error("AUTH ERROR:", error?.message || error);
    return { isAuth: false };
  }
}






// import { jwtVerify } from "jose";
// import { cookies } from "next/headers";

// export const isAuthenticated = async (role) => {
//   try {
//     const cookieStore = cookies(); // ❌ no await

//     const token = cookieStore.get("access_token")?.value;
//     if (!token) {
//       return { isAuth: false };
//     }

//     const secret = new TextEncoder().encode(process.env.SECRET_KEY);

//     const { payload } = await jwtVerify(token, secret);

//     if (role && payload.role !== role) {
//       return { isAuth: false };
//     }

//     return {
//       isAuth: true,
//       userId: payload._id,   // matches JWT
//       user: payload,
//     };
//   } catch (error) {
//     return {
//       isAuth: false,
//     };
//   }
// };




// // import { jwtVerify } from "jose"
// // import { cookies } from "next/headers"
// // export const isAuthenticated = async (role) => {
// //     try {
// //         const cookieStore = await cookies()
// //         if (!cookieStore.has('access_token')) {
// //             return {
// //                 isAuth: false
// //             }
// //         }

// //         const access_token = cookieStore.get('access_token')
// //         const { payload } = await jwtVerify(access_token.value, new TextEncoder().encode(process.env.SECRET_KEY))

// //         if (payload.role !== role) {
// //             return {
// //                 isAuth: false
// //             }
// //         }

// //         return {
// //             isAuth: true,
// //             userId: payload._id
// //         }

// //     } catch (error) {
// //         return {
// //             isAuth: false,
// //             error
// //         }
// //     }
// // }
