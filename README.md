# 🏡 Naman Estates — Property Post Maker

A live tool that turns 4 simple inputs into a polished, ready-to-share property post — complete with logo, brand colors, and contact details added automatically. Built for the MLH Claude intern practical assignment.

🔗 **Live demo:** [naman-estates-post-maker.vercel.app](https://naman-estates-post-maker.vercel.app/)
🎥 **Build walkthrough:** [Watch on Google Drive](https://drive.google.com/file/d/1l6wl-ZSGNiMU0G4uiYI_hkuDPoBs4peb/view?usp=sharing)

---

## ✨ What it does

Fill in four things about a property:

- 🏠 **Property & Type** — property category (Apartment, Villa, Independent House, Plot, Commercial, etc.) plus configuration (1 BHK–5+ BHK)
- 📍 **Location** — locality, city, and state
- 💰 **Price** — a draggable price slider from ₹20 Lakh to ₹10 Cr+
- ⭐ **Highlights** — up to 5 feature tags, with smart suggestions that reorder based on the selected property type and price tier

...and the tool instantly generates a designed, downloadable post card in one of three visual templates, with the Naman Estates logo, wordmark, and contact line composited in automatically — no manual design work required.

---

## 🚀 Features

- 🎨 **Three design templates** — Onyx Luxury (dark, premium), Ivory Minimal (light, clean), and Sunset Bold (warm gradient) — switch between them with a live animated preview
- 🧠 **Smart structured inputs** — a connected Property Type + Configuration picker, a Location field with city/state auto-fill, and a non-linear price slider, instead of raw free-text fields
- 🤖 **AI-assisted highlight suggestions** — powered by the Groq API, with a reliable rule-based fallback if the API is unavailable, so the tool never breaks
- 📷 **Optional property photo upload** — drag in a photo and it composites into any of the three templates behind the post details
- ⬇️ **One-click PNG export** — download the finished post at 1080×1350 (Instagram-ready), retina quality
- 📱 **Fully responsive, animated UI** — 3D tilt on the live preview, smooth template transitions, and a subtle architectural line-art background

---

## 🛠️ Tech stack

| Layer | Tech |
|---|---|
| Framework | React + TypeScript + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Export | html-to-image |
| AI | Groq API (with graceful fallback) |

---

## 🧑‍💻 Running locally

```bash
npm install
```

Create a `.env` file in the project root (see `.env.example`) and add your own Groq API key:

```
VITE_GROQ_API_KEY=your_groq_api_key_here
```

> ℹ️ The AI highlight suggestions feature is optional — the app works fully without a key, falling back to a rule-based suggestion system.

```bash
npm run dev
```

---

## 📦 Building for production

```bash
npm run build
```

---

## ☁️ Deployment

Deployed on **Vercel**. The `VITE_GROQ_API_KEY` environment variable must be added in the Vercel project's dashboard (`Settings → Environment Variables`) for AI highlight suggestions to work on the live site.

---

## 📋 Assignment brief

> Build and deploy a live "Post Maker" tool. The user fills 4 fields and the tool instantly generates a ready-to-share property post (a designed image/card), with your branding added automatically.

---

Built with 🧡 by **Naman**, using Claude.
