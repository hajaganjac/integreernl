export const ASSISTANT_SYSTEM_PROMPT = `You are the IntegreerNL study assistant, a friendly Dutch-language (NT2) tutor helping adults prepare for the Dutch B1 civic integration exam (inburgeringsexamen).

Rules:
- Keep answers short, simple and encouraging — the learner may be tired after work and studying independently.
- When explaining grammar, always give at least one clear example sentence in Dutch with an English translation.
- Cover topics relevant to the exam: Dutch grammar, vocabulary, reading/writing/listening/speaking practice, and Kennis van de Nederlandse Maatschappij (KNM, Dutch society/culture).
- You are a study aid, not an official source. If asked about visas, legal deadlines, or official procedures, remind the learner to verify with DUO / IND / Rijksoverheid or their gemeente.
- Never invent legal or financial facts you are not sure about.`;

interface KeywordReply {
  keywords: string[];
  reply: string;
}

const FALLBACK_LIBRARY: KeywordReply[] = [
  {
    keywords: ["hebben", "zijn", "auxiliary", "hulpwerkwoord"],
    reply:
      "Great question! In the perfect tense, most Dutch verbs use **hebben**, but verbs of movement or change of state usually use **zijn**.\n\n- *Ik heb gewerkt.* (I have worked — hebben)\n- *Ik ben gegaan.* (I have gone — zijn, because it's movement)\n\nQuick tip: if the verb describes moving from A to B, or a change of state (like *worden* — to become), try **zijn** first.",
  },
  {
    keywords: ["de", "het", "lidwoord", "article"],
    reply:
      "Dutch has two articles: **de** and **het**. There's no perfect rule, but: most plural nouns use *de* (de huizen), and most diminutives (-je) use *het* (het huisje). The best strategy is to learn the article *with* each new word, e.g. \"de tafel\", \"het huis\", rather than trying to guess.",
  },
  {
    keywords: ["woordvolgorde", "word order", "zinsbouw", "sentence structure"],
    reply:
      "Dutch main clauses follow a **verb-second** rule: the conjugated verb is always the second element.\n\n- *Ik werk vandaag.* (I work today.)\n- *Vandaag werk ik.* (Today, I work.) — notice the verb stays in position 2, even when the sentence starts differently.\n\nIn subclauses (after *omdat*, *dat*, *als*), the verb moves to the **end**: *Ik blijf thuis, omdat ik ziek ben.*",
  },
  {
    keywords: ["knm", "nederlandse maatschappij", "dutch society", "koning", "gemeente"],
    reply:
      "For Kennis van de Nederlandse Maatschappij (KNM), focus on how Dutch government, healthcare, housing, and work function day to day — check the KNM module in your course for structured lessons on this. If you need an official, up-to-date answer about a specific rule, always double-check with your gemeente or Rijksoverheid.nl.",
  },
  {
    keywords: ["luisteren", "listening", "verstaan"],
    reply:
      "For listening practice, try NPO Radio 1 or NOS Jeugdjournaal (news for children — spoken slowly and clearly). In the exam, you'll usually hear each fragment twice: use the first listen for the general idea, the second for specific details. Check the Listening module for more strategies!",
  },
  {
    keywords: ["spreken", "speaking", "gesprek"],
    reply:
      "For speaking practice, try describing your day out loud, or role-play a common situation (at the doctor, in a shop). Remember: at B1 level, keeping the conversation going clearly matters more than perfect grammar. Want to practice a specific situation together? Tell me which one!",
  },
  {
    keywords: ["schrijven", "writing", "brief", "email"],
    reply:
      "Most short Dutch writing tasks follow: greeting → short message (2-4 sentences) → closing. For formal messages use \"Geachte heer/mevrouw\" and \"Met vriendelijke groet\". For informal ones, \"Beste\" and \"Groetjes\" work well. Want to practice writing a specific message, like calling in sick?",
  },
  {
    keywords: ["exam", "examen", "duo", "inburgering", "afspraak"],
    reply:
      "For official exam registration, dates, fees or DUO loan questions, please check inburgeren.nl or contact DUO directly — that's outside what I can reliably confirm. I'm here to help you practice the language and KNM content itself!",
  },
];

const GENERIC_FALLBACKS = [
  "That's a good question. Could you tell me a bit more — for example, is this about grammar, vocabulary, or one of the exam parts (reading, writing, listening, speaking, KNM)?",
  "I want to give you a useful answer here. Try asking about a specific topic, like \"when do I use hebben vs zijn\" or \"how do I write a formal email\", and I'll walk you through it with examples.",
];

export function getFallbackReply(message: string): string {
  const lower = message.toLowerCase();

  for (const entry of FALLBACK_LIBRARY) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return entry.reply;
    }
  }

  const hash = Array.from(message).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return GENERIC_FALLBACKS[hash % GENERIC_FALLBACKS.length];
}

export async function callOpenAI(
  history: { role: "user" | "assistant"; content: string }[]
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [{ role: "system", content: ASSISTANT_SYSTEM_PROMPT }, ...history],
        temperature: 0.4,
        max_tokens: 500,
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  }
}
