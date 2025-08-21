// src/ai-agent/Agent.jsx
import "./Agent.css";
import { askUsersOperator } from "./usersOperator";
import { askLLM, collectSiteContext } from "./llmClient";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { useNavigate } from "react-router-dom";

/* ====== Interpreter (site sections) ====== */
const SECTION_IDS = {
  home: "home",
  about: "about",
  services: "services",
  projects: "projects",
  working: "working",
  testimonials: "testimonials",
  contact: "contact",
};

const KEYWORDS = {
  home: ["home", "main", "start", "inicio", "घर", "ہوم", "హోమ్"],
  about: [
    "about",
    "company",
    "अबाउट",
    "हमारे बारे",
    "ہمارے بارے",
    "మా గురించి",
  ],
  services: [
    "services",
    "offerings",
    "सेवाएं",
    "سروسز",
    "سہولیات",
    "సర్వీసులు",
  ],
  projects: [
    "projects",
    "portfolio",
    "काम",
    "پراجیکٹس",
    "प्रोजेक्ट्स",
    "ప్రాజెక్ట్స్",
  ],
  working: [
    "how we work",
    "process",
    "working",
    "workflow",
    "प्रक्रिया",
    "عمل",
    "పని విధానం",
  ],
  testimonials: [
    "testimonials",
    "reviews",
    "ग्राहक",
    "آراء",
    "समीक्षाएं",
    "సాక్ష్యాలు",
  ],
  contact: [
    "contact",
    "support",
    "help",
    "enquiry",
    "inquiry",
    "reach us",
    "get in touch",
    "संपर्क",
    "सपोर्ट",
    "मदद",
    "रابطہ",
    "مدد",
    "सپورٹ",
    "సంప్రదించండి",
    "సహాయం",
  ],
};

const SEARCH_WORDS = [
  "search",
  "find",
  "look for",
  "खोज",
  "खोजें",
  "तलाश",
  "جستجو",
  "تلاش",
  "శోధించు",
  "వెతుకు",
];
const WHATSAPP_WORDS = ["whatsapp", "व्हाट्सएप", "واتس", "وٹس ایپ", "వాట్సాప్"];
const CALL_WORDS = ["call", "dial", "कॉल", "फोन", "کال", "کول", "కాల్", "ఫోన్"];
const HELP_WORDS = [
  "help",
  "guide",
  "how",
  "कैसे",
  "मदद",
  "مدد",
  "کیسے",
  "ఎలా",
  "సహాయం",
];

const HEADER_OFFSET = 100;
const escapeReg = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function hasWord(text, w) {
  if (!w) return false;
  const re = new RegExp(
    `(?:^|[^\\p{L}\\p{N}])${escapeReg(w)}(?:[^\\p{L}\\p{N}]|$)`,
    "iu"
  );
  return re.test(text);
}
const anyWord = (text, arr) => arr.some((w) => hasWord(text, w));
const norm = (s) => (s || "").normalize("NFC").toLowerCase().trim();

function interpret(input) {
  const text = norm(input);
  if (/\breach\s*us\b/i.test(text))
    return { type: "SCROLL", targetId: SECTION_IDS.contact };
  for (const [name, keys] of Object.entries(KEYWORDS)) {
    if (anyWord(text, keys))
      return { type: "SCROLL", targetId: SECTION_IDS[name] };
  }
  const idMatch = text.match(
    /(?:go to|open|navigate to|जाओ|खोलो|کھولو|వెళ్ళు)\s+#?([a-z0-9\-_]+)/i
  );
  if (idMatch) {
    const id = idMatch[1].toLowerCase();
    if (Object.values(SECTION_IDS).includes(id))
      return { type: "SCROLL", targetId: id };
  }
  if (anyWord(text, SEARCH_WORDS)) {
    const q = text
      .replace(
        /search|find|look for|खोज|खोजें|तलाश|جستجو|تلاش|శోధించు|వెతుకు/gi,
        ""
      )
      .trim();
    if (q) return { type: "SEARCH", query: q };
  }
  if (anyWord(text, HELP_WORDS)) return { type: "HELP" };
  if (anyWord(text, CALL_WORDS))
    return { type: "CALL", number: "<YOUR_PHONE_NUMBER>" };
  if (anyWord(text, WHATSAPP_WORDS)) return { type: "WHATSAPP", message: "" };
  return { type: "UNKNOWN", original: input };
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: y, behavior: "smooth" });
  return true;
}
function executeIntent(intent) {
  switch (intent.type) {
    case "SCROLL":
      return scrollToId(intent.targetId);
    case "SEARCH":
      alert(`Searching for: ${intent.query}`);
      return true;
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

/* ====== UI & Agent ====== */
const POS_KEY = "ai-fab-pos-v1";
const DRAG_THRESHOLD = 6;

export default function Agent() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState(null);
  const [fabPos, setFabPos] = useState(null);
  const [messages, setMessages] = useState(() => [
    {
      role: "agent",
      text: "Hi! Ask me to open About / Services / Projects / Contact — in English, हिन्दी, اردو, తెలుగు.",
    },
  ]);

  // remember last operator command for manual confirm fallback
  const lastOpTextRef = useRef(null);

  // panel / drag
  const panelRef = useRef(null);
  const [panelPos, setPanelPos] = useState({ x: null, y: null });
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const fabRef = useRef(null);
  const dragging = useRef(false);
  const startPt = useRef({ x: 0, y: 0 });
  const offset = useRef({ dx: 0, dy: 0 });

  // === helpers ===
  const openUsersList = () => {
    try {
      navigate("/users?show=1");
    } catch {
      window.location.href = "/users?show=1";
    }
  };
  const looksLikeCreated = (s) =>
    /\buser\s+created\b|\bcreated\s*\(id:|\bcreatedId\b|✅\s*user\s*created/i.test(
      s || ""
    );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(POS_KEY);
      if (raw) setFabPos(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    if (fabPos) localStorage.setItem(POS_KEY, JSON.stringify(fabPos));
  }, [fabPos]);

  useEffect(() => {
    function onMove(e) {
      if (!dragging.current || !fabRef.current) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      setFabPos({ x: cx - offset.current.dx, y: cy - offset.current.dy });
    }
    const onUp = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  useLayoutEffect(() => {
    function placePanel() {
      if (!open || !fabPos || !panelRef.current) return;
      const FAB_W = 56,
        GAP = 12,
        PAD = 8,
        W = window.innerWidth,
        H = window.innerHeight;
      const pw = panelRef.current.offsetWidth || 360;
      const ph = panelRef.current.offsetHeight || 260;
      let x = fabPos.x - pw - GAP;
      if (x < PAD) x = fabPos.x + FAB_W + GAP;
      x = clamp(x, PAD, W - pw - PAD);
      let y = fabPos.y + FAB_W / 2 - ph / 2;
      y = clamp(y, PAD, H - ph - PAD);
      setPanelPos({ x, y });
    }
    placePanel();
    const onResize = () => placePanel();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, fabPos]);

  useEffect(() => {
    if (!open) return;
    function onDown(e) {
      const panelEl = panelRef.current,
        fabEl = fabRef.current,
        t = e.target;
      const insidePanel = panelEl && panelEl.contains(t);
      const insideFab = fabEl && fabEl.contains(t);
      if (!insidePanel && !insideFab) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]);

  function startDrag(e) {
    const btn = fabRef.current;
    if (!btn) return;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    startPt.current = { x: cx, y: cy };
    dragging.current = true;
    const rect = btn.getBoundingClientRect();
    offset.current = { dx: cx - rect.left, dy: cy - rect.top };
  }
  function maybeToggle(e) {
    const cx = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const cy = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const moved =
      Math.abs(cx - startPt.current.x) > DRAG_THRESHOLD ||
      Math.abs(cy - startPt.current.y) > DRAG_THRESHOLD;
    if (!moved) setOpen((v) => !v);
  }

  function addAgent(text) {
    setMessages((m) => [...m, { role: "agent", text }]);
  }
  function addUser(text) {
    setMessages((m) => [...m, { role: "user", text }]);
  }
  function friendlyName(id) {
    const map = {
      [SECTION_IDS.home]: "Home",
      [SECTION_IDS.about]: "About",
      [SECTION_IDS.services]: "Services",
      [SECTION_IDS.projects]: "Projects",
      [SECTION_IDS.working]: "How we work",
      [SECTION_IDS.testimonials]: "Testimonials",
      [SECTION_IDS.contact]: "Contact",
    };
    return map[id] || id;
  }

  // crude signal the LLM asked for confirm
  const containsConfirmRequest = (s) =>
    /reply\s+['"]?confirm['"]?|confirm\s*=\s*true/i.test(s || "");

  // decide if we can auto-confirm (user gave an email in the sentence)
  const canAutoConfirm = (original) =>
    /@/.test(original) || /\bemail\b/i.test(original);

  async function onSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const q = input.trim();
    setInput("");
    setError(null);
    addUser(q);
    setThinking(true);

    try {
      // Manual confirm path
      if (/^confirm\b/i.test(q)) {
        if (!lastOpTextRef.current) {
          addAgent("Nothing to confirm. Ask me to create a user first.");
        } else {
          const res = await askUsersOperator(lastOpTextRef.current, true);
          if (res) {
            addAgent(res);
            if (looksLikeCreated(res)) {
              lastOpTextRef.current = null;
              openUsersList();
            }
          }
          lastOpTextRef.current = null; // avoid loops
        }
        setThinking(false);
        return;
      }

      // Users page navigation (UI) — open list view card
      const openUsersRe =
        /\b(open|show|list|see|view)\b.*\busers?\b|\buser\s+list\b/i;
      if (openUsersRe.test(q)) {
        addAgent("Opening Users list…");
        setOpen(false);
        openUsersList();
        setThinking(false);
        return;
      }

      // Create/list via operator (LLM) — no UI form pop-up
      const userOpsPattern =
        /\b(users?|user list|list users|create user|add user|register)\b/i;
      if (userOpsPattern.test(q)) {
        lastOpTextRef.current = q;

        // 1) first call (may ask to confirm or may answer directly e.g. list)
        const res1 = await askUsersOperator(q, false);
        if (res1) {
          addAgent(res1);
          if (looksLikeCreated(res1)) {
            lastOpTextRef.current = null;
            openUsersList();
            setThinking(false);
            return;
          }
        }

        // 2) auto-confirm once if it asked for confirmation and we have enough info (email present)
        if (res1 && containsConfirmRequest(res1) && canAutoConfirm(q)) {
          const res2 = await askUsersOperator(q, true);
          if (res2) {
            addAgent(res2);
            if (looksLikeCreated(res2)) {
              lastOpTextRef.current = null;
              openUsersList();
            }
          }
          lastOpTextRef.current = null; // clear after confirm attempt
        }

        setThinking(false);
        return;
      }

      // default site actions OR general Q&A
      const intent = interpret(q);
      if (intent.type === "UNKNOWN") {
        // Send to general chat endpoint so it can answer random questions
        const siteContext = collectSiteContext();
        const content = await askLLM({
          messages: [{ role: "user", content: q }],
          siteContext,
          language: undefined,
        });
        addAgent(
          content || "Sorry, I couldn’t reach the AI service right now."
        );
      } else if (intent.type === "HELP") {
        addAgent(
          "You can say: About / Services / Projects / Working / Testimonials / Contact. Also try 'Reach us', 'Call', 'WhatsApp', or 'Search cement rates'."
        );
      } else {
        const ok = executeIntent(intent);
        if (intent.type === "SCROLL") {
          addAgent(
            `Sure — taking you to <b>${friendlyName(intent.targetId)}</b>.`
          );
        } else if (intent.type === "SEARCH") {
          addAgent(
            `Searching for “${intent.query}”… (we’ll hook real search soon).`
          );
        } else if (intent.type === "CALL") {
          addAgent("Dialing the number…");
        } else if (intent.type === "WHATSAPP") {
          addAgent("Opening WhatsApp…");
        } else if (!ok) {
          addAgent("Hmm, I couldn’t do that. Try another command.");
        }
      }
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setThinking(false);
    }
  }

  const suggestions = useMemo(
    () => [
      "open users",
      "list users",
      "create user john john@example.com",
      "confirm",
      "About",
    ],
    []
  );

  return (
    <>
      <button
        className="ai-fab"
        ref={fabRef}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        onMouseUp={maybeToggle}
        onTouchEnd={maybeToggle}
        style={
          fabPos
            ? {
                left: fabPos.x,
                top: fabPos.y,
                right: "auto",
                bottom: "auto",
                position: "fixed",
              }
            : undefined
        }
        aria-label="AI Assistant"
        title="AI Assistant"
      >
        {open ? "×" : "AI"}
      </button>

      {open && (
        <div
          className="ai-panel"
          role="dialog"
          aria-modal="true"
          aria-label="AI Assistant"
          ref={panelRef}
          style={{
            position: "fixed",
            left: panelPos.x ?? undefined,
            top: panelPos.y ?? undefined,
            right: panelPos.x != null ? "auto" : undefined,
            bottom: panelPos.y != null ? "auto" : undefined,
          }}
        >
          <button
            className="ai-close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ×
          </button>

          <div style={{ fontWeight: 700 }}>
            Ask me to navigate or do tasks — English / हिन्दी / اردو / తెలుగు
          </div>

          <div className="ai-chat">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                <div
                  className="bubble"
                  dangerouslySetInnerHTML={{ __html: m.text }}
                />
              </div>
            ))}
            {thinking && (
              <div className="msg agent">
                <div className="bubble">...</div>
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="ai-row">
            <input
              className="ai-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 'create user John john@example.com', 'list users', 'open users', 'confirm', 'Who is Salman Khan?'"
              aria-label="Type a command"
            />
            <button type="submit" className="ai-go" disabled={thinking}>
              {thinking ? "…" : "Go"}
            </button>
          </form>

          {error && <div className="ai-error">{error}</div>}

          <div className="ai-suggests" aria-label="Suggestions">
            {suggestions.map((s) => (
              <button
                key={s}
                className="ai-chip"
                type="button"
                onClick={() => setInput(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="ai-hint">
            Tip: “create user alex alex@sample.com 98765 engineer Delhi” → I’ll
            create it directly.
          </div>
        </div>
      )}
    </>
  );
}
