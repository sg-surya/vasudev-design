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
      className="group relative flex flex-col p-2 rounded-[28px] bg-white border border-zinc-200/70 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:border-zinc-300 transition-all duration-500"
      id={`element-card-${id}`}
    >
      {/* Inner Bento Preview Area */}
      <div className="relative flex-1 min-h-[220px] rounded-[20px] overflow-hidden flex items-center justify-center bg-zinc-50/80 mb-3 border border-zinc-100/80">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:12px_12px] opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-50/50"></div>
        
        {/* Scaled Render of Children */}
        <div className="relative z-10 transition-transform duration-500 group-hover:scale-105">
          {children}
        </div>

        {/* Glossy Hover Actions Reveal */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        <div className="absolute bottom-5 inset-x-0 flex items-center justify-center gap-2.5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button 
            className="flex items-center gap-1.5 bg-zinc-900 text-white shadow-lg px-4 py-2.5 rounded-full text-[13px] font-semibold hover:bg-zinc-800 hover:scale-105 transition-all active:scale-95"
            aria-label="View Code"
          >
            <Code2 className="w-4 h-4" /> <span>View Code</span>
          </button>
          <button 
            className="flex items-center gap-1.5 bg-white text-zinc-700 border border-zinc-200 shadow-md px-4 py-2.5 rounded-full text-[13px] font-semibold hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-300 hover:scale-105 transition-all active:scale-95"
            aria-label="Copy Component"
          >
            <Copy className="w-4 h-4" /> <span>Copy</span>
          </button>
        </div>
        
        {/* Framework & Tag Overlay Badge */}
        <div className="absolute top-3 left-3 z-20">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 text-zinc-600 shadow-sm cursor-default">
            {frameworkType === 'React' ? <Sparkles className="w-3 h-3 text-blue-500" /> : <Code2 className="w-3 h-3 text-emerald-500" />}
            <span className="text-[11px] font-bold tracking-wide uppercase">{frameworkType}</span>
          </div>
        </div>
      </div>
      
      {/* Meta Footer */}
      <div className="px-3 pb-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold tracking-tight text-zinc-900 text-[16px] leading-tight truncate pr-2 group-hover:text-zinc-600 transition-colors cursor-pointer">
            {title}
          </h3>
          <button 
            className="flex items-center gap-1 text-zinc-400 hover:text-pink-500 group/like transition-colors"
            aria-label="Like element"
          >
            <Heart className="w-4 h-4 group-hover/like:fill-pink-500 transition-all" /> 
            <span className="text-[13px] font-medium group-hover/like:text-pink-600">{likesCount}</span>
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1.5 cursor-pointer group/user">
            <div className="w-[22px] h-[22px] rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 border border-zinc-300/80 flex items-center justify-center text-[10px] font-bold text-zinc-600 group-hover/user:text-zinc-900 group-hover/user:border-zinc-400 transition-colors shadow-sm">
              {creator.avatar}
            </div>
            <span className="text-[13px] font-medium text-zinc-500 group-hover/user:text-zinc-900 transition-colors">
              {creator.username}
            </span>
          </div>
          
          <div className="flex gap-1.5">
             {tags.slice(0, 2).map((tag, i) => (
                <span key={`${id}-${tag}-${i}`} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-500 border border-zinc-200/50">
                  {tag}
                </span>
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
