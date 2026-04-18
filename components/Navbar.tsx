'use client';
import Link from 'next/link';
import { Layers, Plus, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading, isAdmin, signIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 sm:px-6 transition-all duration-300 pointer-events-none">
      <header 
        id="main-nav" 
        className={`pointer-events-auto w-full transition-all duration-500 overflow-hidden ${
          isScrolled 
            ? 'max-w-5xl mt-4 sm:mt-6 bg-white/80 backdrop-blur-2xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[32px]' 
            : 'max-w-full mt-0 bg-transparent border-transparent rounded-[0px]'
        }`}
      >
        <div className={`w-full flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'px-4 sm:px-6 py-2.5' : 'px-2 sm:px-2 xl:px-10 py-5 sm:py-8'
        }`}>
          {/* Left: Brand & Nav */}
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-zinc-900 group-hover:bg-zinc-800 transition-transform duration-300 group-hover:scale-105 rounded-lg p-1.5 flex items-center justify-center shadow-sm">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[17px] tracking-tight text-zinc-900">Vasudev Design</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1 text-[14px] font-medium text-zinc-500">
            <Link href="/explore" className="px-4 py-2 rounded-full hover:bg-zinc-100 hover:text-zinc-900 transition-colors">Explore</Link>
            <Link href="/categories" className="px-4 py-2 rounded-full hover:bg-zinc-100 hover:text-zinc-900 transition-colors">Categories</Link>
            <Link href="/pricing" className="px-4 py-2 rounded-full hover:bg-zinc-100 hover:text-zinc-900 transition-colors">Pro</Link>
          </nav>
        </div>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/submit" className="hidden sm:inline-flex items-center gap-1.5 justify-center rounded-full px-4 py-2 text-[14px] font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors">
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Submit</span>
          </Link>
          
          {loading ? (
             <div className="flex items-center justify-center px-4 w-20">
               <Loader2 className="w-5 h-5 text-zinc-400 animate-spin" />
             </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link href="/admin" className="hidden sm:flex text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                  Admin
                </Link>
              )}
              <Link href="/profile" className="w-10 h-10 rounded-full border border-zinc-200 overflow-hidden hover:border-zinc-400 hover:scale-105 transition-all shadow-sm">
                <img src={user.photoURL || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.uid}`} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </Link>
            </div>
          ) : (
            <button 
              onClick={() => signIn()}
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 text-white px-5 sm:px-6 py-2 text-[14px] font-medium hover:bg-zinc-800 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-md hover:-translate-y-0.5 active:scale-95"
            >
              Sign In
            </button>
          )}
        </div>
        </div>
      </header>
    </div>
  );
}
