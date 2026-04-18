'use client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ElementCard } from '@/components/ElementCard';
import { MapPin, Calendar, Link as LinkIcon, Edit3, LayoutGrid, Heart, Bookmark, ChevronRight } from 'lucide-react';

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
  { id: 'usr-1', title: 'Action Button', creator: { username: 'alex_ui', avatar: 'A' }, tags: ['button', 'dark'], likesCount: 428, frameworkType: 'Tailwind', preview: <DummyButton /> },
  { id: 'usr-2', title: 'Pricing Card structure', creator: { username: 'alex_ui', avatar: 'A' }, tags: ['card', 'pricing'], likesCount: 256, frameworkType: 'React', preview: <DummyCard /> },
  { id: 'usr-3', title: 'Action Button Vol 2', creator: { username: 'alex_ui', avatar: 'A' }, tags: ['button'], likesCount: 96, frameworkType: 'React', preview: <DummyButton /> },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full pb-20">
        {/* Banner */}
        <div className="w-full h-48 md:h-64 lg:h-72 bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 relative">
          <div className="absolute inset-0 bg-[radial-gradient(#a1a1aa_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
          {/* Cover Edit Button */}
          <button className="absolute top-28 right-6 md:right-12 bg-white/80 backdrop-blur-md border border-white/50 text-zinc-700 px-4 py-2 rounded-full text-xs font-semibold shadow-sm hover:bg-white hover:-translate-y-0.5 transition-all">
            Change Cover
          </button>
        </div>

        {/* Profile Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-16 md:-mt-20 relative z-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            {/* User Info */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="w-full h-full rounded-[1.5rem] bg-gradient-to-tr from-zinc-800 to-zinc-600 flex items-center justify-center text-4xl md:text-5xl font-bold text-white shadow-inner">
                  A
                </div>
              </div>
              
              <div className="text-center md:text-left pb-2">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-2">Alex Deigner</h1>
                <p className="text-[17px] text-zinc-500 font-medium mb-4">@alex_ui</p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[13px] text-zinc-500 font-medium">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> San Francisco, CA</span>
                  <span className="flex items-center gap-1.5"><LinkIcon className="w-4 h-4" /> <a href="#" className="hover:text-zinc-900 hover:underline">alexui.co</a></span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined Apr 2024</span>
                </div>
              </div>
            </div>

            {/* Actions & Stats */}
            <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between md:justify-end gap-6 pb-2">
              <button className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-2.5 rounded-full text-[14px] font-semibold hover:bg-zinc-800 hover:shadow-lg transition-all active:scale-95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                <Edit3 className="w-4 h-4" /> Edit Profile
              </button>

              <div className="flex items-center gap-6 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-zinc-900 leading-none">24</span>
                  <span className="text-[12px] font-semibold text-zinc-500 uppercase tracking-wider mt-1">Components</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-zinc-900 leading-none">12.4k</span>
                  <span className="text-[12px] font-semibold text-zinc-500 uppercase tracking-wider mt-1">Likes</span>
                </div>
              </div>
            </div>
          </div>

          <p className="max-w-2xl text-[15px] leading-relaxed text-zinc-600 mb-12 text-center md:text-left">
            Frontend engineer specializing in micro-interactions and extremely clean user interfaces. Core contributor to the Vasudev ecosystem. Building things that look good and feel great.
          </p>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto gap-8 border-b border-zinc-200 mb-10 scrollbar-hide">
             <button className="flex items-center gap-2 pb-4 text-[15px] font-semibold text-zinc-900 border-b-2 border-zinc-900 relative">
               <LayoutGrid className="w-4 h-4" /> My Submissions
             </button>
             <button className="flex items-center gap-2 pb-4 text-[15px] font-medium text-zinc-500 hover:text-zinc-700 transition-colors">
               <Heart className="w-4 h-4" /> Liked
             </button>
             <button className="flex items-center gap-2 pb-4 text-[15px] font-medium text-zinc-500 hover:text-zinc-700 transition-colors">
               <Bookmark className="w-4 h-4" /> Saved <span className="ml-1 bg-zinc-100 text-zinc-600 py-0.5 px-2 rounded-full text-[10px] font-bold">12</span>
             </button>
          </div>

          {/* User Components Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
            {[...UserElements, ...UserElements].map((el, index) => (
               <ElementCard 
                 key={`${el.id}-${index}`}
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

        </div>
      </main>

      <Footer />
    </div>
  );
}
