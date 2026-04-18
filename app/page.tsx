'use client';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ElementCard } from '@/components/ElementCard';
import { Search, ChevronRight, Check, PackageOpen } from 'lucide-react';
import { useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [elements, setElements] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'elements'),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );

    const unsub = onSnapshot(q, 
      (snap) => {
        setElements(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      (err) => {
        console.warn("Home Elements Listener (reconnecting):", err.message);
      }
    );

    return () => unsub();
  }, []);
  
  const categories = ["All", "Buttons", "Forms", "Navigation", "Loaders", "Badges", "Cards"];

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        {/* HERO SECTION */}
        <section id="hero-section" className="relative w-full px-6 sm:px-8 xl:px-16 pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden bg-white">
          {/* Subtle Grid Background */}
          <div className="absolute inset-x-0 top-0 h-[700px] bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_80%,transparent_100%)] z-0 pointer-events-none"></div>
          
          <div className="w-full max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
            {/* New Animated Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-[13px] font-medium text-zinc-600 mb-8 hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer group">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-900 opacity-20"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-900"></span>
              </span>
              Vasudev Design v1.0 is live
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* Improved Typography */}
            <h1 className="text-5xl sm:text-6xl md:text-[80px] font-bold tracking-tighter mb-8 text-zinc-900 text-balance leading-[1.05]">
              Beautiful UI components.<br />
              <span className="text-zinc-400 font-medium">Ready to copy & paste.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-500 mb-10 max-w-2xl mx-auto text-balance tracking-tight leading-relaxed">
              Stop reinventing the wheel. Access a premium, curated library of minimal, professional UI elements built for modern web applications.
            </p>
            
            <div className="w-full max-w-2xl mx-auto mb-8 relative group z-20">
              {/* Soft blur aura behind the search bar */}
              <div className="absolute inset-0 bg-zinc-900/5 blur-2xl rounded-full scale-105 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
              
              {/* Premium Input Container */}
              <div className="relative flex items-center w-full bg-gradient-to-b from-zinc-50 to-white backdrop-blur-xl border border-zinc-200/80 rounded-[32px] h-16 sm:h-[72px] shadow-[inset_0_2px_12px_rgba(0,0,0,0.03),0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[inset_0_2px_12px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.1)] transition-all overflow-hidden focus-within:border-zinc-300 focus-within:ring-4 focus-within:ring-zinc-900/5 focus-within:bg-white p-1.5 sm:p-2">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400 ml-4 sm:ml-5 mr-3 group-focus-within:text-zinc-800 transition-colors shrink-0" />
                
                <input 
                  type="text" 
                  placeholder="Search for buttons, cards, wrappers..." 
                  className="w-full h-full bg-transparent border-none outline-none text-zinc-900 text-base sm:text-lg placeholder:text-zinc-400 placeholder:font-light font-medium px-2"
                />
                
                <div className="pr-1 shrink-0 flex items-center">
                   <button className="hidden sm:flex items-center gap-2 bg-zinc-900 text-white px-6 py-2.5 sm:py-3.5 rounded-full text-[14px] font-semibold hover:bg-zinc-800 hover:shadow-lg transition-all active:scale-95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                     Search <ChevronRight className="w-4 h-4 opacity-70" />
                   </button>
                   <button className="block sm:hidden bg-zinc-900 text-white p-4 rounded-full hover:bg-zinc-800 hover:shadow-md transition-all active:scale-95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                     <Search className="w-5 h-5 flex-shrink-0" />
                   </button>
                </div>
              </div>
            </div>

            {/* Trending Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm text-zinc-500 mb-16 md:mb-24">
              <span className="text-zinc-400 font-medium">Trending searches:</span>
              {['Buttons', 'Glassmorphism', 'Loaders', 'Avatars'].map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-zinc-50 border border-zinc-200/60 rounded-full cursor-pointer hover:bg-zinc-100 hover:text-zinc-900 hover:border-zinc-300 transition-all font-medium text-[13px]">
                  {tag}
                </span>
              ))}
            </div>

            {/* Hero Visual: Overlapping Minimal Components Array */}
            <div className="relative mt-8 w-full max-w-full mx-auto h-[260px] hidden lg:block pointer-events-none">
              <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] flex items-start justify-center gap-6 xl:gap-12 w-[120%] -ml-[10%]">
                
                {/* Left Floating Card */}
                <div className="w-[300px] bg-white border border-zinc-200/80 rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] translate-y-6 rotate-[-3deg] hover:rotate-0 hover:-translate-y-2 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500 font-bold text-xs">A</div>
                    <div className="flex flex-col gap-2">
                      <div className="w-24 h-2.5 bg-zinc-200 rounded-full"></div>
                      <div className="w-16 h-2 bg-zinc-100 rounded-full"></div>
                    </div>
                  </div>
                  <div className="w-full h-16 bg-zinc-50 rounded-xl border border-zinc-100"></div>
                </div>

                {/* Center Floating Card (Primary Showcase) */}
                <div className="w-[380px] bg-white border border-zinc-200/80 rounded-[32px] p-7 shadow-[0_24px_50px_rgb(0,0,0,0.08)] z-10 translate-y-0 relative">
                  <div className="absolute -inset-x-6 top-10 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-50"></div>
                  <div className="absolute -inset-y-6 left-12 w-px bg-gradient-to-b from-transparent via-zinc-200 to-transparent opacity-50"></div>
                  <div className="flex justify-between items-center mb-6 relative">
                    <div className="w-32 h-3 bg-zinc-200 rounded-full"></div>
                    <div className="w-12 h-5 bg-green-100 rounded-full flex items-center justify-center">
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="w-full h-12 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center px-4 gap-3 shadow-inner">
                        <div className="w-4 h-4 rounded-full bg-zinc-200 shrink-0"></div>
                        <div className="w-40 h-2 bg-zinc-200 rounded-full"></div>
                    </div>
                    <div className="w-full h-12 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center px-4 gap-3">
                        <div className="w-4 h-4 rounded-full bg-zinc-200 shrink-0"></div>
                        <div className="w-24 h-2 bg-zinc-200 rounded-full"></div>
                    </div>
                  </div>
                  <div className="mt-8 w-full h-12 bg-zinc-900 rounded-2xl shadow-md"></div>
                </div>

                {/* Right Floating Card */}
                <div className="w-[300px] bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] translate-y-10 rotate-[3deg] hover:rotate-0 hover:-translate-y-2 transition-all duration-500">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="w-20 h-2.5 bg-zinc-200 rounded-full"></div>
                        <div className="w-10 h-5 bg-zinc-100 rounded-full"></div>
                    </div>
                    <div className="w-full h-24 bg-zinc-50 rounded-2xl border border-zinc-100 shadow-inner"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* BROWSE SECTION */}
        <section id="browse-section" className="w-full px-6 sm:px-8 xl:px-16 py-16 md:py-24 flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-text-main mb-2">Curated Library</h2>
              <p className="text-[15px] text-text-mut font-light">Explore perfectly crafted elements by the community.</p>
            </div>
            
            {/* Premium Segmented Category Filter */}
            <div className="flex gap-1.5 overflow-x-auto p-1.5 w-full md:w-auto scrollbar-hide bg-zinc-100/60 border border-zinc-200/50 rounded-full" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              {categories.map((cat, i) => (
                <button 
                  key={cat}
                  id={`premium-cat-${cat.toLowerCase()}`}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-[13px] font-semibold transition-all ${
                    i === 0 
                      ? 'bg-white text-zinc-900 shadow-[0_2px_8px_rgb(0,0,0,0.06)] border-transparent' 
                      : 'bg-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          {/* Element Grid with Fade Mask */}
          <div className="relative">
             <div className={`relative transition-all duration-1000 ease-in-out ${
               isExpanded 
                 ? 'h-auto overflow-visible [mask-image:none]' 
                 : 'h-[1100px] xl:h-[900px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]'
             }`}>
                {elements.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 pb-12">
                    {elements.map((el, index) => (
                      <ElementCard 
                        key={`${el.id}-${index}`}
                        id={el.id}
                        title={el.title}
                        creator={el.creator}
                        tags={el.tags}
                        likesCount={el.likesCount}
                        frameworkType={el.frameworkType}
                      >
                        <div className="w-full h-full flex items-center justify-center text-zinc-300">
                           <PackageOpen className="w-10 h-10 opacity-30" />
                        </div>
                      </ElementCard>
                    ))}
                  </div>
                ) : (
                  <div className="w-full py-40 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200/80 rounded-3xl bg-zinc-50/50 mt-8 mb-20">
                     <div className="w-16 h-16 bg-white border border-zinc-200 rounded-full flex items-center justify-center mb-5 shadow-sm">
                       <PackageOpen className="w-7 h-7 text-zinc-400" />
                     </div>
                     <h3 className="text-xl font-bold text-zinc-900 mb-2 tracking-tight">No components yet</h3>
                     <p className="text-zinc-500 font-medium max-w-sm text-center">Be the first to publish a component and grow the library.</p>
                  </div>
                )}
             </div>
             
             {/* Premium Floating Load More Button */}
             {!isExpanded && (
               <div className="absolute bottom-6 inset-x-0 flex justify-center z-20 pointer-events-none">
                 <button 
                   onClick={() => setIsExpanded(true)}
                   id="btn-premium-load-more"
                   className="pointer-events-auto group flex items-center gap-2 px-8 py-4 rounded-full border border-zinc-200/80 bg-white/90 backdrop-blur-md text-[14px] font-bold tracking-wide hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] hover:border-zinc-300 transition-all duration-300 text-zinc-800 hover:-translate-y-1 active:scale-95 shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
                 >
                   Discover 150+ More Components
                   <div className="flex h-5 w-5 items-center justify-center bg-zinc-100 rounded-full group-hover:bg-zinc-200 transition-colors">
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-600 rotate-90" />
                   </div>
                 </button>
               </div>
             )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
