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

      {/* Right Column: Premium Showcase (Signup variant) */}
      <div className="hidden lg:flex relative flex-1 bg-zinc-950 items-center justify-center overflow-hidden">
         {/* Glowing Orbs - Emerald/Teal vibe for new user growth */}
         <div className="absolute top-[0%] right-[10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none"></div>
         <div className="absolute bottom-[0%] left-[0%] w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none"></div>
         
         {/* Dot Grid */}
         <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40"></div>

         {/* Floating Elements Showcase */}
         <div className="relative z-10 flex flex-col items-center justify-center w-full px-16">
            
            {/* Main Visual - A stacked grid of code and components */}
            <div className="relative w-full max-w-[550px] mb-12 animate-[float_7s_ease-in-out_infinite]">
               
               {/* Back card - faded */}
               <div className="absolute top-4 -right-4 w-full h-full bg-white/5 border border-white/5 rounded-2xl p-8 backdrop-blur-md shadow-2xl scale-[0.95] opacity-50"></div>
               
               {/* Front card - active */}
               <div className="relative w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-2xl shadow-2xl">
                 <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400 tracking-widest font-semibold uppercase">Workspace</span>
                 </div>
                 
                 <div className="flex flex-col gap-3">
                   {/* Mock code lines */}
                   <div className="flex items-center gap-3 font-mono text-xs text-zinc-500">
                     <span>1</span><div className="h-2.5 w-1/3 bg-emerald-400/20 rounded"></div>
                   </div>
                   <div className="flex items-center gap-3 font-mono text-xs text-zinc-500">
                     <span>2</span><div className="h-2.5 w-1/2 bg-white/10 rounded pl-4"></div>
                   </div>
                   <div className="flex items-center gap-3 font-mono text-xs text-zinc-500">
                     <span>3</span><div className="h-2.5 w-1/4 bg-white/10 rounded pl-4"></div>
                   </div>
                   <div className="flex items-center gap-3 font-mono text-xs text-zinc-500 mb-4">
                     <span>4</span><div className="h-2.5 w-2/3 bg-white/10 rounded"></div>
                   </div>

                   {/* Rendered mockup */}
                   <div className="mt-4 p-4 border border-white/10 rounded-xl bg-white/5 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500"></div>
                       <div className="space-y-2">
                         <div className="w-20 h-2 bg-white/20 rounded"></div>
                         <div className="w-12 h-2 bg-white/10 rounded"></div>
                       </div>
                     </div>
                     <div className="w-16 h-6 rounded-full border border-emerald-500/50 flex items-center justify-center text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                       Active
                     </div>
                   </div>
                 </div>

                 {/* Floating Tag */}
                 <div className="absolute -left-8 -bottom-6 bg-white text-zinc-900 border border-zinc-200 text-sm font-bold px-6 py-3 rounded-full shadow-xl flex items-center gap-2">
                   <span className="relative flex h-3 w-3">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                   </span>
                   Ship faster
                 </div>
               </div>
            </div>

            {/* Testimonial */}
            <div className="max-w-md w-full absolute bottom-16 right-16 text-right">
              <Quote className="w-10 h-10 text-zinc-700 mb-4 opacity-50 ml-auto" />
              <p className="text-[19px] text-zinc-300 font-medium leading-relaxed mb-6">
                "It feels like cheating. The workflows and copy-paste components have literally saved us months of frontend development."
              </p>
              <div className="flex items-center justify-end gap-4">
                <div>
                  <div className="text-[15px] font-bold text-white">David Chen</div>
                  <div className="text-[13px] text-zinc-400 font-medium tracking-wide">Founder at Linear</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-700 to-teal-500 border-2 border-zinc-800 shadow-md flex items-center justify-center text-white font-bold">
                  DC
                </div>
              </div>
            </div>
         </div>
         
      </div>
    </div>
  );
}
