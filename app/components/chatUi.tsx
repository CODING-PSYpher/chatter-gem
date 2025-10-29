"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";

type Role = "user" | "assistant" | "system";

type Message = {
  id: string;
  role: Role;
  text: string;
};

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      role: "assistant",
      text: "Hi — I’m ChatterGem. Ask me anything.",
    },
  ]);
  const [value, setValue] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  function addMessage(role: Role, text: string) {
    const msg: Message = {
      id: Math.random().toString(36).slice(2, 9),
      role,
      text,
    };
    setMessages((m) => [...m, msg]);
    return msg;
  }

  function LogOutBTN() {
    const router = useRouter();
    localStorage.removeItem("token");
    router.push("/");
  }

  async function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;

    setSending(true);
    addMessage("user", trimmed);
    setValue("");

    try {
      const res = await axios.post("/api/gemini", { prompt: trimmed });
      const reply = res.data.reply || "I couldn’t generate a reply.";
      addMessage("assistant", reply);
    } catch (err) {
      console.error("Gemini API error:", err);
      addMessage("assistant", "Sorry — something went wrong. Try again.");
    } finally {
      setSending(false);
    }
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }
  function clearChat() {
    setMessages([]);
  }

  return (
    <div className="min-h-screen flex bg-neutral-900 text-white font-sans relative">
      <aside className="w-72 hidden md:flex flex-col bg-neutral-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold">
              G
            </div>
            <div>
              <div className="font-semibold text-amber-300">ChatterGem</div>
              <div className="text-sm text-white/60">AI Chat</div>
            </div>
          </div>
          <button
            className="text-sm text-white/60 hover:text-white"
            onClick={clearChat}
            title="Clear chat"
          >
            Clear
          </button>
        </div>

        <div className="text-white/60 text-sm mb-2">Recent</div>
        <ul className="space-y-2">
          <li className="p-2 rounded-md bg-neutral-700 text-white/80">
            Welcome conversation
          </li>
          <li className="p-2 rounded-md text-white/60 hover:bg-neutral-700">
            These are just for showcase
          </li>
          <li className="p-2 rounded-md text-white/60 hover:bg-neutral-700">
            It does nothing
          </li>
        </ul>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="p-4 bg-neutral-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-amber-300">
                Conversation
              </div>
              <div className="text-sm text-white/60">
                Ask anything — press Enter to send
              </div>
            </div>
            <button
              className="px-3 py-1 rounded-md bg-amber-400 text-black font-semibold hover:bg-amber-500"
              onClick={LogOutBTN}
            >
              Log Out
            </button>
          </div>
        </header>

        <div ref={listRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl"
            >
              {m.role === "assistant" ? (
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-md bg-neutral-700 flex items-center justify-center font-semibold text-white/80">
                    AI
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-1">Assistant</div>
                    <div className="rounded-md bg-neutral-800 p-4 whitespace-pre-wrap">
                      {m.text}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <div>
                    <div className="text-xs text-white/60 mb-1 text-right">
                      You
                    </div>
                    <div className="rounded-md bg-amber-300/20 p-4 text-right">
                      {m.text}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="w-full bg-neutral-800 p-4 sticky bottom-0">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Enter to send, Shift+Enter for newline)"
              className="flex-1 bg-neutral-700 rounded-md p-3 min-h-[50px] resize-none focus:outline-none placeholder:text-white/50 text-white"
            />
            <button
              onClick={handleSend}
              disabled={sending}
              className="px-4 py-2 rounded-md bg-amber-400 text-black font-semibold disabled:opacity-50 hover:bg-amber-500"
            >
              Send
            </button>
            <div className="text-sm text-white/60">
              {sending ? "Thinking..." : "Ready"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
