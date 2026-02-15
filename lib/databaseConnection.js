import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "homeline",
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB Connection Error:", error);
    throw error;
  }

  return cached.conn;
};


// import mongoose from "mongoose";
// const MONGODB_URL = process.env.MONGODB_URI

// let cached = global.mongoose

// if (!cached) {
//     cached = global.mongoose = {
//         conn: null,
//         promise: null,
//     }
// }

// export const connectDB = async () => {
//     if (cached.conn) return cached.conn;
//     if (!cached.promise) {
//         cached.promise = mongoose.connect(MONGODB_URL, {
//             dbName: 'homeline',
//             bufferCommands: false
//         })
//     }

//     cached.conn = await cached.promise

//     return cached.conn
// }