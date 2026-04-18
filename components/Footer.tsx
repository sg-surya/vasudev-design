import { Layers, ArrowUpRight, Github, Twitter, DiscIcon as Discord } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer id="main-footer" className="bg-white pt-24 border-t border-zinc-200/80">
      <div className="w-full px-6 sm:px-8 xl:px-16 pb-12 flex flex-col">
        {/* Massive CTA Section */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 mb-24">
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 max-w-2xl">
             Ready to build something <span className="text-zinc-400">amazing?</span>
           </h2>
           <p className="text-lg text-zinc-500 max-w-lg mb-4">
             Join thousands of developers building faster and better with Vasudev Design&apos;s premium components.
           </p>
           <div className="flex flex-col sm:flex-row items-center gap-4">
             <Link href="/explore" className="bg-zinc-900 text-white px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
               Explore Components
             </Link>
             <Link href="/github" className="bg-white border border-zinc-200 text-zinc-800 px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-zinc-50 hover:border-zinc-300 hover:-translate-y-0.5 transition-all active:scale-95 shadow-sm flex items-center gap-2">
               <Github className="w-5 h-5" /> Star on GitHub
             </Link>
           </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-8 pt-12 border-t border-zinc-200/80">
          <div className="col-span-2 lg:col-span-2 md:pr-12">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group inline-flex">
              <div className="bg-zinc-900 group-hover:bg-zinc-800 transition-colors rounded-lg p-1.5 shadow-sm">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-[19px] tracking-tight text-zinc-900">Vasudev Design</span>
            </Link>
            <p className="text-[15px] text-zinc-500 leading-relaxed max-w-sm mb-8">
              A premium, open-source component library. Clean, minimal, and highly professional ready-to-use UI elements designed for elite scale.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-zinc-900 text-[15px] mb-2 tracking-tight">Ecosystem</h4>
            <Link href="/components" className="text-[14px] text-zinc-500 hover:text-zinc-900 transition-colors font-medium">Components</Link>
            <Link href="/templates" className="text-[14px] text-zinc-500 hover:text-zinc-900 transition-colors font-medium">Templates</Link>
            <Link href="/animations" className="text-[14px] text-zinc-500 hover:text-zinc-900 transition-colors font-medium">Micro-interactions</Link>
            <Link href="/submit" className="text-[14px] text-zinc-500 hover:text-zinc-900 transition-colors font-medium inline-flex items-center gap-1 group">
               Submit <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-zinc-900 text-[15px] mb-2 tracking-tight">Resources</h4>
            <Link href="/docs" className="text-[14px] text-zinc-500 hover:text-zinc-900 transition-colors font-medium">Documentation</Link>
            <Link href="/blog" className="text-[14px] text-zinc-500 hover:text-zinc-900 transition-colors font-medium">Blog</Link>
            <Link href="/showcase" className="text-[14px] text-zinc-500 hover:text-zinc-900 transition-colors font-medium">Showcase</Link>
            <Link href="/pricing" className="text-[14px] text-zinc-500 hover:text-zinc-900 transition-colors font-medium">Pro Access</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-zinc-900 text-[15px] mb-2 tracking-tight">Connect</h4>
            <Link href="/twitter" className="text-[14px] text-zinc-500 hover:text-zinc-900 transition-colors font-medium inline-flex items-center gap-2">
               <Twitter className="w-4 h-4" /> Twitter / X
            </Link>
            <Link href="/github" className="text-[14px] text-zinc-500 hover:text-zinc-900 transition-colors font-medium inline-flex items-center gap-2">
               <Github className="w-4 h-4" /> GitHub
            </Link>
            <Link href="/discord" className="text-[14px] text-zinc-500 hover:text-zinc-900 transition-colors font-medium inline-flex items-center gap-2">
               <Discord className="w-4 h-4" /> Discord
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 mt-12 border-t border-zinc-200/50 text-sm text-zinc-500 font-medium">
           <p>© {new Date().getFullYear()} Vasudev Design. All rights reserved.</p>
           <div className="flex items-center gap-6 mt-4 md:mt-0">
             <Link href="/privacy" className="hover:text-zinc-900 transition-colors">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-zinc-900 transition-colors">Terms of Service</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
