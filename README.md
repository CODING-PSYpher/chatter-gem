# 💎 ChatterGem

**ChatterGem** is an intelligent and elegant **AI-powered chatbot** built with the **Gemini API**, designed to provide human-like, context-aware conversations.  
Developed using **Next.js**, **NextAuth**, **Prisma**, and **TailwindCSS**, it blends modern web technologies with the power of generative AI to deliver a smooth, secure, and visually appealing user experience.

---

## 🚀 Features

- 💬 **AI Chat Interface** — Seamless chat experience powered by the **Gemini API**.
- 🔐 **Authentication** — Secure login and session handling using **NextAuth**.
- 💾 **Database Integration** — Persistent user and chat data managed with **Prisma** ORM.
- 🎨 **Responsive UI** — Beautiful, minimal, and responsive design built with **TailwindCSS**.
- ⚡ **Next.js 14 App Router** — Optimized performance, server actions, and API routes.

---

## 🧠 Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | [Next.js](https://nextjs.org/) |
| Authentication | [NextAuth.js](https://next-auth.js.org/) |
| Backend | [Gemini API](https://ai.google.dev/) |
| Database ORM | [Prisma](https://www.prisma.io/) |
| Styling | [TailwindCSS](https://tailwindcss.com/) |
| Deployment | Vercel / Node.js server |

---

## ⚙️ Installation & Setup

git clone "the link of this repo"
cd chattergem
npm install

# Create a .env file in the project root and add the following:

GEMINI_API_KEY=your_gemini_api_key
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your_database_url

# Initialize Prisma
npx prisma generate
npx prisma migrate dev

# Run the Development Server
npm run dev

