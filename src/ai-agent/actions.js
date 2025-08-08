// src/ai-agent/actions.js

const HEADER_OFFSET = 100; // adjust if your sticky header is taller

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: y, behavior: "smooth" });
  return true;
}

export function executeIntent(intent) {
  switch (intent.type) {
    case "SCROLL":
      return scrollToId(intent.targetId);
    case "SEARCH":
      alert(`Searching for: ${intent.query}`);
      return true; // wire later
    case "CALL":
      window.location.href = `tel:${intent.number}`;
      return true;
    case "WHATSAPP":
      window.open(
        `https://wa.me/<YOUR_NUMBER_WITH_COUNTRY_CODE>?text=${encodeURIComponent(
          intent.message || ""
        )}`,
        "_blank"
      );
      return true;
    default:
      return false;
  }
}
