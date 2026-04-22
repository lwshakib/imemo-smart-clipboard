"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { ModeToggle } from "@/components/mode-toggle"
import { Download, ChevronLeft, Laptop, Monitor, Terminal } from "lucide-react"

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

  return (
    <div className="bg-zinc-950 min-h-screen font-light antialiased transition-colors duration-300 dark:bg-zinc-950 light:bg-zinc-50">
      {/* Minimalist Navigation */}
      <nav className="fixed top-0 w-full bg-zinc-950/70 backdrop-blur-xl z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-medium text-lg tracking-tighter text-zinc-50 uppercase flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-50 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-zinc-950 rounded-sm rotate-45" />
            </div>
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

      {/* Hero / Detection Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-medium text-zinc-50 tracking-tighter mb-6">
            Get iMemo Smart Clipboard
          </h1>
          <p className="text-zinc-400 mb-12 max-w-xl mx-auto leading-relaxed">
            The most powerful clipboard manager for your desktop. Lightweight, fast, and secure.
          </p>

          {/* Primary Download for Detected OS */}
          <div className="inline-block p-[1px] rounded-[2rem] bg-gradient-to-b from-sky-400 to-sky-600 shadow-[0_0_40px_-10px_rgba(56,189,248,0.5)]">
            <button className="bg-zinc-950 hover:bg-zinc-900 transition-colors px-10 py-6 rounded-[1.95rem] flex flex-col items-center gap-3">
              <div className="flex items-center gap-4">
                <Icon icon={getOSIcon(detectedOS)} className="text-4xl" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Download for</div>
                  <div className="text-2xl font-medium text-zinc-50">{getOSName(detectedOS)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sky-400 text-sm font-medium mt-2">
                <Download size={16} />
                Download v0.0.1
              </div>
            </button>
          </div>
          <p className="text-[10px] text-zinc-600 mt-6 uppercase tracking-tighter">
            Compatible with Windows 10+, macOS 11+, and major Linux distributions.
          </p>
        </div>
      </section>

      {/* Secondary Options Grid */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-medium text-zinc-50 mb-10 text-center">All Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Windows Card */}
            <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 flex flex-col items-center text-center group hover:bg-zinc-900/40 transition-all hover:border-sky-500/30">
              <Icon icon="logos:microsoft-windows-icon" className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all" />
              <h3 className="text-lg font-medium text-zinc-50 mb-2">Windows</h3>
              <p className="text-xs text-zinc-500 mb-8 leading-relaxed">
                Installer for Windows 10 and 11.<br />(x64 / ARM64)
              </p>
              <button className="mt-auto flex items-center gap-2 px-6 py-2 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium hover:bg-zinc-50 hover:text-zinc-950 transition-all">
                <Download size={14} />
                Download .exe
              </button>
            </div>

            {/* macOS Card */}
            <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 flex flex-col items-center text-center group hover:bg-zinc-900/40 transition-all hover:border-sky-500/30">
              <Icon icon="logos:apple" className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all" />
              <h3 className="text-lg font-medium text-zinc-50 mb-2">macOS</h3>
              <p className="text-xs text-zinc-500 mb-8 leading-relaxed">
                Apple Silicon (M1/M2/M3) and Intel.<br />Universal Binary
              </p>
              <button className="mt-auto flex items-center gap-2 px-6 py-2 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium hover:bg-zinc-50 hover:text-zinc-950 transition-all">
                <Download size={14} />
                Download .dmg
              </button>
            </div>

            {/* Linux Card */}
            <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 flex flex-col items-center text-center group hover:bg-zinc-900/40 transition-all hover:border-sky-500/30">
              <Icon icon="logos:linux-tux" className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all" />
              <h3 className="text-lg font-medium text-zinc-50 mb-2">Linux</h3>
              <p className="text-xs text-zinc-500 mb-8 leading-relaxed">
                AppImage, DEB, and RPM support.<br />(x64 / ARM64)
              </p>
              <div className="mt-auto flex flex-wrap justify-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium hover:bg-zinc-50 hover:text-zinc-950 transition-all">
                  .AppImage
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium hover:bg-zinc-50 hover:text-zinc-950 transition-all">
                  .deb
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 px-6 border-t border-white/5 bg-zinc-900/10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center gap-3">
            <Laptop className="text-sky-500" size={24} />
            <h4 className="text-sm font-medium text-zinc-50">Lightweight</h4>
            <p className="text-[10px] text-zinc-500">Less than 100MB disk space required.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <Monitor className="text-sky-500" size={24} />
            <h4 className="text-sm font-medium text-zinc-50">Cross-Platform</h4>
            <p className="text-[10px] text-zinc-500">Optimized for every operating system.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <Terminal className="text-sky-500" size={24} />
            <h4 className="text-sm font-medium text-zinc-50">Secure</h4>
            <p className="text-[10px] text-zinc-500">Your clipboard stays on your machine.</p>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-white/5 text-center bg-zinc-950">
        <div className="text-xs text-zinc-600">
          © {new Date().getFullYear()} iMemo. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
