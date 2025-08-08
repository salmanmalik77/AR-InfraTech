// src/ai-agent/interpreter.js

// Map your visible sections to their DOM IDs
export const SECTION_IDS = {
  home: "home",
  about: "about",
  services: "services",
  projects: "projects",
  working: "working",
  testimonials: "testimonials",
  contact: "contact",
};

// Multilingual keywords that signal each section
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
    "پروسس",
    "పని విధానం",
  ],
  testimonials: [
    "testimonials",
    "reviews",
    "ग्राहक",
    "آراء",
    "سریاہات",
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
    "رابطہ",
    "مدد",
    "سپورٹ",
    "سہائتا",
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
const WHATSAPP_WORDS = [
  "whatsapp",
  "व्हाट्सएप",
  "واتس",
  "وٹس ایپ",
  "ਵਟਸਐਪ",
  "వాట్సాప్",
];
const CALL_WORDS = [
  "call",
  "dial",
  "कॉल",
  "फोन",
  "کال",
  "کول",
  "کॉल کریں",
  "కాల్",
  "ఫోన్",
];
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

function norm(s) {
  return (s || "").toLowerCase().trim();
}

export function interpret(input) {
  const text = norm(input);

  // special "reach us" -> contact
  if (/\breach\s*us\b/.test(text))
    return { type: "SCROLL", targetId: SECTION_IDS.contact };

  // section by keywords
  for (const [name, keys] of Object.entries(KEYWORDS)) {
    if (keys.some((k) => text.includes(k)))
      return { type: "SCROLL", targetId: SECTION_IDS[name] };
  }

  // explicit #id
  const idMatch = text.match(
    /(?:go to|open|navigate to|जाओ|खोलो|کھولو|وهاں جاؤ|వెళ్ళు)\s+#?([a-z0-9\-_]+)/i
  );
  if (idMatch) {
    const id = idMatch[1].toLowerCase();
    if (Object.values(SECTION_IDS).includes(id))
      return { type: "SCROLL", targetId: id };
  }

  // search intent (placeholder for now)
  if (SEARCH_WORDS.some((k) => text.includes(k))) {
    const q = text
      .replace(
        /search|find|look for|खोज|खोजें|तलाश|جستجو|تلاش|శోధించు|వెతుకు/gi,
        ""
      )
      .trim();
    if (q) return { type: "SEARCH", query: q };
  }

  if (HELP_WORDS.some((k) => text.includes(k))) return { type: "HELP" };

  if (CALL_WORDS.some((k) => text.includes(k)))
    return { type: "CALL", number: "<YOUR_PHONE_NUMBER>" };
  if (WHATSAPP_WORDS.some((k) => text.includes(k)))
    return { type: "WHATSAPP", message: "" };

  return { type: "UNKNOWN", original: input };
}
