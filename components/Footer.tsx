import { Layers } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer id="main-footer" className="border-t border-border-subtle bg-white mt-auto py-16">
      <div className="w-full px-6 sm:px-8 xl:px-16 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        <div className="max-w-sm text-center md:text-left">
          <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <div className="bg-primary rounded-lg p-1.5 shadow-sm">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[17px] tracking-tight text-zinc-900">Vasudev Design</span>
          </Link>
          <p className="text-sm text-text-mut text-balance leading-relaxed">
            A premium, open-source component library. Clean, minimal, and highly professional ready-to-use UI elements. Designed for scale.
          </p>
        </div>
        <div className="flex gap-16 text-sm">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h4 className="font-semibold text-text-main mb-2">Platform</h4>
            <Link href="/components" className="text-text-sec hover:text-text-main transition-colors">Components</Link>
            <Link href="/templates" className="text-text-sec hover:text-text-main transition-colors">Templates</Link>
            <Link href="/pricing" className="text-text-sec hover:text-text-main transition-colors">Pricing</Link>
          </div>
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h4 className="font-semibold text-text-main mb-2">Community</h4>
            <Link href="/github" className="text-text-sec hover:text-text-main transition-colors">GitHub</Link>
            <Link href="/discord" className="text-text-sec hover:text-text-main transition-colors">Discord</Link>
            <Link href="/twitter" className="text-text-sec hover:text-text-main transition-colors">Twitter (X)</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
