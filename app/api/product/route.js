export const dynamic = "force-dynamic"; 
// ✅ Prevent static caching on Vercel (important for authenticated APIs)

import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError } from "@/lib/helperFunction";
import ProductModel from "@/models/Product.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // ✅ Always authenticate first (cookie-based auth)
    const auth = await isAuthenticated("admin");

    // ✅ VERY IMPORTANT:
    // Always return SAME response structure for React Query
    // (Prevents table crash on Vercel when 403 happens)
    if (!auth.isAuth) {
      return NextResponse.json(
        // { success: false, data: [], meta: { totalRowCount: 0 } },
        // { status: 403 }
      );
    }

    // ✅ Ensure DB connection (cached for Vercel serverless)
    await connectDB();

    const searchParams = request.nextUrl.searchParams;

    // ✅ Query params for pagination
    const start = parseInt(searchParams.get("start") || 0, 10);
    const size = parseInt(searchParams.get("size") || 10, 10);

    // ⚠️ NOTE:
    // If filters/sorting ever becomes invalid JSON on Vercel,
    // JSON.parse may throw. If that happens, wrap in try/catch.
    const filters = JSON.parse(searchParams.get("filters") || "[]");
    const globalFilter = searchParams.get("globalFilter") || "";
    const sorting = JSON.parse(searchParams.get("sorting") || "[]");
    const deleteType = searchParams.get("deleteType");

    let matchQuery = {};

    // ✅ Soft delete filtering
    if (deleteType === "SD") {
      matchQuery.deletedAt = null;
    } else if (deleteType === "PD") {
      matchQuery.deletedAt = { $ne: null };
    }

    // 🔎 Global Search
    if (globalFilter) {
      matchQuery.$or = [
        { name: { $regex: globalFilter, $options: "i" } },
        { slug: { $regex: globalFilter, $options: "i" } },
        { "categoryData.name": { $regex: globalFilter, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$mrp" },
              regex: globalFilter,
              options: "i",
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$sellingPrice" },
              regex: globalFilter,
              options: "i",
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$discountPercentage" },
              regex: globalFilter,
              options: "i",
            },
          },
        },
      ];
    }

    // 📌 Column Filtering
    filters.forEach((filter) => {
      if (
        filter.id === "mrp" ||
        filter.id === "sellingPrice" ||
        filter.id === "discountPercentage"
      ) {
        matchQuery[filter.id] = Number(filter.value);
      } else if (filter.id === "category") {
        matchQuery["categoryData.name"] = {
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

    // 📊 Sorting
    let sortQuery = {};
    sorting.forEach((sort) => {
      sortQuery[sort.id] = sort.desc ? -1 : 1;
    });

    // ✅ Aggregation with category lookup
    const aggregatePipeline = [
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: {
          path: "$categoryData",
          preserveNullAndEmptyArrays: true, // prevents crash if category missing
        },
      },
      { $match: matchQuery },
      {
        $sort:
          Object.keys(sortQuery).length > 0
            ? sortQuery
            : { createdAt: -1 }, // default sort
      },
      { $skip: start },
      { $limit: size },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          mrp: 1,
          sellingPrice: 1,
          discountPercentage: 1,
          category: "$categoryData.name",
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
    ];

    const getProduct = await ProductModel.aggregate(aggregatePipeline);

    // ✅ IMPORTANT:
    // When using $lookup in filter, countDocuments(matchQuery)
    // may return wrong value. So we use same lookup pipeline.
    const totalCountPipeline = [
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: {
          path: "$categoryData",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $match: matchQuery },
      { $count: "total" },
    ];

    const totalResult = await ProductModel.aggregate(totalCountPipeline);
    const totalRowCount = totalResult[0]?.total || 0;

    // ✅ Always return array (prevents .map crash in UI)
    return NextResponse.json({
      success: true,
      data: Array.isArray(getProduct) ? getProduct : [],
      meta: { totalRowCount },
    });

  } catch (error) {
    console.error("PRODUCT GET ERROR:", error);
    return catchError(error); // centralized error handler
  }
}