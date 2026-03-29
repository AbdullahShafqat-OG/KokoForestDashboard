"use client";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-forest-card border-b border-forest-border">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">
          Forest Health Analytics Dashboard for
        </span>
        <a
          href="https://kokoforest.com/home/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center hover:opacity-80 transition-opacity"
          aria-label="KOKO Forest"
        >
          <img
            width="120"
            height="20"
            src="/koko-forest-logo.png"
            alt="KOKO Forest"
            className="h-5 w-auto object-contain"
            loading="eager"
          />
        </a>
      </div>
      <span className="text-xs px-2 py-1 rounded bg-amber-warn/15 text-amber-warn border border-amber-warn/30">
        Prototype using simulated data
      </span>
    </header>
  );
}
