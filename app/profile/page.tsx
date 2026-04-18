'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { ElementCard } from '@/components/ElementCard';
import { MapPin, Calendar, Link as LinkIcon, Edit3, LayoutGrid, Heart, Bookmark, ChevronRight, Share2, ArrowLeft, MoreHorizontal } from 'lucide-react';

const DummyButton = () => (
  <button className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full shadow-lg flex items-center gap-2">
    Continue <ChevronRight className="w-4 h-4 text-zinc-400" />
  </button>
);

const DummyCard = () => (
  <div className="p-4 bg-white border border-zinc-200 shadow-sm rounded-2xl w-full max-w-[200px]">
    <div className="h-8 w-8 bg-zinc-100 rounded-lg mb-3"></div>
    <div className="h-4 w-2/3 bg-zinc-200 rounded-full mb-2"></div>
    <div className="h-3 w-1/2 bg-zinc-100 rounded-full"></div>
  </div>
);

const UserElements = [
  { id: 'usr-1', title: 'Action Button', creator: { username: 'alex_ui', avatar: 'A' }, tags: ['button', 'dark'], likesCount: 428, frameworkType: 'Tailwind', Preview: DummyButton },
  { id: 'usr-2', title: 'Pricing Card structure', creator: { username: 'alex_ui', avatar: 'A' }, tags: ['card', 'pricing'], likesCount: 256, frameworkType: 'React', Preview: DummyCard },
  { id: 'usr-3', title: 'Action Button Vol 2', creator: { username: 'alex_ui', avatar: 'A' }, tags: ['button'], likesCount: 96, frameworkType: 'React', Preview: DummyButton },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('creations');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 
        Removed Standard Navbar 
        Using Custom Immersive Header inside the Banner instead
      */}
      
      {/* Premium Rounded Banner */}
      <div className="w-full px-[2px] sm:px-[4px] pt-[2px] sm:pt-[4px]">
        <div className="w-full h-[240px] md:h-[320px] lg:h-[380px] relative overflow-hidden bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200 border border-zinc-200/60 rounded-[2rem] shadow-none">
        
        {/* Floating Minimal Profile Navigation */}
        <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 z-50 flex items-center justify-between">
           <Link href="/" className="bg-white/60 hover:bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full text-[13px] font-bold text-zinc-900 border border-white/40 shadow-sm transition-all flex items-center gap-2">
             <ArrowLeft className="w-4 h-4" /> Home
           </Link>
           <button className="w-10 h-10 bg-white/60 hover:bg-white/90 backdrop-blur-md rounded-full border border-white/40 shadow-sm transition-all flex items-center justify-center text-zinc-900">
             <MoreHorizontal className="w-5 h-5" />
           </button>
        </div>

        {/* Subtle Textures */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:24px_24px] opacity-50"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/60 blur-[80px] rounded-full mix-blend-overlay pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-zinc-200/50 blur-[100px] rounded-full pointer-events-none"></div>
        
        {/* Cover Action */}
        <div className="absolute bottom-6 right-6 md:right-12 z-20">
          <button className="bg-white/80 backdrop-blur-md border border-white/50 text-zinc-700 px-4 py-2 rounded-xl text-[13px] font-semibold hover:bg-white hover:scale-105 transition-all shadow-sm flex items-center gap-2">
            <Edit3 className="w-4 h-4" /> Change Cover
          </button>
        </div>
        </div>
      </div>

      {/* Main Profile Content (Overlapping) */}
      <main className="flex-1 w-full pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-20">
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-end -mt-16 md:-mt-24 mb-12">
            {/* Avatar Block */}
            <div className="p-2.5 bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2rem] bg-gradient-to-tr from-zinc-900 to-zinc-700 flex items-center justify-center border border-zinc-800 relative overflow-hidden group cursor-pointer">
                <span className="text-4xl md:text-6xl text-white font-bold tracking-tighter relative z-10 group-hover:scale-110 transition-transform duration-500">AD</span>
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] pointer-events-none"></div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-20">
                  <Edit3 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Profile Meta */}
            <div className="flex-1 pb-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-2">Alex Designer</h1>
              <p className="text-[17px] md:text-[19px] text-zinc-500 font-medium mb-5">
                @alex_ui <span className="mx-2 text-zinc-300">•</span> UI/UX Engineer
              </p>
              
              <div className="flex flex-wrap items-center gap-5 text-[14px] text-zinc-500 font-medium">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-zinc-400" /> San Francisco, CA</span>
                <span className="flex items-center gap-1.5"><LinkIcon className="w-4 h-4 text-zinc-400" /> <a href="#" className="text-zinc-700 hover:text-zinc-900 font-semibold hover:underline">alexui.co</a></span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-zinc-400" /> Joined Apr 2024</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pb-4 flex items-center gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-900 text-white px-7 py-3.5 rounded-xl text-[14px] font-semibold hover:bg-zinc-800 hover:shadow-lg transition-all active:scale-95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                Edit Profile
              </button>
              <button className="flex items-center justify-center w-12 h-12 bg-white border border-zinc-200 text-zinc-700 rounded-xl hover:bg-zinc-50 hover:border-zinc-300 transition-all active:scale-95 shadow-sm">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bio & Stats Row */}
          <div className="flex flex-col md:flex-row gap-12 mb-16 justify-between items-start md:items-center">
            <div className="flex-1 max-w-2xl">
              <p className="text-[16px] leading-[1.8] text-zinc-600 font-medium">
                Frontend engineer specializing in micro-interactions and extremely clean user interfaces. Core contributor to the Vasudev ecosystem. Building things that look good and feel great. Always experimenting with Framer Motion and Tailwind CSS.
              </p>
            </div>
            <div className="flex items-center gap-10">
               <div className="flex flex-col md:items-end">
                 <span className="text-3xl font-bold text-zinc-900 tracking-tight">24</span>
                 <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mt-1">Creations</span>
               </div>
               <div className="flex flex-col md:items-end">
                 <span className="text-3xl font-bold text-zinc-900 tracking-tight">12.4k</span>
                 <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mt-1">Likes</span>
               </div>
               <div className="flex flex-col md:items-end">
                 <span className="text-3xl font-bold text-zinc-900 tracking-tight">1.2m</span>
                 <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mt-1">Views</span>
               </div>
            </div>
          </div>

          {/* Elite Navigation Layout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 border-b border-zinc-200/60 pb-[1px]">
             <div className="flex overflow-x-auto gap-8 scrollbar-hide">
               <button 
                 onClick={() => setActiveTab('creations')}
                 className={`flex items-center gap-2 pb-4 text-[15px] relative whitespace-nowrap transition-all ${activeTab === 'creations' ? 'font-semibold text-zinc-900 border-b-2 border-zinc-900' : 'font-medium text-zinc-500 hover:text-zinc-900 border-b-2 border-transparent hover:border-zinc-300'}`}
               >
                 <LayoutGrid className={`w-4 h-4 ${activeTab === 'creations' ? 'text-zinc-900' : 'text-zinc-400'}`} /> Creations
               </button>
               <button 
                 onClick={() => setActiveTab('appreciated')}
                 className={`flex items-center gap-2 pb-4 text-[15px] relative whitespace-nowrap transition-all ${activeTab === 'appreciated' ? 'font-semibold text-zinc-900 border-b-2 border-zinc-900' : 'font-medium text-zinc-500 hover:text-zinc-900 border-b-2 border-transparent hover:border-zinc-300'}`}
               >
                 <Heart className={`w-4 h-4 ${activeTab === 'appreciated' ? 'text-rose-500' : 'text-zinc-400'}`} /> Appreciated
               </button>
               <button 
                 onClick={() => setActiveTab('bookmarks')}
                 className={`flex items-center gap-2 pb-4 text-[15px] relative whitespace-nowrap transition-all ${activeTab === 'bookmarks' ? 'font-semibold text-zinc-900 border-b-2 border-zinc-900' : 'font-medium text-zinc-500 hover:text-zinc-900 border-b-2 border-transparent hover:border-zinc-300'}`}
               >
                 <Bookmark className={`w-4 h-4 ${activeTab === 'bookmarks' ? 'text-indigo-500' : 'text-zinc-400'}`} /> Bookmarks <span className="ml-1 bg-zinc-100 text-zinc-600 py-0.5 px-2 rounded-full text-[10px] font-bold">12</span>
               </button>
             </div>
             
             {/* Secondary Filter (Mock) */}
             <div className="flex items-center gap-3 pb-4 sm:pb-0">
                <span className="text-[13px] font-medium text-zinc-400">Sort:</span>
                <select className="bg-transparent text-[14px] font-semibold text-zinc-800 focus:outline-none cursor-pointer">
                  <option>Most Popular</option>
                  <option>Newest First</option>
                </select>
             </div>
          </div>

          {/* Dynamic Content Rendering */}
          {activeTab === 'creations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12 animate-in fade-in duration-500">
              {[...UserElements, ...UserElements, ...UserElements].map((el, index) => (
                 <ElementCard 
                   key={`creation-${el.id}-${index}`}
                   id={`${el.id}-creation-${index}`}
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
          )}

          {activeTab === 'appreciated' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12 animate-in fade-in duration-500">
              {[...UserElements].reverse().map((el, index) => (
                 <ElementCard 
                   key={`liked-${el.id}-${index}`}
                   id={`${el.id}-liked-${index}`}
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
          )}

          {activeTab === 'bookmarks' && (
            <div className="w-full py-24 text-center flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 bg-zinc-50/50">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-zinc-100 mb-5">
                <Bookmark className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-[19px] font-bold text-zinc-900 mb-2 tracking-tight">No bookmarks yet</h3>
              <p className="text-zinc-500 text-[15px] font-medium max-w-md">Components and templates you save will appear here for quick access.</p>
              <button onClick={() => setActiveTab('creations')} className="mt-8 bg-zinc-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-sm">
                Browse Components
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
