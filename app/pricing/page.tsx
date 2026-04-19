import { CheckCircle2 } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 mb-6">
            Simple, transparent pricing.
          </h1>
          <p className="text-lg text-zinc-500 font-medium">
            Get lifetime access to all components, regular updates, and premium templates. No recurring subscriptions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white rounded-[32px] p-10 border border-zinc-200/60 shadow-sm relative flex flex-col">
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">Hobby</h3>
            <p className="text-zinc-500 flex-1">For individuals and open-source projects.</p>
            <div className="my-8">
              <span className="text-5xl font-black tracking-tight">$0</span>
              <span className="text-zinc-500 font-medium ml-2">/forever</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              {['Access to all free components', 'Community support', 'Basic updates', 'Standard MIT license'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-600 font-medium text-sm">
                  <CheckCircle2 className="w-5 h-5 text-zinc-400" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/explore" className="w-full py-4 rounded-xl border border-zinc-200 text-zinc-900 font-bold tracking-wide text-center hover:bg-zinc-50 transition-colors">
              Start Free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-zinc-900 rounded-[32px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative flex flex-col">
            <div className="absolute top-0 right-10 -translate-y-1/2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">Most Popular</div>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Pro Access</h3>
            <p className="text-zinc-400 flex-1">For professional developers and teams.</p>
            <div className="my-8">
              <span className="text-5xl font-black tracking-tight text-white">$149</span>
              <span className="text-zinc-500 font-medium ml-2">/one-time</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              {[
                'Everything in Hobby',
                'Premium block templates',
                'Commercial ready license',
                'Priority email support',
                'Framer template source files'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-300 font-medium text-sm">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-xl bg-white text-zinc-900 font-bold tracking-wide hover:bg-zinc-100 hover:scale-[0.98] transition-all">
              Get Lifetime Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
