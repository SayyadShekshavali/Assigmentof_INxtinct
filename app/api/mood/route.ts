import { NextResponse } from "next/server";
import { moods } from "../utils/mood";

export async function GET() {
  return NextResponse.json(moods);
}
export async function POST(req: Request) {
  try {
    const { name, mood, comment } = await req.json();
    if (!mood) {
      return NextResponse.json({ error: "Mood is required" }, { status: 400 });
    }
    const newEntry = {
      name,
      mood,
      comment: comment || "",
      time: new Date().toISOString(),
    };
    moods.push(newEntry);
    return NextResponse.json(
      { success: true, entry: newEntry },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 500 });
  }
}
