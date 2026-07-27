import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-surface-container-low border-t border-outline-variant/30 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-4">
        <div className="text-center md:text-left space-y-1">
          <span className="font-sans text-sm font-bold text-on-surface">DevPortal UI</span>
          <p className="text-[11px] text-on-surface-variant">
            © 2024 DevPortal UI. Built with Technical Precision for developers.
          </p>
        </div>
        <div className="flex gap-6">
          {['GitHub', 'NPM', 'Community', 'Discord'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs font-mono text-on-surface-variant hover:text-secondary transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
