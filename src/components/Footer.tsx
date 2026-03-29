"use client";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center px-6 py-2 bg-forest-header border-t border-forest-header">
      <p className="text-[10px] text-gray-400 text-center leading-tight">
        All data is simulated based on publicly available KOKO Forest case
        studies and may not be fully accurate. All copyright belongs to{" "}
        <a
          href="https://kokoforest.com/home/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-300 transition-colors"
        >
          KOKO Forest
        </a>
        . No infringement is intended.
      </p>
    </footer>
  );
}
