'use client';
import { motion } from 'motion/react';
import { Heart, Copy, Code2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function ElementCard({
  id,
  title,
  creator,
  tags,
  likesCount,
  frameworkType,
  children,
}: {
  id: string;
  title: string;
  creator: { username: string; avatar: string };
  tags: string[];
  likesCount: number;
  frameworkType: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative flex flex-col aspect-square rounded-[32px] bg-white border border-zinc-200/60 shadow-[0_2px_8px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] hover:border-zinc-300 transition-all duration-500 overflow-hidden"
      id={`element-card-${id}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
      
      {/* Component Preview Container */}
      <div className="relative flex-1 flex items-center justify-center p-8 z-10 transition-transform duration-500 group-hover:scale-[1.02]">
        {children}
      </div>

      {/* Hover Overlay & Button */}
      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-20">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        <button 
          className="relative w-full bg-zinc-900 text-white shadow-xl py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-[0.98]"
          aria-label="Get Code"
        >
          <Code2 className="w-4 h-4" />
          <span className="text-[14px] font-black uppercase tracking-widest">Get Code</span>
        </button>
      </div>

      {/* Subtle Identifier (Title) - Only visible on hover at the top if needed, but keeping it minimal as requested */}
      <div className="absolute top-6 inset-x-0 px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-center">{title}</p>
      </div>
      
      {/* Small Framework Indicator */}
      <div className="absolute bottom-4 right-4 z-10 group-hover:opacity-0 transition-opacity duration-300">
        <div className="bg-zinc-100/50 backdrop-blur-sm border border-zinc-200/50 rounded-lg px-2 py-1">
          <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-400">{frameworkType}</span>
        </div>
      </div>
    </motion.div>
  );
}
