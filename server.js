// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// ENV (set in .env)
const API_URL =
  process.env.LLM_API_URL || "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.LLM_API_KEY || "";
const MODEL = process.env.LLM_MODEL || "gpt-4o-mini";

app.post("/api/agent/chat", async (req, res) => {
  try {
    const { messages = [], siteContext = "", language = "en" } = req.body;

    if (!API_KEY) return res.status(400).json({ error: "Missing LLM_API_KEY" });

    const nowIST = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const system = [
      "You are a helpful, concise website AI assistant.",
      "When the user asks about this website, use the SITE CONTEXT below.",
      "If the user asks to navigate, reply briefly; the UI handles scrolling.",
      "Prefer replying in the user's language if evident.",
      "Be accurate. If something is unknown or not in context, say you're unsure and ask a follow-up.",
      `Current date/time (Asia/Kolkata): ${nowIST}`,
      `User language hint: ${language}`,
      `--- SITE CONTEXT START ---\n${String(siteContext).slice(
        0,
        8000
      )}\n--- SITE CONTEXT END ---`,
    ].join("\n");

    const r = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: system }, ...messages],
        temperature: 0.4,
      }),
    });

    if (!r.ok) {
      const txt = await r.text();
      return res.status(500).json({ error: txt });
    }

    const data = await r.json();
    const content =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn’t generate a reply.";
    res.json({ content });
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () =>
  console.log("AI agent server running on http://localhost:" + PORT)
);
