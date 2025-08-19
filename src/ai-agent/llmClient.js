// src/ai-agent/llmClient.js
export async function askLLM({ messages, siteContext, language }) {
  try {
    const r = await fetch("/api/agent/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, siteContext, language }),
    });
    if (!r.ok) throw new Error(await r.text());
    const data = await r.json();
    return data.content;
  } catch {
    return "Sorry, I couldn’t reach the AI service right now.";
  }
}

// Pull text from your sections to help site-specific answers
export function collectSiteContext() {
  const ids = [
    "home",
    "about",
    "services",
    "projects",
    "working",
    "testimonials",
    "contact",
  ];
  const chunks = [];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const title = el.querySelector("h1,h2,h3")?.innerText || id;
    const text = el.innerText.replace(/\s+/g, " ").trim();
    if (text) chunks.push(`## ${title}\n${text.slice(0, 800)}`);
  });
  return chunks.join("\n\n").slice(0, 6000);
}
