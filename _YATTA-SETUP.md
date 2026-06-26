# Yatta Jr. — setup & hosted ("smart") mode

**Yatta Jr.** is the branded AI chat assistant in `assets/js/ask.js`. It runs a
**hybrid engine** with three answer paths and graceful fallback:

| Mode | Chip | What it is | Setup needed |
| --- | --- | --- | --- |
| **Curated** | `instant` | RAG over an embedded knowledge base, rendering hand-authored answers. Always works. | **None** — works on free static hosting out of the box. |
| **In-browser** | `private AI` | A small LLM (Qwen2.5-0.5B) downloaded and run **entirely in the visitor's browser** via WebGPU, grounded in the retrieved context. | **None** — opt-in per visitor via the "⚡ Run a private AI" button. Needs a desktop browser with WebGPU. |
| **Hosted** | `smart` | A serverless endpoint (Cloudflare Worker) that calls a real LLM with RAG context. | **This doc.** Optional. |

Priority order per query: **hosted → in-browser → curated.** Any error or
timeout in a higher tier silently falls through to the next, so the console is
**always** functional. The MODE chip in the header shows which path answered.

The default experience (curated + optional private AI) is excellent and needs
**zero setup**. Hosted mode is only for genuine, open-ended answers from a
large model.

---

## Turning on hosted ("smart") mode

1. Deploy one of the Cloudflare Workers below (it accepts `POST {q, context}`
   and returns `{answer}`, with CORS).
2. Set the endpoint at the **top of `assets/js/ask.js`**:

   ```js
   var CONFIG = {
     endpoint: "https://yatta.<your-subdomain>.workers.dev", // <-- your Worker URL
     ...
   };
   ```

3. That's it. The console now tries the Worker first and shows `smart` in the
   mode chip; if the Worker errors or times out, it falls back to in-browser
   (if enabled) or curated automatically.

The browser only ever sends `{ q, context }`. **Your API key stays on the
Worker** — never ship it to the browser. The Worker is the trust boundary.

---

## Option A — Free: Cloudflare Workers AI (Llama 3.1 8B)

No external API key; runs on Cloudflare's own inference. Bind Workers AI in
`wrangler.toml`:

```toml
name = "yatta"
main = "worker.js"
compatibility_date = "2026-01-01"

[ai]
binding = "AI"
```

```js
// worker.js — Cloudflare Workers AI (free tier)
const ALLOW_ORIGIN = "https://www.yatawara.com"; // or "*" while testing

const SYSTEM =
  "You are Yatta Jr., Dr. Anjana Yatawara's website assistant. " +
  "Answer ONLY from the provided context about Anjana. Be concise, warm, " +
  "accurate, third-person. If it's not in the context, say you're unsure " +
  "and suggest emailing ayatawara@csub.edu.";

const CORS = {
  "Access-Control-Allow-Origin": ALLOW_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    if (request.method !== "POST") {
      return new Response("POST only", { status: 405, headers: CORS });
    }

    let q = "", context = "";
    try {
      const body = await request.json();
      q = (body.q || "").toString().slice(0, 2000);
      context = (body.context || "").toString().slice(0, 12000);
    } catch (_) {
      return json({ answer: "" }, 400);
    }
    if (!q.trim()) return json({ answer: "" });

    try {
      const out = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          { role: "system", content: SYSTEM },
          {
            role: "user",
            content:
              "Context about Anjana:\n" + context +
              "\n\nQuestion: " + q +
              "\n\nAnswer concisely from the context above.",
          },
        ],
        max_tokens: 600,
        temperature: 0.4,
      });
      return json({ answer: (out.response || "").trim() });
    } catch (err) {
      // On failure, return empty so ask.js falls back to in-browser/curated.
      return json({ answer: "" }, 502);
    }
  },
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", ...CORS },
  });
}
```

Deploy: `npx wrangler deploy`.

---

## Option B — Claude (Anthropic API, model `claude-opus-4-8`)

Highest-quality answers. Store the key as an encrypted secret — never in code:

```sh
npx wrangler secret put ANTHROPIC_API_KEY
```

```js
// worker.js — Claude via the Anthropic Messages API (raw HTTPS, no SDK needed)
const ALLOW_ORIGIN = "https://www.yatawara.com"; // or "*" while testing

const SYSTEM =
  "You are Yatta Jr., Dr. Anjana Yatawara's website assistant. " +
  "Answer ONLY from the provided context about Anjana. Be concise, warm, " +
  "accurate, third-person. If it's not in the context, say you're unsure " +
  "and suggest emailing ayatawara@csub.edu.";

const CORS = {
  "Access-Control-Allow-Origin": ALLOW_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    if (request.method !== "POST") {
      return new Response("POST only", { status: 405, headers: CORS });
    }

    let q = "", context = "";
    try {
      const body = await request.json();
      q = (body.q || "").toString().slice(0, 2000);
      context = (body.context || "").toString().slice(0, 12000);
    } catch (_) {
      return json({ answer: "" }, 400);
    }
    if (!q.trim()) return json({ answer: "" });

    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-opus-4-8", // current, most-capable Opus
          max_tokens: 700,
          system:
            SYSTEM + "\n\n<context>\n" + context + "\n</context>",
          // Adaptive thinking is recommended on 4.6+ models. Do NOT pass
          // budget_tokens (removed on Opus 4.8 — it returns a 400).
          thinking: { type: "adaptive" },
          output_config: { effort: "low" }, // concierge Q&A is light
          messages: [{ role: "user", content: q }],
        }),
      });
      const data = await r.json();
      // Guard stop_reason (e.g. "refusal") before reading content; only
      // collect text blocks (skip thinking blocks).
      const text = (data.content || [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("")
        .trim();
      return json({ answer: text });
    } catch (err) {
      return json({ answer: "" }, 502); // ask.js falls back gracefully
    }
  },
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", ...CORS },
  });
}
```

`wrangler.toml` for Option B:

```toml
name = "yatta"
main = "worker.js"
compatibility_date = "2026-01-01"
# ANTHROPIC_API_KEY is set via `wrangler secret put`, not here.
```

Deploy: `npx wrangler deploy`.

---

## Notes

- **Response shape:** `ask.js` accepts either JSON (`{ "answer": "..." }`) or a
  plain-text body. Returning empty/non-200 makes the console fall through to
  the next mode — so a Worker hiccup never breaks the page.
- **CORS:** set `ALLOW_ORIGIN` to your site's origin in production (use `"*"`
  only while testing).
- **Timeout:** the client aborts a hosted call after `CONFIG.hostedTimeoutMs`
  (18s) and falls back. Keep `max_tokens` modest so answers return promptly.
- **Cost control (optional):** add Cloudflare KV caching keyed by `q`, and/or
  rate limiting, to keep hosted mode cheap.
- **In-browser model:** to change it, edit `CONFIG.webllmModels` in `ask.js`
  (defaults to `Qwen2.5-0.5B-Instruct-q4f16_1-MLC`, falling back to
  `SmolLM2-360M-Instruct-q4f16_1-MLC`). It is loaded on demand from
  `https://esm.run/@mlc-ai/web-llm` only after the visitor clicks the button —
  there are **no new dependencies on the default page load**.
