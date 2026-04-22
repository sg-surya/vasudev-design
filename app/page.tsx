'use client';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ElementCard } from '@/components/ElementCard';
import { ShadowPreview } from '@/components/ShadowPreview';
import { Search, ChevronRight, Check, PackageOpen } from 'lucide-react';
import { useEffect } from 'react';
import { db, handleFirestoreError } from '@/lib/firebase';
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
      (err) => handleFirestoreError(err, 'list', 'elements/published')
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
                <div className="w-[380px] bg-white border border-zinc-200/80 rounded-3xl p-7 shadow-xl z-10 translate-y-0 relative">
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
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-5 pb-12">
                    {(elements.length > 0 ? elements : Array.from({length: 20})).map((el, index) => {
                      // Generate a variety of premium light-theme UI mockups based on index
                      const mockUI = () => {
                        const type = index % 10;
                        if (type === 0) return <div className="w-16 h-8 bg-zinc-100 border border-zinc-200 rounded-full p-1 relative"><div className="w-6 h-6 bg-white border border-zinc-200/60 rounded-full shadow-sm ml-auto"></div></div>; // Toggle
                        if (type === 1) return <button className="px-6 py-2.5 bg-zinc-900 text-white rounded-full font-medium text-sm shadow-sm hover:scale-[1.02] transition-transform">Get Started</button>; // Primary Button
                        if (type === 2) return <div className="flex gap-2"><div className="w-2.5 h-2.5 rounded-full bg-zinc-300 animate-bounce" style={{animationDelay: '0ms'}}></div><div className="w-2.5 h-2.5 rounded-full bg-zinc-300 animate-bounce" style={{animationDelay: '150ms'}}></div><div className="w-2.5 h-2.5 rounded-full bg-zinc-300 animate-bounce" style={{animationDelay: '300ms'}}></div></div>; // Loader
                        if (type === 3) return <div className="flex flex-col gap-2"><label className="flex items-center gap-2 text-sm text-zinc-600 font-medium"><input type="radio" name={`g${index}`} className="w-3.5 h-3.5 accent-zinc-900" defaultChecked /> Option 1</label><label className="flex items-center gap-2 text-sm text-zinc-600 font-medium"><input type="radio" name={`g${index}`} className="w-3.5 h-3.5 accent-zinc-900" /> Option 2</label></div>; // Radio
                        if (type === 4) return <button className="px-5 py-2.5 bg-white border border-zinc-200/80 shadow-sm text-zinc-800 rounded-xl font-medium text-xs flex items-center gap-2"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> Star</button>; // Github Btn
                        if (type === 5) return <div className="w-full max-w-[140px] h-9 px-3 bg-white rounded-lg border border-zinc-200/60 shadow-sm flex items-center"><span className="text-zinc-400 text-[11px] font-medium">Search...</span></div>; // Input
                        if (type === 6) return <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3 w-[150px] shadow-sm"><div className="flex gap-1.5 mb-2"><div className="w-2 h-2 rounded-full bg-zinc-700"></div><div className="w-2 h-2 rounded-full bg-zinc-700"></div><div className="w-2 h-2 rounded-full bg-zinc-700"></div></div><div className="text-[10px] font-mono text-zinc-400">npm init<span className="animate-pulse">_</span></div></div>; // Terminal
                        if (type === 7) return <button className="px-5 py-2.5 bg-gradient-to-r from-zinc-800 to-zinc-950 text-white rounded-xl font-medium text-xs shadow-sm hover:opacity-90">Premium</button>; // Gradient
                        if (type === 8) return <div className="w-20 overflow-hidden bg-zinc-100 border border-zinc-200/50 h-5 rounded-full flex items-center relative"><div className="absolute left-0 top-0 bottom-0 w-12 bg-zinc-800 rounded-full"></div><div className="absolute left-[38px] w-3.5 h-3.5 bg-white border border-zinc-200 rounded-full shadow-sm"></div></div>; // Slider
                        return <div className="p-3 border border-zinc-200 rounded-xl bg-white shadow-sm font-medium text-zinc-900 text-xs">Brutalist</div>; // Brutalist
                      };
                      
                      const element = el as any;
                      const isReal = !!element?.id;
                      
                      return (
                      <ElementCard 
                        key={isReal ? `${element.id}-${index}` : `mock-${index}`}
                        id={isReal ? element.id : `mock-${index}`}
                        title={isReal ? element.title : ['Theme Toggle', 'Primary Button', 'Loader', 'Radio Group', 'GitHub Button', 'Search Input', 'Terminal', 'Gradient Button', 'Slider', 'Brutalist Card'][index % 10]}
                        creator={isReal ? {username: element.creatorName || 'unknown', avatar: element.creatorAvatar || ''} : { username: 'vasudev', avatar: '' }}
                        tags={isReal ? element.tags || [] : []}
                        likesCount={isReal ? element.likesCount || 0 : 42}
                        frameworkType={isReal ? element.frameworkType : 'react'}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                           {isReal && element.code ? (
                              <ShadowPreview htmlCode={element.code} />
                           ) : (
                              mockUI()
                           )}
                        </div>
                      </ElementCard>
                    )})}
                  </div>
             </div>
             
             {/* Premium Floating Load More Button */}
             {!isExpanded && (
               <div className="absolute bottom-6 inset-x-0 flex justify-center z-20 pointer-events-none">
                 <button 
                   onClick={() => setIsExpanded(true)}
                   id="btn-premium-load-more"
                   className="pointer-events-auto group flex items-center gap-2 px-8 py-3 rounded-full border border-zinc-200/80 bg-white backdrop-blur-md text-sm font-semibold tracking-wide hover:shadow-lg hover:border-zinc-300 transition-all duration-300 text-zinc-900 hover:-translate-y-0.5 active:scale-95 shadow-sm"
                 >
                   Discover 150+ More Components
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
