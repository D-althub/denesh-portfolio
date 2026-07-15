import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const STATE_FILE = path.join(DATA_DIR, "portfolio-state.json");

export async function GET() {
  try {
    const content = await readFile(STATE_FILE, "utf-8");
    const data = JSON.parse(content);
    return NextResponse.json(data);
  } catch (error) {
    // File doesn't exist yet or invalid json
    return NextResponse.json({ error: "No persistent server state found" }, { status: 404 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(STATE_FILE, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ success: true, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error("Failed to persist studio state:", error);
    return NextResponse.json({ error: "Failed to save state to server" }, { status: 500 });
  }
}
