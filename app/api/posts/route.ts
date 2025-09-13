import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { verifyToken } from "@/lib/auth"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { itemName, description, hashtags, imageUrl } = await request.json()

    if (!itemName || !description) {
      return NextResponse.json({ error: "Item name and description are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("raiderclaim")
    const posts = db.collection("posts")

    const newPost = {
      userId: new ObjectId(decoded.userId), // ensure ObjectId
      studentId: decoded.studentId,
      itemName,
      description,
      hashtags: hashtags || [],
      imageUrl: imageUrl || null,
      createdAt: new Date(),
    }

    const result = await posts.insertOne(newPost)

    const user = await db.collection("users").findOne(
      { _id: new ObjectId(decoded.userId) },
      { projection: { name: 1 } }
    )

    return NextResponse.json({
      ...newPost,
      _id: result.insertedId,
      user: { name: user?.name || "Unknown" },
    })
  } catch (error) {
    console.error("Post creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}


export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("raiderclaim")
    const posts = db.collection("posts")
    const users = db.collection("users")

    // Get posts with user information
    const allPosts = await posts
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            itemName: 1,
            description: 1,
            hashtags: 1,
            imageUrl: 1,
            studentId: 1,
            createdAt: 1,
            "user.name": 1,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $limit: 50,
        },
      ])
      .toArray()

    return NextResponse.json(allPosts)
  } catch (error) {
    console.error("Posts fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
