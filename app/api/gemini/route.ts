import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "No prompt provided" },
        { status: 400 }
      );
    }
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
      }
    );

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to get response from Gemini." },
      { status: 500 }
    );
  }
}
