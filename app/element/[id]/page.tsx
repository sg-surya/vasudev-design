'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShadowPreview } from '@/components/ShadowPreview';
import { ArrowLeft, Copy, Heart, Check, Code2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ElementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [element, setElement] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);
  
  // Extract HTML and CSS for display
  const extractCode = (rawCode: string) => {
    // Basic extraction assuming <style> tags are at the end
    const styleMatch = rawCode.match(/<style>([\s\S]*?)<\/style>/i);
    const cssContent = styleMatch ? styleMatch[1].trim() : '';
    const htmlContent = rawCode.replace(/<style>[\s\S]*?<\/style>/gi, '').trim();
    
    return { htmlContent, cssContent };
  };

  useEffect(() => {
    const fetchElement = async () => {
      if (!params?.id) return;
      if ((params.id as string).startsWith('mock-')) {
        // Handle mock routing gracefully - in a real app this might redirect or show a premium upsell
        setLoading(false);
        return;
      }
      
      try {
        const docRef = doc(db, 'elements', params.id as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
           setElement({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchElement();
  }, [params]);

  const handleCopy = (text: string, type: 'html' | 'css') => {
    navigator.clipboard.writeText(text);
    if (type === 'html') { setCopiedHtml(true); setTimeout(() => setCopiedHtml(false), 2000); }
    if (type === 'css') { setCopiedCss(true); setTimeout(() => setCopiedCss(false), 2000); }
  };

  const [activeTab, setActiveTab] = useState<'html'|'css'>('html');

  if (loading) return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
    </div>
  );

  // If it's a mock element or not found
  if (!element && (params?.id as string)?.startsWith('mock-')) {
     return (
        <div className="h-screen bg-[#fafafa] flex flex-col pt-16">
          <Navbar />
          <div className="flex-1 flex items-center justify-center p-6 text-center">
             <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-zinc-200">
                <AlertCircle className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-zinc-900 mb-2">Premium Component</h2>
                <p className="text-zinc-500 text-sm mb-6">This is a premium mockup component to showcase the library structure. Upgrade to Pro or sign in to explore real components.</p>
                <Link href="/" className="inline-flex items-center justify-center w-full py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all">Go Back</Link>
             </div>
          </div>
        </div>
     );
  }

  if (!element) return (
     <div className="h-screen bg-[#fafafa] flex flex-col items-center justify-center pt-16">
       <Navbar />
       <h1 className="text-2xl font-bold text-zinc-900 mb-4">Component Not Found</h1>
       <Link href="/" className="px-6 py-2 bg-zinc-900 text-white rounded-full text-sm font-semibold">Return Home</Link>
     </div>
  );

  const { htmlContent, cssContent } = extractCode(element.code || '');

  return (
    <div className="h-screen bg-[#fafafa] flex flex-col font-sans overflow-hidden">
      <Navbar />

      {/* 
        The top wrapper takes up full height minus navbar height (approx 72px). 
        pt-20 gives clearance for fixed navbars.
      */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 pt-[84px] pb-6 flex flex-col h-[calc(100vh)] overflow-hidden">
        
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between mb-4 shrink-0 gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="flex items-center gap-2 px-3 py-1.5 text-zinc-600 bg-white border border-zinc-200/60 hover:bg-zinc-50 hover:border-zinc-300 rounded-lg transition-colors font-medium text-xs shadow-sm">
              <ArrowLeft className="w-3.5 h-3.5" /> Go back
            </button>
            <h1 className="font-semibold text-zinc-900 text-lg hidden sm:block">{element.title}</h1>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-zinc-400">by</span>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-zinc-100 py-1 px-2 rounded-full transition-colors">
                  <img src={element.creatorAvatar || `https://api.dicebear.com/9.x/avataaars/svg?seed=${element.creatorName}`} alt={element.creatorName} className="w-6 h-6 rounded-full" />
                  <span className="text-sm font-semibold text-zinc-900">{element.creatorName}</span>
                </div>
             </div>
             <div className="flex items-center gap-1.5 ml-2 bg-white border border-zinc-200/60 rounded-full px-3 py-1.5 shadow-sm">
                <Heart className="w-3.5 h-3.5 text-zinc-400" /> 
                <span className="text-xs font-semibold text-zinc-600">{element.likesCount || 0}</span>
             </div>
          </div>
        </div>

        {/* Main Content Split: H-Screen filling */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          
          {/* Left: Live Preview */}
          <div className="flex-1 bg-white rounded-2xl border border-zinc-200/60 shadow-sm relative flex flex-col min-h-0 overflow-hidden">
             {/* Live Interaction Canvas */}
             <div className="flex-1 relative bg-[#fafafa] flex items-center justify-center p-8 overflow-hidden rounded-2xl">
               <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
               <div className="relative z-10 w-full h-full flex items-center justify-center overflow-auto custom-scrollbar">
                  <ShadowPreview htmlCode={element.code} />
               </div>
             </div>
          </div>

          {/* Right: Code Editor & Export (Tabbed) */}
          <div className="w-full lg:w-[450px] xl:w-[500px] flex flex-col gap-4 shrink-0 min-h-0 bg-transparent rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
            
            <div className="flex-1 bg-zinc-950 rounded-2xl h-full w-full overflow-hidden flex flex-col min-h-0">
               
               {/* Tab Headers */}
               <div className="h-12 border-b border-zinc-800/80 flex items-center justify-between px-2 bg-zinc-900/50">
                  <div className="flex items-center h-full">
                     <button 
                       onClick={() => setActiveTab('html')}
                       className={`h-full px-5 text-xs font-medium font-mono tracking-widest uppercase transition-all flex items-center gap-2 border-b-2 ${activeTab === 'html' ? 'border-rose-500/80 text-rose-400 bg-white/5' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                     >
                        <Code2 className="w-3.5 h-3.5" /> HTML
                     </button>
                     <button 
                       onClick={() => setActiveTab('css')}
                       className={`h-full px-5 text-xs font-medium font-mono tracking-widest uppercase transition-all flex items-center gap-2 border-b-2 ${activeTab === 'css' ? 'border-sky-500/80 text-sky-400 bg-white/5' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                     >
                        <Sparkles className="w-3 h-3" /> CSS
                     </button>
                  </div>
                  
                  <div className="pr-3">
                    <button 
                      onClick={() => handleCopy(activeTab === 'html' ? htmlContent : cssContent, activeTab)} 
                      className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-md border border-zinc-800 hover:bg-zinc-800 uppercase tracking-widest bg-zinc-900/50"
                    >
                      {activeTab === 'html' ? (copiedHtml ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />) : (copiedCss ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />)} 
                      {activeTab === 'html' ? (copiedHtml ? 'Copied' : 'Copy') : (copiedCss ? 'Copied' : 'Copy')}
                    </button>
                  </div>
               </div>
               
               {/* Code Viewer */}
               <div className="flex-1 relative overflow-hidden bg-zinc-950">
                  <div className={`absolute inset-0 p-5 overflow-auto custom-scrollbar transition-opacity duration-200 ${activeTab === 'html' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    <pre className="text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed"><code className="html">{htmlContent}</code></pre>
                  </div>
                  <div className={`absolute inset-0 p-5 overflow-auto custom-scrollbar transition-opacity duration-200 ${activeTab === 'css' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    <pre className="text-xs font-mono text-sky-200/80 whitespace-pre-wrap leading-relaxed"><code className="css">{cssContent || '/* No internal CSS found */'}</code></pre>
                  </div>
               </div>
            </div>

          </div>
        </div>

      </main>
      
      {/* Scrollbar overrides for dark editor */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}} />
    </div>
  );
}
