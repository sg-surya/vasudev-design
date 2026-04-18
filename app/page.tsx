import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ElementCard } from '@/components/ElementCard';
import { Search, ChevronRight, Check } from 'lucide-react';

// --- PREMIUM DUMMY COMPONENTS ---

const MinimalButton = () => (
  <button className="px-5 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-full shadow-sm hover:bg-zinc-800 hover:shadow-md transition-all active:scale-95 flex items-center gap-2 border border-zinc-800">
    Continue <ChevronRight className="w-4 h-4 text-zinc-400" />
  </button>
);

const SegmentedControl = () => (
  <div className="flex items-center p-1 bg-zinc-100/80 border border-zinc-200/60 rounded-lg shadow-inner">
    <button className="px-5 py-1.5 text-sm font-medium bg-white text-zinc-900 rounded-md shadow-sm border border-zinc-200/50">Monthly</button>
    <button className="px-5 py-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Yearly</button>
  </div>
);

const AvatarGroup = () => (
  <div className="flex -space-x-3 hover:space-x-1 transition-all duration-300">
    {[1,2,3,4].map(i => (
      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-xs font-semibold text-zinc-500 shadow-sm transition-transform hover:scale-110 cursor-pointer">
        U{i}
      </div>
    ))}
  </div>
);

const CleanCheckbox = () => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className="relative flex items-center justify-center w-5 h-5 border border-zinc-300 rounded-md bg-zinc-900 shadow-sm transition-colors">
      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
    </div>
    <span className="text-sm font-medium text-zinc-700 select-none">Remember device</span>
  </label>
);

const SkeletonPattern = () => (
  <div className="w-full max-w-[200px] flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-zinc-200 animate-pulse"></div>
      <div className="flex flex-col gap-2">
        <div className="w-24 h-2.5 rounded-full bg-zinc-200 animate-pulse"></div>
        <div className="w-16 h-2 rounded-full bg-zinc-100 animate-pulse"></div>
      </div>
    </div>
  </div>
);

const StatusBadge = () => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200/60 text-green-700 text-[13px] font-medium shadow-sm">
    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
    Operational
  </span>
);

export default function Home() {
  const categories = ["All", "Buttons", "Forms", "Navigation", "Loaders", "Badges", "Cards"];
  
  const dummyElements = [
    { id: 'el-1', title: 'Minimal Dark Button', creator: { username: 'alex_ui', avatar: 'A' }, tags: ['button', 'minimal'], likesCount: 428, frameworkType: 'Tailwind', preview: <MinimalButton /> },
    { id: 'el-2', title: 'Soft Segmented Control', creator: { username: 'sarah_design', avatar: 'S' }, tags: ['toggle', 'nav'], likesCount: 256, frameworkType: 'React', preview: <SegmentedControl /> },
    { id: 'el-3', title: 'Micro-interaction Avatars', creator: { username: 'motion_pro', avatar: 'M' }, tags: ['avatar', 'group'], likesCount: 892, frameworkType: 'React', preview: <AvatarGroup /> },
    { id: 'el-4', title: 'Accessible Checkbox', creator: { username: 'form_hero', avatar: 'F' }, tags: ['input', 'form'], likesCount: 314, frameworkType: 'CSS', preview: <CleanCheckbox /> },
    { id: 'el-5', title: 'Clean Skeleton Loader', creator: { username: 'skeleton_king', avatar: 'K' }, tags: ['loader', 'skeleton'], likesCount: 512, frameworkType: 'Tailwind', preview: <SkeletonPattern /> },
    { id: 'el-6', title: 'Pulsing Status Badge', creator: { username: 'ui_wizard', avatar: 'U' }, tags: ['badge', 'status'], likesCount: 198, frameworkType: 'Tailwind', preview: <StatusBadge /> },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        {/* HERO SECTION */}
        <section id="hero-section" className="relative px-4 pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-white">
          {/* Subtle Grid Background */}
          <div className="absolute inset-x-0 top-0 h-[600px] bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] z-0 pointer-events-none"></div>
          
          <div className="container mx-auto max-w-5xl text-center relative z-10 flex flex-col items-center">
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
              <div className="relative flex items-center w-full bg-white/90 backdrop-blur-md border border-zinc-200/80 rounded-full h-16 sm:h-20 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all overflow-hidden focus-within:border-zinc-300 focus-within:ring-4 focus-within:ring-zinc-900/5 focus-within:bg-white">
                <Search className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-400 ml-6 sm:ml-8 mr-4 group-focus-within:text-zinc-900 transition-colors shrink-0" />
                
                <input 
                  type="text" 
                  placeholder="Search for buttons, cards, wrappers..." 
                  className="w-full h-full bg-transparent border-none outline-none text-zinc-900 text-lg sm:text-xl placeholder:text-zinc-400 placeholder:font-light font-medium"
                />
                
                <div className="pr-3 shrink-0 flex items-center">
                   <button className="hidden sm:block bg-zinc-900 text-white px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-zinc-800 hover:shadow-md transition-all active:scale-95 border border-zinc-800">
                     Search
                   </button>
                   <button className="block sm:hidden bg-zinc-900 text-white p-3 rounded-full hover:bg-zinc-800 hover:shadow-md transition-all active:scale-95">
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

            {/* Hero Visual Mockup: Code vs Preview */}
            <div className="w-full max-w-4xl mx-auto p-2 bg-zinc-50 border border-zinc-100 rounded-[24px] shadow-2xl shadow-zinc-200/50 relative hidden md:block">
               <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent"></div>
               <div className="bg-white border border-zinc-200/60 rounded-[16px] overflow-hidden flex flex-col md:flex-row h-[320px] text-left">
                  {/* Code Side */}
                  <div className="w-full md:w-1/2 bg-zinc-950 p-6 flex flex-col font-mono text-[13px] leading-relaxed">
                    <div className="flex items-center gap-1.5 mb-5">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                    </div>
                    <div className="text-zinc-400"><span className="text-pink-400">export default function</span> <span className="text-blue-400">SubscribeUI</span>() {'{'}</div>
                    <div className="pl-4 text-zinc-300"><span className="text-pink-400">return</span> (</div>
                    <div className="pl-8 text-zinc-400">{'<div className="flex p-1 bg-white border border-zinc-200 rounded-lg shadow-sm">'}</div>
                    <div className="pl-12 text-zinc-400">{'<input'}</div>
                    <div className="pl-16 text-zinc-500">{'type="email"'}</div>
                    <div className="pl-16 text-zinc-500">{'placeholder="Email address"'}</div>
                    <div className="pl-16 text-zinc-500">{'className="px-4 py-2 outline-none flex-1"'}</div>
                    <div className="pl-12 text-zinc-400">{('/>')}</div>
                    <div className="pl-12 text-zinc-400">{'<button className="bg-zinc-900 text-white px-4 py-2 rounded-md">'}</div>
                    <div className="pl-16 text-zinc-300">Subscribe</div>
                    <div className="pl-12 text-zinc-400">{'</button>'}</div>
                    <div className="pl-8 text-zinc-400">{'</div>'}</div>
                    <div className="pl-4 text-zinc-300">)</div>
                    <div className="text-zinc-400">{'}'}</div>
                  </div>
                  {/* Preview Side */}
                  <div className="w-full md:w-1/2 bg-white p-8 flex items-center justify-center border-l border-zinc-100 relative">
                     <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40"></div>
                     <div className="relative flex p-1 shadow-sm rounded-lg bg-white border border-zinc-200 w-full max-w-sm hover:shadow-md transition-shadow duration-300 group">
                        <input type="email" placeholder="Email address" className="px-4 py-2 text-sm outline-none flex-1 min-w-0 bg-transparent" />
                        <button className="bg-zinc-900 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-zinc-800 active:scale-[0.98] transition-all">Subscribe</button>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* BROWSE SECTION */}
        <section id="browse-section" className="container mx-auto px-4 py-16 md:py-24 flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-text-main mb-2">Curated Library</h2>
              <p className="text-[15px] text-text-mut font-light">Explore perfectly crafted elements by the community.</p>
            </div>
            
            {/* Category Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              {categories.map((cat, i) => (
                <button 
                  key={cat}
                  id={`cat-chip-${cat.toLowerCase()}`}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-medium transition-all border ${
                    i === 0 
                      ? 'bg-primary border-primary text-white shadow-sm' 
                      : 'bg-white border-border-subtle text-text-sec hover:text-text-main hover:border-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          {/* Element Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
            {dummyElements.map(el => (
              <ElementCard 
                key={el.id}
                id={el.id}
                title={el.title}
                creator={el.creator}
                tags={el.tags}
                likesCount={el.likesCount}
                frameworkType={el.frameworkType}
              >
                {el.preview}
              </ElementCard>
            ))}
          </div>
          
          <div className="mt-16 flex justify-center">
            <button 
              id="btn-load-more"
              className="px-6 py-2.5 rounded-full border border-border-subtle bg-white text-[13px] font-medium hover:bg-zinc-50 hover:border-zinc-300 transition-all text-text-sec hover:text-text-main shadow-sm"
            >
              Show More Results
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
