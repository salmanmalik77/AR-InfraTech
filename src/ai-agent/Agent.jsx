// src/ai-agent/Agent.jsx
import "./Agent.css";
import { askUsersOperator } from "./usersOperator";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { useNavigate } from "react-router-dom";

/* ====== Config for basename (dev: "", prod: "/AR-InfraTech") ====== */
const BASENAME = process.env.REACT_APP_BASENAME || "";
const joinBase = (p) =>
  (BASENAME + p).replace(/\/{2,}/g, "/").replace(/(?<!:)\/+$/, "") || "/";

/* ====== Interpreter with safer matching (word boundaries) ====== */
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
    "सर्वीसज",
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
  "مدद",
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
        /search|find|look for|खोज|खोजें|तलाश|جستجو|तलाश|శోధించు|వెతుకు/gi,
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

/* ====== UI ====== */
const POS_KEY = "ai-fab-pos-v1";
const DRAG_THRESHOLD = 6; // px

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

  // panel positioning
  const panelRef = useRef(null);
  const [panelPos, setPanelPos] = useState({ x: null, y: null });
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  // drag state
  const fabRef = useRef(null);
  const dragging = useRef(false);
  const startPt = useRef({ x: 0, y: 0 });
  const offset = useRef({ dx: 0, dy: 0 });

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
      const nx = cx - offset.current.dx;
      const ny = cy - offset.current.dy;
      setFabPos({ x: nx, y: ny });
    }
    const onUp = () => {
      dragging.current = false;
    };
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

      const FAB_W = 56;
      const GAP = 12;
      const PAD = 8;
      const W = window.innerWidth;
      const H = window.innerHeight;

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
      const panelEl = panelRef.current;
      const fabEl = fabRef.current;
      const t = e.target;
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
    const dx = Math.abs(cx - startPt.current.x);
    const dy = Math.abs(cy - startPt.current.y);
    const moved = dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD;
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

  const hardNavigate = (path) => {
    const url = joinBase(path);
    try {
      navigate(url);
    } catch {
      window.location.href = url;
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const q = input.trim();
    setInput("");
    setError(null);
    addUser(q);
    setThinking(true);

    try {
      // 0) UI-first: make sure we always "change" URL so /users re-renders
      const openUsersRe =
        /\b(open|show|list|see|view)\b.*\busers?\b|\buser\s+list\b/i;
      const createUserRe =
        /\b(create|add|register)\b.*\buser\b|\bnew\s+user\b/i;

      if (openUsersRe.test(q)) {
        addAgent("Opening Users list…");
        setOpen(false);
        const ts = Date.now();
        setTimeout(() => hardNavigate(`/users?show=1&ts=${ts}`), 0);
        setThinking(false);
        return;
      }
      if (createUserRe.test(q)) {
        addAgent("Opening Create User form…");
        setOpen(false);
        const ts = Date.now();
        setTimeout(() => hardNavigate(`/users?new=1&ts=${ts}`), 0);
        // continue to operator for parsing (if key exists)
      }

      // 1) Token-using path only for user-related prompts
      const userOpsPattern =
        /\b(users?|user list|list users|create user|add user|register)\b/i;
      if (userOpsPattern.test(q)) {
        const operatorResponse = await askUsersOperator(q);
        if (operatorResponse) {
          addAgent(operatorResponse);
          setThinking(false);
          return;
        }
        // If null → fall back to regular site intents
      }

      // 2) Normal site intents
      const intent = interpret(q);
      if (intent.type === "UNKNOWN") {
        addAgent(
          "I didn’t catch that. Try: About, Services, Projects, Contact — or say 'help'."
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
      "About",
      "Services",
      "Projects",
      "How we work",
      "Contact",
      "Reach us",
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
              placeholder="e.g., 'open users', 'create user', 'About', 'Reach us'"
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
            Tip: Try “open users”, “create user”, or “How we work”.
          </div>
        </div>
      )}
    </>
  );
}
