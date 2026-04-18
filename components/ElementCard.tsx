'use client';
import { motion } from 'motion/react';
import { Heart, Copy } from 'lucide-react';
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
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col rounded-[20px] bg-white border border-border-subtle overflow-hidden h-full group shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-black/10 transition-all duration-300"
      id={`element-card-${id}`}
    >
      {/* Preview Area */}
      <div className="relative flex-1 min-h-[240px] flex items-center justify-center bg-zinc-50/50 p-6 border-b border-border-subtle overflow-hidden">
        {/* A subtle dot grid background for the preview area */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50"></div>
        
        <div className="w-full flex items-center justify-center relative z-10">
          {children}
        </div>
        
        {/* Hover Actions - Copy Button */}
        <div className="absolute top-4 right-4 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 flex gap-2 z-20">
          <button 
            id={`copy-btn-${id}`}
            aria-label="Copy code"
            className="h-9 w-9 rounded-full bg-white border border-border-subtle flex items-center justify-center text-text-sec hover:text-primary hover:border-primary/20 hover:shadow-sm transition-all"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        
        {/* Framework Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-border-subtle text-text-sec shadow-sm">
            {frameworkType}
          </span>
        </div>
      </div>
      
      {/* Footer Meta Information */}
      <div className="p-4 flex flex-col gap-3 bg-white">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-text-main text-[15px] leading-tight truncate pr-2 hover:text-primary transition-colors cursor-pointer">
            {title}
          </h3>
          <button 
            id={`like-btn-${id}`}
            aria-label="Like element"
            className="flex items-center gap-1.5 text-text-mut text-xs font-semibold group/like"
          >
            <Heart className="w-4 h-4 fill-transparent group-hover/like:fill-error group-hover/like:text-error transition-all" />
            <span className="group-hover/like:text-text-main transition-colors">{likesCount}</span>
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border-subtle/50">
          <div className="flex items-center gap-2 cursor-pointer group/user">
            <div className="w-5 h-5 rounded-full bg-surface-dim border border-border-subtle flex items-center justify-center text-[10px] font-bold text-text-sec group-hover/user:text-primary transition-colors">
              {creator.avatar}
            </div>
            <span className="text-[13px] font-medium text-text-mut group-hover/user:text-text-main transition-colors">
              {creator.username}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 items-center justify-end">
             {tags.slice(0, 2).map((tag, i) => (
                <span key={`${id}-${tag}-${i}`} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-surface-dim text-text-sec">
                  {tag}
                </span>
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
