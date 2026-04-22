'use client';
import React, { useRef, useEffect } from 'react';

export function ShadowPreview({ htmlCode, cssCode }: { htmlCode: string; cssCode?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Attach Shadow DOM if not already present
    if (!containerRef.current.shadowRoot) {
      containerRef.current.attachShadow({ mode: 'open' });
    }
    
    const shadow = containerRef.current.shadowRoot;
    if (shadow) {
      // We inject a base reset to ensure the component centers properly inside the preview box
      // and doesn't inherit global styles unintentionally, ensuring 100% accurate rendering.
      shadow.innerHTML = `
        <style>
          :host {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 1rem;
            box-sizing: border-box;
            background: transparent;
          }
          * {
            box-sizing: border-box;
          }
          /* Custom CSS */
          ${cssCode || ''}
        </style>
        ${htmlCode}
      `;
    }
  }, [htmlCode, cssCode]);

  return <div ref={containerRef} className="w-full h-full" />;
}
