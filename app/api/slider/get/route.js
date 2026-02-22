import { connectDB } from "@/lib/databaseConnection";
import MediaModel from "@/models/Media.model";
import { response, catchError } from "@/lib/helperFunction";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || 0);
    const limit = Number(searchParams.get("limit") || 10);

    const sliders = await MediaModel.find({
      type: "slider",
      deletedAt: null
    })
      .skip(page * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    const total = await MediaModel.countDocuments({
      type: "slider",
      deletedAt: null
    });

    return response(true, 200, "Slider list", {
      data: sliders,
      hasMore: (page + 1) * limit < total
    });

  } catch (error) {
    return catchError(error);
  }
}


// import { connectDB } from "@/lib/databaseConnection";
// import SliderModel from "@/models/Slider.model";
// import { response, catchError } from "@/lib/helperFunction";

// export async function GET(request) {
//   try {
//     await connectDB()

//     const { searchParams } = new URL(request.url)
//     const page = Number(searchParams.get("page") || 0)
//     const limit = Number(searchParams.get("limit") || 10)

//     const sliders = await SliderModel.find({ isActive: true })
//       .populate("media", "secure_url alt")
//       .skip(page * limit)
//       .limit(limit)
//       .sort({ order: 1 })
//       .lean()

//     const total = await SliderModel.countDocuments({ isActive: true })

//     return response(true, 200, "Slider list", {
//       data: sliders,
//       hasMore: (page + 1) * limit < total
//     })

//   } catch (error) {
//     return catchError(error)
//   }
// }