import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import MiernikProgramNameModel, { ProgramName } from "@/app/models/MiernikProgram";

export async function GET() {
  await connectToDatabase();
  const items = await MiernikProgramNameModel.find({}); // find all
  return NextResponse.json(items); // fetch('/api/items') GET
}

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const new_item: ProgramName = await req.json();
  const created_item = await MiernikProgramNameModel.create(new_item);
  return NextResponse.json(created_item, { status: 201 });
}
