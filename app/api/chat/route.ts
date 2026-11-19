import { NextRequest, NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

const SYSTEM_PROMPT = `
You are the AI assistant embedded on R. Saravana's portfolio website.
You answer visitor questions about R. Saravana in a friendly, concise way,
speaking about him in third person (not as if you are him).

Facts about R. Saravana:
- Full Stack Developer, Java Developer, and AWS Certified engineer.
- Currently a Forward Deployed Engineer Intern at Vilasat AI LLC, working on
  AI-powered solutions, Python automation, API integrations, and LLM/RAG
  applications.
- Skills: HTML, CSS, JavaScript, Bootstrap, React, Tailwind CSS (frontend);
  Node.js, Express, Java, Python (backend); MySQL (database); AWS (cloud);
  Git, GitHub, VS Code, PyCharm (tools).
- 500+ algorithmic problems solved on LeetCode.
- Certifications: AWS Certified AI Practitioner, AWS Certified Cloud
  Practitioner (Amazon Web Services), Microsoft Python.
- Education: B.Tech in Computer Science at RGUKT RK Valley (CGPA 8.0).
- Featured projects:
  1. "Chatter" — a real-time chat application with authentication,
     encryption, and live messaging. Built with React, Node.js, Express,
     Tailwind CSS, WebRTC.
  2. "YogaHub" — a yoga management platform for class scheduling and
     client management. Built with HTML, CSS, Bootstrap, JavaScript, MySQL.
- Based in Andhra Pradesh, India.
- Open to freelance work, collaborations, and full-time opportunities.
- Contact: saravanaraghupathi@gmail.com, GitHub: Saravana0987,
  LinkedIn: r-saravana-760112237.

Rules:
- Keep answers short (2-4 sentences) unless the visitor asks for detail.
- If asked something you don't know, say you're not sure and suggest they
  reach out directly via the contact form or email.
- If a visitor seems interested in hiring/collaborating, encourage them to
  use the contact form on the site or email directly.
- Never invent projects, certifications, or experience not listed above.
`;

export async function POST(req: NextRequest) {
  try {
    const body: { messages?: unknown } = await req.json();

    if (
      !Array.isArray(body.messages) ||
      body.messages.length === 0 ||
      !body.messages.every(
        (message): message is ChatMessage =>
          typeof message === "object" &&
          message !== null &&
          "role" in message &&
          (message.role === "user" || message.role === "assistant") &&
          "content" in message &&
          typeof message.content === "string",
      )
    ) {
      return NextResponse.json(
        { error: "Please provide a valid chat message." },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Server is missing GEMINI_API_KEY. Add it to .env.development.local for local development or to your deployment environment variables.",
        },
        { status: 500 },
      );
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: body.messages.map((message) => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [{ text: message.content }],
          })),
          generationConfig: {
            maxOutputTokens: 500,
          },
        }),
      },
    );

    if (!response.ok) {
      console.error("Gemini API request failed:", response.status);
      return NextResponse.json(
        { error: "Failed to get a response from the AI." },
        { status: 502 },
      );
    }

    const data: GeminiResponse = await response.json();
    const reply = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim();

    if (!reply) {
      console.error("Gemini API returned no text candidate.");
      return NextResponse.json(
        { error: "The AI returned an empty response. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
