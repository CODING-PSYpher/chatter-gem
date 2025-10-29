"use client";
import { useRouter } from "next/navigation";
import ArrowIcon from "./icons/arrowIcon";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-800 via-teal-700 to-amber-600 text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10 z-0" />
      <div className="relative z-10">
        <nav className="flex justify-between items-center px-10 py-6 border-b border-white/20">
          <h1 className="text-3xl font-extrabold text-amber-300">ChatterGEM</h1>

          <div className="flex gap-4">
            <button
              className="bg-amber-400 hover:bg-amber-500 text-black px-4 py-2 rounded-xl font-semibold"
              onClick={() => router.push("/signin")}
            >
              Sign in
            </button>
            
          </div>
        </nav>

        <section className="flex flex-col items-center text-center px-6 py-24">
          <div className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Chat Smarter with <span className="text-amber-300">ChatterGem</span>
          </div>
          <p className="text-xl text-white/80 mb-10 max-w-2xl">
            Experience the power of Gemini AI. Build intelligent conversations
            effortlessly.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <button
              className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-xl text-lg font-semibold flex items-center gap-2"
              onClick={() => router.push("/signin")}
            >
              Get Started <ArrowIcon />
            </button>
          </div>
        </section>

        <footer className="text-center py-8 border-t border-white/20 text-white/60">
          © ChatterGem. Built with ❤️ BY  <span><a href="https://x.com/CODING_PSYpher" target="_blanck">PUSHPANJAY CHANDRA</a></span>.
        </footer>
      </div>
    </main>
  );
}
