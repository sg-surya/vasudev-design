'use client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ElementCard } from '@/components/ElementCard';
import { Search, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { useState } from 'react';

// Standalone dummy components for Explore Page to avoid deep imports
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

const ExploreDummyElements = [
  { id: 'ex-1', title: 'Minimal Dark Button', creator: { username: 'alex_ui', avatar: 'A' }, tags: ['button'], likesCount: 428, frameworkType: 'Tailwind', Preview: MinimalButton },
  { id: 'ex-2', title: 'Soft Segmented Control', creator: { username: 'sarah_design', avatar: 'S' }, tags: ['nav'], likesCount: 256, frameworkType: 'React', Preview: SegmentedControl },
  { id: 'ex-3', title: 'Secondary Button', creator: { username: 'josh_dev', avatar: 'J' }, tags: ['button'], likesCount: 120, frameworkType: 'React', Preview: () => <button className="px-5 py-2 bg-white border border-zinc-200 font-medium rounded-xl shadow-sm text-sm text-zinc-900">Cancel</button> },
  { id: 'ex-4', title: 'Danger Badge', creator: { username: 'ui_wizard', avatar: 'U' }, tags: ['badge'], likesCount: 89, frameworkType: 'Tailwind', Preview: () => <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg font-medium text-xs">Deleted</span> },
  { id: 'ex-5', title: 'Status Pill', creator: { username: 'alex_ui', avatar: 'A' }, tags: ['badge'], likesCount: 312, frameworkType: 'CSS', Preview: () => <span className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-full font-medium text-xs border border-zinc-200">Draft</span> },
];

export default function ExplorePage() {
  const frameworks = ["All", "React", "Tailwind CSS", "Next.js", "Framer Motion", "Vanilla CSS"];
  const categories = ["Components", "Buttons", "Cards", "Inputs", "Navbars", "Loaders"];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Explore Header */}
      <div className="pt-32 sm:pt-40 pb-10 px-6 sm:px-8 xl:px-16 border-b border-zinc-200/60 bg-zinc-50/50">
        <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-6">Explore Components</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-4xl">
           <div className="relative flex-1">
             <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
             <input 
               type="text" 
               placeholder="Search for tags, creators, components..." 
               className="w-full bg-white border border-zinc-200 shadow-[0_2px_12px_rgb(0,0,0,0.03)] rounded-full py-4 pl-12 pr-4 text-[15px] font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-zinc-100 focus:border-zinc-300 transition-all"
             />
           </div>
           <button className="flex items-center justify-center gap-2 bg-white border border-zinc-200 shadow-sm rounded-full px-8 py-4 text-[14px] font-semibold text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300 transition-colors active:scale-95">
             <SlidersHorizontal className="w-4 h-4" /> Filters
           </button>
        </div>
      </div>

      <main className="flex-1 w-full flex flex-col lg:flex-row">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-[280px] border-r border-zinc-200/60 p-8 pt-10 sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto">
           <div className="mb-10">
             <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-4">Frameworks</h3>
             <ul className="flex flex-col gap-1.5">
               {frameworks.map((fw, i) => (
                 <li key={fw}>
                   <button className={`w-full text-left px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors ${i === 0 ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}>
                     {fw}
                   </button>
                 </li>
               ))}
             </ul>
           </div>

           <div>
             <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-4">Categories</h3>
             <ul className="flex flex-col gap-1.5">
               {categories.map((cat, i) => (
                 <li key={cat}>
                   <button className={`w-full text-left px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors ${i === 0 ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}>
                     {cat}
                   </button>
                 </li>
               ))}
             </ul>
           </div>
        </aside>

        {/* Grid Content */}
        <div className="flex-1 p-6 sm:p-8 xl:p-12 bg-white min-h-[800px]">
           {/* Applied Filters Mobile Row */}
           <div className="flex lg:hidden overflow-x-auto gap-2 pb-6 mb-2 border-b border-zinc-100 scrollbar-hide">
             {categories.map((cat, i) => (
                <button key={cat} className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-semibold border ${i === 0 ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-600 border-zinc-200'}`}>
                  {cat}
                </button>
             ))}
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 xl:gap-8 pb-20">
             {/* Multiplying dummy items for visual bulk */}
             {[...ExploreDummyElements, ...ExploreDummyElements.map(e => ({...e, id: e.id+'2'})), ...ExploreDummyElements.map(e => ({...e, id: e.id+'3'})), ...ExploreDummyElements.map(e => ({...e, id: e.id+'4'}))].map((el, i) => (
                <ElementCard 
                  key={`${el.id}-${i}`}
                  id={el.id}
                  title={el.title}
                  creator={el.creator}
                  tags={el.tags}
                  likesCount={el.likesCount}
                  frameworkType={el.frameworkType}
                >
                  <el.Preview />
                </ElementCard>
             ))}
           </div>
           
           {/* Pagination Simulation */}
           <div className="flex items-center justify-center gap-2 pb-10">
             <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 font-medium">1</button>
             <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900 text-white border border-zinc-900 font-medium shadow-md">2</button>
             <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 font-medium">3</button>
             <span className="text-zinc-400 px-2 font-medium">...</span>
             <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 font-medium">8</button>
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
