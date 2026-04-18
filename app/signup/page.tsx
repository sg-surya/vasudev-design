'use client';
import Link from 'next/link';
import { Layers, Github, ArrowRight, Quote } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column: Form Area */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 lg:w-1/2 xl:w-5/12 border-r border-zinc-100 relative">
        {/* Brand Nav */}
        <div className="absolute top-8 left-6 sm:left-8 lg:left-12">
           <Link href="/" className="flex items-center gap-2.5 group">
             <div className="bg-zinc-900 group-hover:bg-zinc-800 transition-colors rounded-lg p-1.5 shadow-sm">
               <Layers className="w-4 h-4 text-white" />
             </div>
             <span className="font-bold text-[18px] tracking-tight text-zinc-900">Vasudev Design</span>
           </Link>
        </div>

        <div className="mx-auto w-full max-w-[400px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">Create an account</h2>
            <p className="text-[15px] text-zinc-500">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-zinc-900 hover:text-zinc-700 hover:underline transition-all">
                Sign in
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            <button className="w-full flex items-center justify-center gap-2.5 bg-white border border-zinc-200 text-zinc-800 rounded-xl px-4 py-3 text-[14px] font-semibold hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm active:scale-95">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2.5 bg-zinc-900 border border-zinc-900 text-white rounded-xl px-4 py-3 text-[14px] font-semibold hover:bg-zinc-800 transition-all shadow-sm active:scale-95">
              <Github className="w-5 h-5" />
              Sign up with GitHub
            </button>
          </div>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-200"></div></div>
            <span className="relative bg-white px-4 text-xs font-medium text-zinc-400 uppercase tracking-widest">Or continue with email</span>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-[13px] font-semibold text-zinc-900 mb-1.5" htmlFor="name">Full Name</label>
              <input 
                id="name"
                type="text" 
                required 
                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-zinc-100 focus:border-zinc-300 transition-all shadow-sm" 
                placeholder="Jane Doe"
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-semibold text-zinc-900 mb-1.5" htmlFor="email">Email address</label>
              <input 
                id="email"
                type="email" 
                required 
                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-zinc-100 focus:border-zinc-300 transition-all shadow-sm" 
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-zinc-900 mb-1.5" htmlFor="password">Password</label>
              <input 
                id="password"
                type="password" 
                required 
                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-zinc-100 focus:border-zinc-300 transition-all shadow-sm" 
                placeholder="Create a password"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white rounded-xl px-4 py-4 text-[15px] font-semibold hover:bg-zinc-800 hover:shadow-lg transition-all active:scale-95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
              >
                Create Account <ArrowRight className="w-4 h-4 opacity-70" />
              </button>
            </div>
            
            <p className="text-center text-[12px] text-zinc-500 font-medium mt-4 leading-relaxed">
              By signing up, you agree to our <Link href="#" className="underline hover:text-zinc-900 transition-colors">Terms of Service</Link> and <Link href="#" className="underline hover:text-zinc-900 transition-colors">Privacy Policy</Link>.
            </p>
          </form>
        </div>
      </div>

      {/* Right Column: Premium Artistic Showcase (Signup variant) */}
      <div className="hidden lg:flex relative flex-1 bg-[#030303] items-center justify-center overflow-hidden">
         {/* Subtle ambient light */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-zinc-800/20 to-transparent blur-3xl rounded-full pointer-events-none translate-x-1/4 -translate-y-1/4"></div>

         <div className="relative z-10 w-full px-12 xl:px-24 flex flex-col items-center text-center">
            {/* Minimal Label */}
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-zinc-800/80 bg-[#0a0a0a] w-fit mb-12 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
               </span>
               <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-[0.2em] leading-none mt-0.5">Architecture</span>
            </div>

            {/* Giant Elite Typography */}
            <h1 className="text-[48px] lg:text-[56px] xl:text-[64px] font-bold text-white tracking-tighter leading-[1.05] mb-12">
              Stop building <br />
              from <span className="text-zinc-600">scratch.</span>
            </h1>

            {/* Abstract Design System Blueprint */}
            <div className="relative w-full max-w-[400px] border border-zinc-800/80 bg-[#0a0a0a]/50 rounded-[2rem] overflow-hidden p-8 flex flex-col gap-6 backdrop-blur-xl shadow-2xl text-left">
               {/* Internal Grid */}
               <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
               
               <div className="flex items-start justify-between relative z-10">
                 <div className="space-y-4 w-[60%]">
                   <div className="h-1 w-12 bg-zinc-700 rounded-full"></div>
                   <div className="h-3 w-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]"></div>
                   <div className="h-3 w-3/4 bg-zinc-700/80 rounded-full"></div>
                 </div>
                 <div className="w-12 h-12 rounded-full border-[1.5px] border-zinc-700/50 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-zinc-500 -rotate-45" />
                 </div>
               </div>

               <div className="flex-1 border-t border-zinc-800/80 mt-4 pt-8 flex gap-4 relative z-10">
                 <div className="h-24 w-24 bg-zinc-800/40 rounded-2xl border border-zinc-700/30 flex items-center justify-center">
                    <Layers className="w-6 h-6 text-zinc-500" />
                 </div>
                 <div className="flex-1 flex flex-col gap-3">
                   <div className="h-10 w-full border border-zinc-700/50 border-dashed rounded-xl flex items-center px-4">
                     <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                   </div>
                   <div className="h-11 w-full bg-white/5 rounded-xl border border-white/5 line-through decoration-zinc-600"></div>
                 </div>
               </div>
            </div>
         </div>

         {/* Abstract Geometric Accents */}
         <div className="absolute bottom-0 left-[15%] w-[1px] h-[40vh] bg-gradient-to-t from-zinc-800/80 to-transparent pointer-events-none"></div>
         <div className="absolute top-0 right-[25%] w-[1px] h-[25vh] bg-gradient-to-b from-zinc-800/80 to-transparent pointer-events-none"></div>
         <div className="absolute top-[30%] right-0 w-[20vw] h-[1px] bg-gradient-to-l from-zinc-800/80 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
