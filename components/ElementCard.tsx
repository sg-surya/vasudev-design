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
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative flex flex-col aspect-[4/3] rounded-2xl bg-[#fafafa] hover:bg-white border text-zinc-900 border-zinc-200/50 hover:shadow-xl hover:shadow-zinc-200/40 hover:border-zinc-300 transition-all duration-300 overflow-hidden cursor-pointer"
      id={`element-card-${id}`}
    >
      
      {/* Component Preview Container */}
      <div className="relative flex-1 flex items-center justify-center p-6 z-10 transition-transform duration-500">
        {children}
      </div>

      {/* Hover Overlay & Action */}
      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
        <Link 
          href={`/element/${id}`}
          className="relative w-full bg-white text-zinc-900 border border-zinc-200/60 shadow-sm py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-50 hover:border-zinc-300 transition-all active:scale-[0.98]"
          aria-label="Get Code"
        >
          <Code2 className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-[12px] font-bold tracking-wide">View code</span>
        </Link>
      </div>

      {/* Subtle Identifier (Title) - Only visible on hover at the top if needed, but keeping it minimal as requested */}
      <div className="absolute top-4 inset-x-0 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 flex justify-between items-start">
         <p className="text-[11px] font-semibold tracking-wide text-zinc-500">{title}</p>
         <div className="bg-zinc-100/80 backdrop-blur-sm border border-zinc-200/50 rounded-md px-1.5 py-0.5">
           <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">{frameworkType}</span>
         </div>
      </div>
    </motion.div>
  );
}
