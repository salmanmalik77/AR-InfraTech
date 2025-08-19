// // src/ai-agent/usersOperator.js
export async function askUsersOperator(text, confirm = false) {
  try {
    const r = await fetch("/api/agent/command", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, confirm }),
    });

    const data = await r.json().catch(() => ({}));

    // If backend says key missing or any non-200 → fall back to site logic
    if (!r.ok) {
      if (data?.error?.includes("Missing OpenAI:ApiKey")) return null;
      // Optional: show error if you want
      return `Operator error: ${data?.error || "unavailable"}`;
    }

    // Only return real content; otherwise return null to fall back
    return data?.content || null;
  } catch {
    // Network issues → fall back to navigation
    return null;
  }
}

//

// src/ai-agent/usersOperator.js
// export async function askUsersOperator(text, confirm = false) {
//   try {
//     const r = await fetch("/api/agent/command", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text, confirm }),
//     });
//     const data = await r.json().catch(() => ({}));
//     // If backend returns an error or non-2xx, don't block the UX
//     if (!r.ok || data?.error) return null;
//     return data?.content ?? null;
//   } catch {
//     // Network / server down -> let caller fall back to normal behavior
//     return null;
//   }
// }
