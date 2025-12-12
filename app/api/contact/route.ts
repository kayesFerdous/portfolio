import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Log the contact form submission
    console.log("[v0] Contact form submission:")
    console.log(`Name: ${name}`)
    console.log(`Email: ${email}`)
    console.log(`Message: ${message}`)

    // In production, you would:
    // 1. Send an email via SMTP (e.g., Nodemailer with Gmail)
    // 2. Forward to a FastAPI backend endpoint
    // 3. Store in a database
    // 4. Send to a messaging service like Slack or Discord

    // Example for forwarding to FastAPI backend:
    // const response = await fetch('https://your-fastapi-backend.com/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, message })
    // })

    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
