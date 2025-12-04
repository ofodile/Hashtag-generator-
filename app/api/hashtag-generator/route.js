import { Groq } from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    const { topic, platform, style, count } = await req.json();

    const prompt = `
You are an AI social media assistant.
Generate ${count || 15} relevant hashtags for the topic: "${topic}".
Platform: ${platform || "any"}.
Style: ${style || "general"}.
Return only hashtags separated by spaces or commas, no extra text.
    `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 200,
    });

    const result = completion.choices[0].message;

    return Response.json({ hashtags: result.content });
  } catch (error) {
    console.log("Hashtag Generator Error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
