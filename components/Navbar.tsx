import Link from 'next/link';
import { Search, Layers, Plus } from 'lucide-react';

export function Navbar() {
  return (
    <div className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <header 
        id="main-nav" 
        className="pointer-events-auto w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full h-14 flex items-center justify-between px-2 sm:px-4 transition-all duration-300"
      >
        
        {/* Left: Brand & Nav */}
        <div className="flex items-center gap-2 sm:gap-6">
          <Link href="/" className="flex items-center gap-2.5 group pl-2">
            <div className="bg-zinc-900 group-hover:bg-zinc-800 transition-transform duration-300 group-hover:scale-105 rounded-full p-1.5 flex items-center justify-center shadow-sm">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-zinc-900 hidden sm:block">Vasudev Design</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1 text-[13px] font-medium text-zinc-500">
            <Link href="/explore" className="px-3 py-1.5 rounded-full hover:bg-zinc-100 hover:text-zinc-900 transition-colors">Explore</Link>
            <Link href="/categories" className="px-3 py-1.5 rounded-full hover:bg-zinc-100 hover:text-zinc-900 transition-colors">Categories</Link>
          </nav>
        </div>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Link href="/explore" className="block sm:hidden px-3 py-1.5 text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
            Explore
          </Link>
          <Link href="/submit" className="hidden sm:inline-flex items-center gap-1.5 justify-center rounded-full px-4 py-1.5 text-[13px] font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors">
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Submit</span>
          </Link>
          <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-zinc-900 text-white px-5 py-1.5 text-[13px] font-medium hover:bg-zinc-800 transition-all shadow-sm hover:shadow active:scale-95">
            Sign In
          </Link>
        </div>
        
      </header>
    </div>
  );
}
