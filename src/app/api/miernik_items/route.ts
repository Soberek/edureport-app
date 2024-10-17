import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import MiernikItemModel, { MiernikItem } from "@/app/models/MiernikItem";

// GET miernik items
export async function GET() {
  await connectToDatabase();
  const items = await MiernikItemModel.find({});
  return NextResponse.json(items); // fetch('/api/items') GET
}

// POST Miernik item
export async function POST(req: NextRequest) {
  await connectToDatabase();

  const new_item: MiernikItem = await req.json();
  const created_item = await MiernikItemModel.create(new_item);
  return NextResponse.json(created_item, { status: 201 });
}
