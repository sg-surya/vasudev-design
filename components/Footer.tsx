import { Layers } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer id="main-footer" className="border-t border-border-subtle bg-white mt-auto py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        <div className="max-w-xs text-center md:text-left">
          <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <div className="bg-primary rounded p-1.5">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-[17px] tracking-tight">Vasudev Design</span>
          </Link>
          <p className="text-sm text-text-mut text-balance leading-relaxed">
            A premium, open-source component library. Clean, minimal, and highly professional ready-to-use UI elements.
          </p>
        </div>
        <div className="flex gap-16 text-sm">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h4 className="font-semibold text-text-main mb-1">Categories</h4>
            <Link href="/buttons" className="text-text-sec hover:text-text-main transition-colors">Buttons</Link>
            <Link href="/cards" className="text-text-sec hover:text-text-main transition-colors">Cards</Link>
            <Link href="/forms" className="text-text-sec hover:text-text-main transition-colors">Forms</Link>
            <Link href="/loaders" className="text-text-sec hover:text-text-main transition-colors">Loaders</Link>
          </div>
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h4 className="font-semibold text-text-main mb-1">Community</h4>
            <Link href="/github" className="text-text-sec hover:text-text-main transition-colors">GitHub</Link>
            <Link href="/discord" className="text-text-sec hover:text-text-main transition-colors">Discord</Link>
            <Link href="/submit" className="text-text-sec hover:text-text-main transition-colors">Submit Element</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
