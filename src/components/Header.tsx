"use client";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-forest-card border-b border-forest-border">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M16 2L20 10L28 12L22 18L23 26L16 22L9 26L10 18L4 12L12 10L16 2Z"
              fill="#2d6a4f"
              stroke="#40916c"
              strokeWidth="1"
            />
            <path d="M16 14L18 18H14L16 14Z" fill="#52b788" />
          </svg>
          <span className="text-lg font-bold text-forest-accent tracking-tight">
            KOKO Forest
          </span>
        </div>
        <span className="hidden sm:block text-sm text-gray-400 border-l border-forest-border pl-3">
          Forest Health Analytics — Demo Dashboard
        </span>
      </div>
      <span className="text-xs px-2 py-1 rounded bg-amber-warn/15 text-amber-warn border border-amber-warn/30">
        Prototype — Simulated Data
      </span>
    </header>
  );
}
