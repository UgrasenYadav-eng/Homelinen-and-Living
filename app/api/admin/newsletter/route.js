import { connectDB } from "@/lib/databaseConnection";
import Newsletter from "@/models/Newsletter.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const list = await Newsletter.find().sort({ createdAt: -1 });

  return NextResponse.json({ success: true, data: list });
}
