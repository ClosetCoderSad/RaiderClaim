import { NextRequest, NextResponse } from "next/server"
import { PublicKey, Connection } from "@solana/web3.js"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get("address")
  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 })
  }
  try {
    const connection = new Connection("https://api.mainnet-beta.solana.com")
    const publicKey = new PublicKey(address)
    const balance = await connection.getBalance(publicKey)
    return NextResponse.json({ balance: balance / 1e9 }) // SOL
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch balance" }, { status: 500 })
  }
}
