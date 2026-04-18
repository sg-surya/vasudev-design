'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Code2, ArrowRight, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function SubmitPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    framework: 'React',
    category: 'Buttons',
    code: '<button className="px-6 py-2 bg-black text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-medium">\n  Click me\n</button>'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to submit components.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'elements'), {
        title: formData.title,
        frameworkType: formData.framework,
        category: formData.category,
        code: formData.code,
        creatorId: user.uid,
        creatorName: user.displayName || 'Anonymous',
        creatorAvatar: user.photoURL || '',
        status: 'pending', // IMPORTANT: All submissions start as pending
        likesCount: 0,
        tags: [formData.category.toLowerCase(), formData.framework.toLowerCase()],
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
    } catch (error) {
       console.error("Submission error:", error);
       alert("Failed to submit. Check console.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-8 border border-emerald-100 animate-in zoom-in duration-500">
               <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight mb-4">Submission Received!</h1>
            <p className="text-zinc-500 max-w-sm mb-10 leading-relaxed">Your component has been sent to the vault. An admin will verify the code and publish it shortly.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setSuccess(false)} className="px-8 py-3 bg-zinc-900 font-bold text-white rounded-full hover:bg-zinc-800 transition-all">Submit Another</button>
              <button onClick={() => window.location.href = '/explore'} className="px-8 py-3 bg-white border border-zinc-200 font-bold text-zinc-900 rounded-full hover:bg-zinc-50 transition-all">Explore Elements</button>
            </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-20 flex flex-col lg:flex-row gap-8 xl:gap-16">
        
        {/* Left Column: Form Details */}
        <div className="w-full lg:w-5/12 flex flex-col justify-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-3">Submit Component</h1>
            <p className="text-zinc-500 text-[15px] leading-relaxed mb-8">
              Share your crafted UI elements with the Vasudev Design community. Review the live preview before submitting.
            </p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-zinc-900">Component Title</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Glowing Neon Button" 
                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-zinc-100 focus:border-zinc-300 transition-all shadow-sm"
              />
            </div>

            {/* Framework & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-zinc-900">Framework</label>
                <div className="relative">
                  <select 
                    value={formData.framework}
                    onChange={(e) => setFormData({...formData, framework: e.target.value})}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-100 focus:border-zinc-300 transition-all shadow-sm appearance-none"
                  >
                    <option>React</option>
                    <option>Tailwind CSS</option>
                    <option>Next.js</option>
                    <option>Framer Motion</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-zinc-900">Category</label>
                <div className="relative">
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-100 focus:border-zinc-300 transition-all shadow-sm appearance-none"
                  >
                    <option>Buttons</option>
                    <option>Cards</option>
                    <option>Navbars</option>
                    <option>Inputs</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-semibold text-zinc-900">Code (JSX / HTML)</label>
                <span className="text-[10px] font-bold text-zinc-500 bg-zinc-200/50 px-2 py-0.5 rounded border border-zinc-200 uppercase tracking-wider">Tailwind Support</span>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-[0_4px_12px_rgb(0,0,0,0.05)] border border-zinc-200/80">
                <div className="bg-[#18181b] flex items-center justify-between px-4 py-2.5 border-b border-zinc-800">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-mono font-medium">Button.tsx</span>
                </div>
                <textarea 
                  required
                  rows={9}
                  className="w-full bg-[#0d0d12] text-zinc-300 p-5 text-[13px] font-mono focus:outline-none resize-y placeholder:text-zinc-700 leading-relaxed"
                  placeholder={'<button className="px-6 py-2 bg-black text-white rounded-full">\n  Click me\n</button>'}
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white rounded-xl px-6 py-4 text-[15px] font-semibold hover:bg-zinc-800 hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-4 h-4" />} 
                {loading ? 'Submitting...' : 'Submit for Review'}
              </button>
              <p className="text-center text-[12px] text-zinc-500 font-medium mt-4">
                By submitting, you agree to the open-source MIT License.
              </p>
            </div>
          </form>
        </div>

        {/* Right Column: Live Preview mock */}
        <div className="w-full lg:w-7/12 relative hidden lg:block">
          <div className="sticky top-[104px] w-full h-[700px] border border-zinc-200/80 bg-white rounded-[32px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex flex-col">
            {/* Header */}
            <div className="h-14 border-b border-zinc-100 flex items-center justify-between px-6 bg-zinc-50/80 backdrop-blur-md">
              <span className="text-[13px] font-bold tracking-wide text-zinc-700 flex items-center gap-2"><Code2 className="w-4 h-4" /> LIVE PREVIEW</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-200">
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Active</span>
              </div>
            </div>
            
            {/* Canvas */}
            <div className="flex-1 relative bg-white flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/50 pointer-events-none"></div>
              
              {/* Dynamic Render Mockup */}
              <div className="relative z-10 scale-125 bg-white p-12 rounded-[2rem] border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center">
                 <div dangerouslySetInnerHTML={{ __html: formData.code }} />
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
