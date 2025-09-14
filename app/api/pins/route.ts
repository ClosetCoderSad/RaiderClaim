import { type NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { itemId, itemName, description, latitude, longitude } = await request.json();

    if (!itemId || !itemName || !description || !latitude || !longitude) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("raiderclaim");
    const pins = db.collection("mapPins");

    const result = await pins.insertOne({
      userId: decoded.userId,
      itemId, // store the reported item id
      itemName,
      description,
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
      createdAt: new Date(),
    });

    return NextResponse.json({
      message: "Pin created successfully",
      pinId: result.insertedId,
      itemId, // return the itemId so frontend knows which item was reported
    });
  } catch (error) {
    console.error("Pin creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("raiderclaim");
    const pins = db.collection("mapPins");

    const allPins = await pins.find({}).sort({ createdAt: -1 }).limit(100).toArray();

    return NextResponse.json(allPins);
  } catch (error) {
    console.error("Pins fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
