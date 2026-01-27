import { NextResponse } from "next/server";
import { connectDB } from "@/lib/databaseConnection";
import NewsletterModel from "@/models/Newsletter.model";

// ---------------- POST : SAVE EMAIL ----------------

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    // Check duplicate
    const exists = await NewsletterModel.findOne({ email });

    if (exists) {
      return NextResponse.json(
        { success: false, message: "Already subscribed" },
        { status: 409 }
      );
    }

    await NewsletterModel.create({ email });

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully",
    });

  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}


// ---------------- GET : ADMIN LIST ----------------

export async function GET() {
  try {
    await connectDB();

    const data = await NewsletterModel
      .find()
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
