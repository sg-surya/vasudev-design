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
          <div className="bg-[#fafafa] hover:bg-white rounded-3xl p-10 border border-zinc-200/50 hover:shadow-xl hover:shadow-zinc-200/40 hover:border-zinc-300 transition-all duration-300 relative flex flex-col">
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">Hobby</h3>
            <p className="text-zinc-500 flex-1">For individuals and open-source projects.</p>
            <div className="my-8">
              <span className="text-5xl font-black tracking-tight">$0</span>
              <span className="text-zinc-500 font-medium ml-2">/forever</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              {['Access to all free components', 'Community support', 'Basic updates', 'Standard MIT license'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-600 font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4 text-zinc-400" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/explore" className="w-full py-3 rounded-xl border border-zinc-200 text-zinc-900 font-bold tracking-wide text-[14px] text-center hover:bg-zinc-50 transition-colors">
              Start Free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-zinc-900 rounded-3xl p-10 shadow-lg relative flex flex-col justify-between">
            <div className="absolute top-0 right-8 -translate-y-1/2">
              <div className="bg-gradient-to-r from-zinc-700 to-zinc-800 border border-zinc-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">Most Popular</div>
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
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl bg-white text-zinc-900 font-bold tracking-wide text-[14px] hover:bg-zinc-100 hover:scale-[0.98] transition-all">
              Get Lifetime Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
