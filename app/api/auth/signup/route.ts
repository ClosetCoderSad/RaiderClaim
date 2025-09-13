import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { hashPassword, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password, studentId, name } = await request.json()

    // Validate required fields
    if (!email || !password || !studentId || !name) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate student ID format (basic TTU format check)
    if (!/^R\d{8}$/.test(studentId)) {
      return NextResponse.json({ error: "Invalid student ID format. Must be R followed by 8 digits." }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("raiderclaim")
    const users = db.collection("users")

    // Check if user already exists
    const existingUser = await users.findOne({
      $or: [{ email }, { studentId }],
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email or student ID already exists" }, { status: 409 })
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)
    const result = await users.insertOne({
      email,
      password: hashedPassword,
      studentId,
      name,
      createdAt: new Date(),
    })

    // Generate JWT token
    const user = {
      _id: result.insertedId.toString(),
      email,
      studentId,
      name,
    }
    const token = generateToken(user)

    return NextResponse.json({
      message: "User created successfully",
      token,
      user: { _id: user._id, email, studentId, name },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
