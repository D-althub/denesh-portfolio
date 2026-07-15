"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { MessageItem } from "@/data/portfolioData";
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Trash2,
  Mail,
  Clock,
  Send,
  Eye,
  Check,
  AlertCircle,
} from "lucide-react";

export function MessagesManager() {
  const { data, updateMessageStatus, deleteMessage } = usePortfolio();
  const { messages = [] } = data;

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "UNREAD" | "REPLIED">("ALL");

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      !searchQuery ||
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterType === "UNREAD") return matchesSearch && !msg.read;
    if (filterType === "REPLIED") return matchesSearch && msg.replied;
    return matchesSearch;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
            <MessageSquare className="h-6 w-6 text-[#D4AF37]" />
            <span>INQUIRY CORRESPONDENCE & DISPATCHES</span>
          </h2>
          <p className="font-mono text-xs text-zinc-400 mt-1 uppercase tracking-wider">
            Review incoming script commissions, screening proposals, and executive dialogues sent from the public Contact portal.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/15 px-4 py-1.5 font-mono text-xs font-bold text-[#D4AF37]">
            {unreadCount} Unread Dispatches
          </span>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121212] p-4 sm:p-6 rounded-xl border border-zinc-800 shadow-lg">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages by sender name, subject, or email..."
            className="w-full rounded-lg border border-zinc-800 bg-black pl-10 pr-4 py-2.5 font-mono text-xs text-white focus:border-[#D4AF37] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
          {(["ALL", "UNREAD", "REPLIED"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`rounded px-4 py-2.5 font-bold transition uppercase ${
                filterType === type
                  ? "border border-[#D4AF37] bg-[#D4AF37]/20 text-[#D4AF37]"
                  : "border border-zinc-800 bg-black text-zinc-400 hover:text-white"
              }`}
            >
              {type === "ALL" ? "All Dispatches" : type === "UNREAD" ? "Unread Only" : "Replied"}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-[#121212] p-12 text-center space-y-3">
          <AlertCircle className="h-10 w-10 text-zinc-600 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-white">No Dispatches Found</h3>
          <p className="font-mono text-xs text-zinc-500">
            {searchQuery || filterType !== "ALL"
              ? "Try adjusting your filter or search keywords above."
              : "All incoming correspondence will appear here automatically when submitted."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`group relative rounded-xl border p-6 transition space-y-4 shadow-xl ${
                !msg.read
                  ? "border-[#D4AF37]/60 bg-[#141410]"
                  : "border-zinc-800 bg-[#121212]"
              }`}
            >
              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  {!msg.read ? (
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#D4AF37] shrink-0 animate-pulse shadow-[0_0_10px_#D4AF37]" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  )}
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                      <span>{msg.name}</span>
                      {msg.replied && (
                        <span className="rounded border border-emerald-500/40 bg-emerald-950/40 px-2 py-0.5 font-mono text-[9px] uppercase text-emerald-300">
                          Replied
                        </span>
                      )}
                    </h3>
                    <a
                      href={`mailto:${msg.email}`}
                      className="font-mono text-xs text-[#D4AF37] hover:underline"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs text-zinc-500 shrink-0">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{msg.date}</span>
                  </span>
                </div>
              </div>

              {/* Subject & Message Body */}
              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                <div className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-bold">
                  Subject: {msg.subject}
                </div>
                <p className="font-mono text-sm text-zinc-300 leading-relaxed bg-black/50 p-4 rounded-lg border border-zinc-800/60 whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2">
                  {!msg.read ? (
                    <button
                      onClick={() => updateMessageStatus(msg.id, { read: true })}
                      className="flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-900 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-zinc-300 hover:border-[#D4AF37] hover:text-white transition"
                    >
                      <Eye className="h-3.5 w-3.5 text-[#D4AF37]" />
                      <span>Mark Read</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => updateMessageStatus(msg.id, { read: false })}
                      className="flex items-center gap-1.5 rounded border border-zinc-800 bg-black px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition"
                    >
                      <span>Mark Unread</span>
                    </button>
                  )}

                  <button
                    onClick={() => updateMessageStatus(msg.id, { replied: !msg.replied })}
                    className={`flex items-center gap-1.5 rounded border px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition ${
                      msg.replied
                        ? "border-emerald-500/50 bg-emerald-950/30 text-emerald-300"
                        : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-emerald-500 hover:text-white"
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>{msg.replied ? "Replied Status: YES" : "Mark as Replied"}</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    onClick={() => updateMessageStatus(msg.id, { read: true, replied: true })}
                    className="flex items-center gap-1.5 rounded border border-[#D4AF37] bg-[#D4AF37]/15 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Reply via Email Desk</span>
                  </a>

                  <button
                    onClick={() => {
                      if (confirm(`Delete inquiry from "${msg.name}"?`)) {
                        deleteMessage(msg.id);
                      }
                    }}
                    className="flex items-center gap-1.5 rounded border border-red-900/60 bg-red-950/40 px-3 py-1.5 font-mono text-xs uppercase text-red-300 hover:border-red-500 hover:text-white transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
