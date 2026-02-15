export const dynamic = "force-dynamic";

import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError } from "@/lib/helperFunction";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");

    // ✅ Consistent unauthorized response
    if (!auth.isAuth) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          meta: { totalRowCount: 0 },
        },
        { status: 403 }
      );
    }

    await connectDB();

    const searchParams = request.nextUrl.searchParams;

    // ✅ Safe parsing
    const start = parseInt(searchParams.get("start") || "0", 10);
    const size = parseInt(searchParams.get("size") || "10", 10);

    let filters = [];
    let sorting = [];

    try {
      filters = JSON.parse(searchParams.get("filters") || "[]");
      sorting = JSON.parse(searchParams.get("sorting") || "[]");
    } catch {
      filters = [];
      sorting = [];
    }

    const globalFilter = searchParams.get("globalFilter") || "";
    const deleteType = searchParams.get("deleteType");

    let matchQuery = {};

    if (deleteType === "SD") {
      matchQuery.deletedAt = null;
    } else if (deleteType === "PD") {
      matchQuery.deletedAt = { $ne: null };
    }

    // ✅ Global Search
    if (globalFilter) {
      matchQuery.$or = [
        { name: { $regex: globalFilter, $options: "i" } },
        { email: { $regex: globalFilter, $options: "i" } },
        { phone: { $regex: globalFilter, $options: "i" } },
        { address: { $regex: globalFilter, $options: "i" } },
      ];
    }

    // ✅ Column Filters
    filters.forEach((filter) => {
      if (filter?.id && filter?.value) {
        matchQuery[filter.id] = {
          $regex: filter.value,
          $options: "i",
        };
      }
    });

    // ✅ Sorting
    let sortQuery = {};
    sorting.forEach((sort) => {
      if (sort?.id) {
        sortQuery[sort.id] = sort.desc ? -1 : 1;
      }
    });

    const aggregatePipeline = [
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
          name: 1,
          email: 1,
          phone: 1,
          address: 1,
          avatar: 1,
          isEmailVerified: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
    ];

    const customers = await userModel.aggregate(aggregatePipeline);

    const totalRowCount = await userModel.countDocuments(matchQuery);

    return NextResponse.json({
      success: true,
      data: Array.isArray(customers) ? customers : [],
      meta: { totalRowCount },
    });

  } catch (error) {
    console.error("CUSTOMERS GET ERROR:", error);
    return catchError(error);
  }
}
