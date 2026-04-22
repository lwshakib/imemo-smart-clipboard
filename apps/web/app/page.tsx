"use client"

import Link from "next/link"
import { Icon } from "@iconify/react"
import { ModeToggle } from "@/components/mode-toggle"
import { Logo } from "@/components/logo"
import { Download, Zap, History, Keyboard, Shield, Star, Image as ImageIcon, Search } from "lucide-react"

export default function Page() {
  return (
    <div className="bg-zinc-950 font-light antialiased transition-colors duration-300 dark:bg-zinc-950 light:bg-zinc-50">
      {/* Minimalist Navigation */}
      <nav className="fixed top-0 w-full bg-zinc-950/70 backdrop-blur-xl z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="font-medium text-lg tracking-tighter text-zinc-50 flex items-center gap-3">
            <Logo size={28} />
            iMemo
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link 
              href="/download" 
              className="text-xs font-medium text-zinc-950 bg-zinc-50 hover:bg-zinc-200 transition-colors px-4 py-1.5 rounded-full flex items-center gap-2"
            >
              <Download size={12} />
              Download
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 relative overflow-hidden" 
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.08) 0%, transparent 70%)' }}
      >
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-900/30 bg-sky-900/10 text-xs text-sky-300 mb-8">
            <Icon icon="solar:star-fall-minimalistic-linear" className="text-sky-400 text-sm" />
            The Ultimate Clipboard Companion
          </div>
          <h1 className="md:text-6xl lg:text-7xl leading-tight text-4xl font-medium text-zinc-50 tracking-tighter max-w-4xl mx-auto mb-8">
            Your Clipboard, <span className="text-zinc-600">Reimagined for Productivity.</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop losing track of what you copy. iMemo stores your history, enables instant previews, and puts your most important clips just a hotkey away.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/download" 
              className="w-full sm:w-auto text-sm font-medium text-zinc-950 bg-zinc-50 hover:bg-zinc-200 transition-all px-8 py-3 rounded-full text-center flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Download Now
            </Link>
            <Link 
              href="#features" 
              className="w-full sm:w-auto text-sm font-medium text-zinc-300 hover:text-zinc-50 transition-colors px-8 py-3 rounded-full text-center flex items-center justify-center gap-2"
            >
              Explore Features <Icon icon="solar:arrow-right-linear" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features (Bento Grid Structure) */}
      <section id="features" className="border-white/5 border-t pt-24 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24">
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-zinc-50 mb-4">
              Built for speed.<br />Designed for precision.
            </h2>
            <p className="text-sm md:text-base text-zinc-400 max-w-xl">
              Everything you need to manage your clipboard history without breaking your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
            {/* Bento Item 1 (Wide) */}
            <div className="col-span-1 md:col-span-2 p-8 rounded-3xl border border-white/5 bg-zinc-900/20 relative overflow-hidden group hover:bg-zinc-900/40 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity text-sky-500">
                <History size={64} />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end pt-12">
                <h3 className="text-xl font-medium tracking-tight text-zinc-50 mb-3">Persistent History</h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                  Stores up to 100 clipboard items, including text and images, so you never lose that important snippet again.
                </p>
              </div>
            </div>
            
            {/* Bento Item 2 */}
            <div className="col-span-1 p-8 rounded-3xl border border-white/5 bg-zinc-900/20 group hover:bg-zinc-900/40 transition-colors">
              <Zap className="text-2xl text-zinc-500 mb-6" />
              <h3 className="text-lg font-medium tracking-tight text-zinc-50 mb-2">Instant Paste</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Paste directly into any application the moment you select an item from your history.
              </p>
            </div>

            {/* Bento Item 3 */}
            <div className="col-span-1 p-8 rounded-3xl border border-white/5 bg-zinc-900/20 group hover:bg-zinc-900/40 transition-colors">
              <Keyboard className="text-2xl text-zinc-500 mb-6" />
              <h3 className="text-lg font-medium tracking-tight text-zinc-50 mb-2">Global Hotkeys</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Toggle your clipboard history from anywhere with a customizable global shortcut.
              </p>
            </div>

            {/* Bento Item 4 (Wide) */}
            <div className="col-span-1 md:col-span-2 p-8 rounded-3xl border border-white/5 bg-zinc-900/20 relative overflow-hidden group hover:bg-zinc-900/40 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity text-sky-500">
                <Search size={64} />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end pt-12">
                <h3 className="text-xl font-medium tracking-tight text-zinc-50 mb-3">Lightning Fast Search</h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                  Find exactly what you&apos;re looking for with instantaneous search across all your saved clips.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience (Sticky Scroll Structure) */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Sticky Left Column */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-zinc-50 mb-6">
                Designed for Focus.
              </h2>
              <p className="text-sm md:text-base text-zinc-400 mb-8 leading-relaxed">
                iMemo stays out of your way until you need it. The minimalist interface and smooth transitions keep your focus where it belongs—on your work.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <Star size={16} className="text-sky-500" /> Star important items
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <ImageIcon size={16} className="text-sky-500" /> Native image support
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <Shield size={16} className="text-sky-500" /> Secure local storage
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Right Column */}
          <div className="lg:w-2/3 space-y-8">
            <div className="p-8 md:p-10 rounded-3xl border border-white/5 bg-zinc-900/10 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 border border-white/10 text-zinc-50 font-medium text-sm">01</div>
              <div>
                <h3 className="text-xl font-medium tracking-tight text-zinc-50 mb-3">Smart Capture</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Automatically detects text and image copies across all your applications. Everything is organized and timestamped for easy retrieval.
                </p>
              </div>
            </div>

            <div className="p-8 md:p-10 rounded-3xl border border-white/5 bg-zinc-900/10 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 border border-white/10 text-zinc-50 font-medium text-sm">02</div>
              <div>
                <h3 className="text-xl font-medium tracking-tight text-zinc-50 mb-3">Instant Preview</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Hover over any item to get a quick glimpse of its contents. Need a closer look? Open a persistent preview window for longer snippets.
                </p>
              </div>
            </div>

            <div className="p-8 md:p-10 rounded-3xl border border-sky-900/20 bg-sky-900/5 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center shrink-0 border border-sky-500/20 text-sky-400 font-medium text-sm">03</div>
              <div>
                <h3 className="text-xl font-medium tracking-tight text-zinc-50 mb-3">Universal Compatibility</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Available for Windows, macOS, and Linux. iMemo works where you work, ensuring a consistent experience across all your devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sky-900/10 -z-10"></div>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-zinc-50 mb-6">Boost your productivity today.</h2>
          <p className="text-base text-zinc-400 mb-10">Download iMemo Smart Clipboard and transform how you work with data.</p>
          
          <div className="flex justify-center">
            <Link 
              href="/download" 
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-950 bg-zinc-50 hover:bg-zinc-200 transition-all px-10 py-4 rounded-full text-center"
            >
              <Download size={18} />
              Download for Free
            </Link>
          </div>
          <p className="text-xs text-zinc-500 mt-6 font-medium tracking-widest">
            Lightweight • Fast • Open Source
          </p>
        </div>
      </section>

      <footer className="pt-24 pb-12 border-t border-white/5 bg-zinc-950 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="font-medium text-lg tracking-tighter text-zinc-50 flex items-center gap-3 mb-6">
                <Logo size={28} />
                iMemo
              </div>
              <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
                The ultimate companion for your desktop clipboard. Designed for developers, writers, and power users who value speed and privacy.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-bold text-zinc-100 tracking-widest mb-6">Product</h4>
              <ul className="space-y-4">
                <li><Link href="#features" className="text-sm text-zinc-500 hover:text-zinc-50 transition-colors">Features</Link></li>
                <li><Link href="/download" className="text-sm text-zinc-500 hover:text-zinc-50 transition-colors">Download</Link></li>
                <li><Link href="#" className="text-sm text-zinc-500 hover:text-zinc-50 transition-colors">Release Notes</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-zinc-100 tracking-widest mb-6">Connect</h4>
              <ul className="space-y-4">
                <li><Link href="https://github.com/lwshakib/imemo-smart-clipboard" className="text-sm text-zinc-500 hover:text-zinc-50 transition-colors flex items-center gap-2">
                  <Icon icon="lucide:github" width={14} /> GitHub
                </Link></li>
                <li><Link href="#" className="text-sm text-zinc-500 hover:text-zinc-50 transition-colors flex items-center gap-2">
                  <Icon icon="lucide:twitter" width={14} /> Twitter
                </Link></li>
                <li><Link href="#" className="text-sm text-zinc-500 hover:text-zinc-50 transition-colors flex items-center gap-2">
                  <Icon icon="lucide:mail" width={14} /> Support
                </Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-[11px] text-zinc-600 font-medium">
              © {new Date().getFullYear()} iMemo Smart Clipboard. All rights reserved.
            </div>
            <div className="flex items-center gap-8">
              <Link href="#" className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
