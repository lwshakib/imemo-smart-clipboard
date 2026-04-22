"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { ModeToggle } from "@/components/mode-toggle"
import { Logo } from "@/components/logo"
import { Download, ChevronLeft, Laptop, Monitor, Terminal } from "lucide-react"
import { DOWNLOAD_URLS } from "@/lib/constants"

type OS = "windows" | "macos" | "linux" | "unknown"

export default function DownloadPage() {
  const [detectedOS, setDetectedOS] = useState<OS>("unknown")

  useEffect(() => {
    const userAgent = window.navigator.userAgent
    if (userAgent.includes("Win")) setDetectedOS("windows")
    else if (userAgent.includes("Mac")) setDetectedOS("macos")
    else if (userAgent.includes("Linux")) setDetectedOS("linux")
  }, [])

  const getOSName = (os: OS) => {
    switch (os) {
      case "windows": return "Windows"
      case "macos": return "macOS"
      case "linux": return "Linux"
      default: return "your OS"
    }
  }

  const getOSIcon = (os: OS) => {
    switch (os) {
      case "windows": return "logos:microsoft-windows-icon"
      case "macos": return "logos:apple"
      case "linux": return "logos:linux-tux"
      default: return "solar:laptop-linear"
    }
  }

  const getDownloadUrl = (os: OS) => {
    switch (os) {
      case "windows": return DOWNLOAD_URLS.WINDOWS
      case "macos": return DOWNLOAD_URLS.MAC
      case "linux": return DOWNLOAD_URLS.LINUX
      default: return "#"
    }
  }

  return (
    <div className="bg-zinc-950 min-h-screen font-light antialiased transition-colors duration-300 dark:bg-zinc-950 light:bg-zinc-50">
      {/* Minimalist Navigation */}
      <nav className="fixed top-0 w-full bg-zinc-950/70 backdrop-blur-xl z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-medium text-lg tracking-tighter text-zinc-50 flex items-center gap-3">
            <Logo size={28} />
            iMemo
          </Link>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link 
              href="/" 
              className="text-xs font-medium text-zinc-400 hover:text-zinc-50 transition-colors flex items-center gap-1"
            >
              <ChevronLeft size={14} />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero / Detection Section (Minimalist Redesign) */}
      <section className="pt-48 pb-24 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-8 shadow-2xl">
            <Logo size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-zinc-50 tracking-tighter mb-4">
            Ready to boost your productivity?
          </h1>
          <p className="text-zinc-500 mb-10 max-w-lg mx-auto text-sm leading-relaxed">
            Download iMemo for {getOSName(detectedOS)} and experience the ultimate clipboard manager. Lightweight, open-source, and privacy-focused.
          </p>

          {/* Minimalist Download Button */}
          <a 
            href={getDownloadUrl(detectedOS)}
            className="group relative flex items-center gap-3 bg-zinc-50 hover:bg-zinc-200 text-zinc-950 px-8 py-4 rounded-full transition-all duration-300 transform active:scale-95 cursor-pointer"
          >
            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] font-bold tracking-wider opacity-60 mb-1">Download for</span>
              <span className="text-sm font-semibold">{getOSName(detectedOS)}</span>
            </div>
          </a>
          
          <div className="mt-8 flex items-center gap-6 text-[10px] tracking-widest text-zinc-600 font-bold">
            <span>v0.1.0</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span>Open Source</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span>Free Forever</span>
          </div>
        </div>
      </section>

      {/* Secondary Options Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-2xl font-medium text-zinc-50 tracking-tight mb-3">Other Platforms</h2>
            <p className="text-zinc-500 text-sm">Download iMemo for your other devices</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            
            {/* Windows Card */}
            <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/10 flex flex-col items-center text-center group hover:bg-zinc-900/30 transition-all hover:border-white/10">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon icon="logos:microsoft-windows-icon" className="text-xl" />
              </div>
              <h3 className="text-lg font-medium text-zinc-50 mb-2 tracking-tight">Windows</h3>
              <p className="text-[11px] text-zinc-500 mb-8 leading-relaxed px-4">
                Full support for Windows 10 & 11.<br />Installer available for x64.
              </p>
              <a 
                href={DOWNLOAD_URLS.WINDOWS}
                className="mt-auto w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 text-xs font-medium hover:bg-zinc-50 hover:text-zinc-950 transition-all"
              >
                <Download size={14} />
                Download for Windows
              </a>
            </div>

            {/* macOS Card */}
            <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/10 flex flex-col items-center text-center group hover:bg-zinc-900/30 transition-all hover:border-white/10">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon icon="logos:apple" className="text-xl" />
              </div>
              <h3 className="text-lg font-medium text-zinc-50 mb-2 tracking-tight">macOS</h3>
              <p className="text-[11px] text-zinc-500 mb-8 leading-relaxed px-4">
                Optimized for Apple Silicon.<br />Works on Intel-based Macs.
              </p>
              <a 
                href={DOWNLOAD_URLS.MAC}
                className="mt-auto w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 text-xs font-medium hover:bg-zinc-50 hover:text-zinc-950 transition-all"
              >
                <Download size={14} />
                Download for macOS
              </a>
            </div>

            {/* Linux Card */}
            <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/10 flex flex-col items-center text-center group hover:bg-zinc-900/30 transition-all hover:border-white/10">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon icon="logos:linux-tux" className="text-xl" />
              </div>
              <h3 className="text-lg font-medium text-zinc-50 mb-2 tracking-tight">Linux</h3>
              <p className="text-[11px] text-zinc-500 mb-8 leading-relaxed px-4">
                Universal AppImage support.<br />Debian and RPM packages.
              </p>
              <div className="mt-auto w-full flex flex-col gap-2">
                <a 
                  href={DOWNLOAD_URLS.LINUX}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 text-xs font-medium hover:bg-zinc-50 hover:text-zinc-950 transition-all"
                >
                  <Download size={14} />
                  Download for Linux
                </a>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 rounded-lg bg-zinc-950 border border-white/5 text-[9px] text-zinc-600 hover:text-zinc-400 transition-colors font-bold tracking-tighter">.deb</button>
                  <button className="flex-1 py-1.5 rounded-lg bg-zinc-950 border border-white/5 text-[9px] text-zinc-600 hover:text-zinc-400 transition-colors font-bold tracking-tighter">.rpm</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-24 px-6 bg-zinc-900/10 border-t border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500">
              <Laptop size={20} />
            </div>
            <h4 className="text-sm font-medium text-zinc-50 tracking-tight">Extremely Light</h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">Built with performance in mind. Low memory footprint and instant startup.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500">
              <Monitor size={20} />
            </div>
            <h4 className="text-sm font-medium text-zinc-50 tracking-tight">Native Feel</h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">Designed to feel like a part of your OS. Smooth animations and transitions.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500">
              <Terminal size={20} />
            </div>
            <h4 className="text-sm font-medium text-zinc-50 tracking-tight">Privacy First</h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed">Everything stays on your device. No cloud sync, no tracking, no data leaks.</p>
          </div>
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
                <li><Link href="/#features" className="text-sm text-zinc-500 hover:text-zinc-50 transition-colors">Features</Link></li>
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
