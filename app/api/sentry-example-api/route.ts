import { NextResponse } from "next/server";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

let messages: ChatMessage[] = [];

export async function POST(request: Request) {
  const body: { message?: string } = await request.json();

  if (!body.message) {
    return NextResponse.json(
      { error: "Message is required" },
      { status: 400 }
    );
  }

  messages.push({
    sender: "user",
    text: body.message,
  });

  messages.push({
    sender: "bot",
    text: "Thanks for contacting us! We will reply shortly 🙂",
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(messages);
}
