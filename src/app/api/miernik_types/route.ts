import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import MiernikTypeModel, { MiernikType } from "@/app/models/MiernikType";

export async function GET() {
  await connectToDatabase();
  const items = await MiernikTypeModel.find({});
  return NextResponse.json(items); // fetch('/api/items') GET
}

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const new_item: MiernikType = await req.json();
  const created_item = await MiernikTypeModel.create(new_item);
  return NextResponse.json(created_item, { status: 201 });
}
