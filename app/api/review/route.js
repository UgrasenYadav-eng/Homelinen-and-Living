export const dynamic = "force-dynamic"; // ✅ Prevent static caching (Vercel safe)

import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError } from "@/lib/helperFunction";
import ReviewModel from "@/models/Review.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // 🔐 Auth check
    const auth = await isAuthenticated("admin");

    if (!auth.isAuth) {
      return NextResponse.json(
        { success: false, data: [], meta: { totalRowCount: 0 } },
        { status: 403 }
      );
    }

    await connectDB();

    const searchParams = request.nextUrl.searchParams;

    const start = parseInt(searchParams.get("start") || 0, 10);
    const size = parseInt(searchParams.get("size") || 10, 10);
    const filters = JSON.parse(searchParams.get("filters") || "[]");
    const globalFilter = searchParams.get("globalFilter") || "";
    const sorting = JSON.parse(searchParams.get("sorting") || "[]");
    const deleteType = searchParams.get("deleteType");

    let matchQuery = {};

    if (deleteType === "SD") {
      matchQuery.deletedAt = null;
    } else if (deleteType === "PD") {
      matchQuery.deletedAt = { $ne: null };
    }

    // Global search
    if (globalFilter) {
      matchQuery.$or = [
        { "productData.name": { $regex: globalFilter, $options: "i" } },
        { "userData.name": { $regex: globalFilter, $options: "i" } },
        { rating: { $regex: globalFilter, $options: "i" } },
        { title: { $regex: globalFilter, $options: "i" } },
        { review: { $regex: globalFilter, $options: "i" } },
      ];
    }

    // Column filtering
    filters.forEach((filter) => {
      if (filter.id === "product") {
        matchQuery["productData.name"] = {
          $regex: filter.value,
          $options: "i",
        };
      } else if (filter.id === "user") {
        matchQuery["userData.name"] = {
          $regex: filter.value,
          $options: "i",
        };
      } else {
        matchQuery[filter.id] = {
          $regex: filter.value,
          $options: "i",
        };
      }
    });

    // Sorting
    let sortQuery = {};
    sorting.forEach((sort) => {
      sortQuery[sort.id] = sort.desc ? -1 : 1;
    });

    const aggregatePipeline = [
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productData",
        },
      },
      { $unwind: { path: "$productData", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },
      { $match: matchQuery },
      {
        $sort:
          Object.keys(sortQuery).length > 0
            ? sortQuery
            : { createdAt: -1 },
      },
      { $skip: start },
      { $limit: size },
      {
        $project: {
          _id: 1,
          product: "$productData.name",
          user: "$userData.name",
          rating: 1,
          review: 1,
          title: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
    ];

    const getReview = await ReviewModel.aggregate(aggregatePipeline);

    // ⚠ Correct total count (needs same lookup pipeline)
    const totalCountPipeline = [
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productData",
        },
      },
      { $unwind: { path: "$productData", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },
      { $match: matchQuery },
      { $count: "total" },
    ];

    const totalResult = await ReviewModel.aggregate(totalCountPipeline);
    const totalRowCount = totalResult[0]?.total || 0;

    return NextResponse.json({
      success: true,
      data: Array.isArray(getReview) ? getReview : [],
      meta: { totalRowCount },
    });

  } catch (error) {
    console.error("REVIEW GET ERROR:", error);
    return catchError(error);
  }
}


// import { isAuthenticated } from "@/lib/authentication"
// import { connectDB } from "@/lib/databaseConnection"
// import { catchError } from "@/lib/helperFunction"
// import ReviewModel from "@/models/Review.model"

// import { NextResponse } from "next/server"

// export async function GET(request) {
//     try {
//         const auth = await isAuthenticated('admin')
//         if (!auth.isAuth) {
//             return response(false, 403, 'Unauthorized.')
//         }

//         await connectDB()

//         const searchParams = request.nextUrl.searchParams

//         // Extract query parameters 
//         const start = parseInt(searchParams.get('start') || 0, 10)
//         const size = parseInt(searchParams.get('size') || 10, 10)
//         const filters = JSON.parse(searchParams.get('filters') || "[]")
//         const globalFilter = searchParams.get('globalFilter') || ""
//         const sorting = JSON.parse(searchParams.get('sorting') || "[]")
//         const deleteType = searchParams.get('deleteType')

//         // Build match query  
//         let matchQuery = {}

//         if (deleteType === 'SD') {
//             matchQuery = { deletedAt: null }
//         } else if (deleteType === 'PD') {
//             matchQuery = { deletedAt: { $ne: null } }
//         }

//         // Global search 
//         if (globalFilter) {
//             matchQuery["$or"] = [
//                 { "productData.name": { $regex: globalFilter, $options: 'i' } },
//                 { "userData.name": { $regex: globalFilter, $options: 'i' } },
//                 { rating: { $regex: globalFilter, $options: 'i' } },
//                 { title: { $regex: globalFilter, $options: 'i' } },
//                 { review: { $regex: globalFilter, $options: 'i' } },

//             ]
//         }

//         //  Column filteration  

//         filters.forEach(filter => {
//             if (filter.id === 'product') {
//                 matchQuery['productData.name'] = { $regex: filter.value, $options: 'i' }
//             } else if (filter.id === 'user') {
//                 matchQuery['userData.name'] = { $regex: filter.value, $options: 'i' }
//             } else {
//                 matchQuery[filter.id] = { $regex: filter.value, $options: 'i' }
//             }
//         });

//         //   Sorting  
//         let sortQuery = {}
//         sorting.forEach(sort => {
//             sortQuery[sort.id] = sort.desc ? -1 : 1
//         });


//         // Aggregate pipeline  

//         const aggregatePipeline = [
//             {
//                 $lookup: {
//                     from: 'products',
//                     localField: 'product',
//                     foreignField: '_id',
//                     as: 'productData'
//                 }
//             },
//             {
//                 $unwind: { path: '$productData', preserveNullAndEmptyArrays: true }
//             },
//             {
//                 $lookup: {
//                     from: 'users',
//                     localField: 'user',
//                     foreignField: '_id',
//                     as: 'userData'
//                 }
//             },
//             {
//                 $unwind: { path: '$userData', preserveNullAndEmptyArrays: true }
//             },
//             { $match: matchQuery },
//             { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
//             { $skip: start },
//             { $limit: size },
//             {
//                 $project: {
//                     _id: 1,
//                     product: '$productData.name',
//                     user: '$userData.name',
//                     rating: 1,
//                     review: 1,
//                     title: 1,
//                     createdAt: 1,
//                     updatedAt: 1,
//                     deletedAt: 1
//                 }
//             }
//         ]

//         // Execute query  

//         const getReview = await ReviewModel.aggregate(aggregatePipeline)

//         // Get totalRowCount  
//         const totalRowCount = await ReviewModel.countDocuments(matchQuery)

//         return NextResponse.json({
//             success: true,
//             data: getReview,
//             meta: { totalRowCount }
//         })

//     } catch (error) {
//         return catchError(error)
//     }
// }