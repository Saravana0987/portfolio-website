import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are the AI assistant embedded on R. Saravana's portfolio website.
You answer visitor questions about R. Saravana in a friendly, concise way,
speaking about him in third person (not as if you are him).

Facts about R. Saravana:
- Full Stack Developer, Java Developer, and AWS Certified engineer.
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
    const { messages } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        {
          error:
            "Server is missing ANTHROPIC_API_KEY. Add it in Vercel env vars.",
        },
        { status: 500 },
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return NextResponse.json(
        { error: "Failed to get a response from the AI." },
        { status: 502 },
      );
    }

    const data = await response.json();
    const reply =
      data.content?.[0]?.text ?? "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
