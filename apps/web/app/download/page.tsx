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
      case "windows":
        return "Windows"
      case "macos":
        return "macOS"
      case "linux":
        return "Linux"
      default:
        return "your OS"
    }
  }

  const getOSIcon = (os: OS) => {
    switch (os) {
      case "windows":
        return "logos:microsoft-windows-icon"
      case "macos":
        return "logos:apple"
      case "linux":
        return "logos:linux-tux"
      default:
        return "solar:laptop-linear"
    }
  }

  const getDownloadUrl = (os: OS) => {
    switch (os) {
      case "windows":
        return DOWNLOAD_URLS.WINDOWS
      case "macos":
        return DOWNLOAD_URLS.MAC
      case "linux":
        return DOWNLOAD_URLS.LINUX
      default:
        return "#"
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-light antialiased transition-colors duration-300 dark:bg-zinc-950">
      {/* Minimalist Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-zinc-50/70 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/70">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-3 text-lg font-medium tracking-tighter text-zinc-900 dark:text-zinc-50"
          >
            <Logo size={28} />
            iMemo
          </Link>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link
              href="/"
              className="flex items-center gap-1 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-50"
            >
              <ChevronLeft size={14} />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero / Detection Section (Minimalist Redesign) */}
      <section className="border-b border-white/5 px-6 pt-48 pb-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100 shadow-2xl dark:border-white/10 dark:bg-zinc-900">
            <Logo size={40} />
          </div>
          <h1 className="mb-4 text-4xl font-medium tracking-tighter text-zinc-900 md:text-5xl dark:text-zinc-50">
            Ready to boost your productivity?
          </h1>
          <p className="mx-auto mb-10 max-w-lg text-sm leading-relaxed text-zinc-500">
            Download iMemo for {getOSName(detectedOS)} and experience the
            ultimate clipboard manager. Lightweight, open-source, and
            privacy-focused.
          </p>

          {/* Minimalist Download Button */}
          <a
            href={getDownloadUrl(detectedOS)}
            className="group relative flex transform cursor-pointer items-center gap-3 rounded-full bg-zinc-900 px-8 py-4 text-zinc-50 transition-all duration-300 hover:bg-zinc-800 active:scale-95 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            <Download
              size={18}
              className="transition-transform group-hover:translate-y-0.5"
            />
            <div className="flex flex-col items-start leading-none">
              <span className="mb-1 text-[10px] font-bold tracking-wider opacity-60">
                Download for
              </span>
              <span className="text-sm font-semibold">
                {getOSName(detectedOS)}
              </span>
            </div>
          </a>

          <div className="mt-8 flex items-center gap-6 text-[10px] font-bold tracking-widest text-zinc-600">
            <span>v0.1.0</span>
            <span className="h-1 w-1 rounded-full bg-zinc-800" />
            <span>Open Source</span>
            <span className="h-1 w-1 rounded-full bg-zinc-800" />
            <span>Free Forever</span>
          </div>
        </div>
      </section>

      {/* Secondary Options Grid */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="mb-3 text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
              Other Platforms
            </h2>
            <p className="text-sm text-zinc-500">
              Download iMemo for your other devices
            </p>
          </div>

          <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-3">
            {/* Windows Card */}
            <div className="group flex flex-col items-center rounded-3xl border border-zinc-200 bg-zinc-100/50 p-8 text-center transition-all hover:border-zinc-300 hover:bg-zinc-200/50 dark:border-white/5 dark:bg-zinc-900/10 dark:hover:border-white/10 dark:hover:bg-zinc-900/30">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-300 bg-zinc-200 transition-transform group-hover:scale-110 dark:border-white/5 dark:bg-zinc-900">
                <Icon icon="logos:microsoft-windows-icon" className="text-xl" />
              </div>
              <h3 className="mb-2 text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                Windows
              </h3>
              <p className="mb-8 px-4 text-[11px] leading-relaxed text-zinc-500">
                Full support for Windows 10 & 11.
                <br />
                Installer available for x64.
              </p>
              <a
                href={DOWNLOAD_URLS.WINDOWS}
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-zinc-200 px-6 py-3 text-xs font-medium text-zinc-600 transition-all hover:bg-zinc-900 hover:text-zinc-50 dark:border-white/5 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-50 dark:hover:text-zinc-950"
              >
                <Download size={14} />
                Download for Windows
              </a>
            </div>

            {/* macOS Card */}
            <div className="group flex flex-col items-center rounded-3xl border border-zinc-200 bg-zinc-100/50 p-8 text-center transition-all hover:border-zinc-300 hover:bg-zinc-200/50 dark:border-white/5 dark:bg-zinc-900/10 dark:hover:border-white/10 dark:hover:bg-zinc-900/30">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-300 bg-zinc-200 transition-transform group-hover:scale-110 dark:border-white/5 dark:bg-zinc-900">
                <Icon icon="logos:apple" className="text-xl" />
              </div>
              <h3 className="mb-2 text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                macOS
              </h3>
              <p className="mb-8 px-4 text-[11px] leading-relaxed text-zinc-500">
                Optimized for Apple Silicon.
                <br />
                Works on Intel-based Macs.
              </p>
              <a
                href={DOWNLOAD_URLS.MAC}
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-zinc-200 px-6 py-3 text-xs font-medium text-zinc-600 transition-all hover:bg-zinc-900 hover:text-zinc-50 dark:border-white/5 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-50 dark:hover:text-zinc-950"
              >
                <Download size={14} />
                Download for macOS
              </a>
            </div>

            {/* Linux Card */}
            <div className="group flex flex-col items-center rounded-3xl border border-zinc-200 bg-zinc-100/50 p-8 text-center transition-all hover:border-zinc-300 hover:bg-zinc-200/50 dark:border-white/5 dark:bg-zinc-900/10 dark:hover:border-white/10 dark:hover:bg-zinc-900/30">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-300 bg-zinc-200 transition-transform group-hover:scale-110 dark:border-white/5 dark:bg-zinc-900">
                <Icon icon="logos:linux-tux" className="text-xl" />
              </div>
              <h3 className="mb-2 text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                Linux
              </h3>
              <p className="mb-8 px-4 text-[11px] leading-relaxed text-zinc-500">
                Universal AppImage support.
                <br />
                Debian and RPM packages.
              </p>
              <div className="mt-auto flex w-full flex-col gap-2">
                <a
                  href={DOWNLOAD_URLS.LINUX}
                  className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-zinc-200 px-6 py-3 text-xs font-medium text-zinc-600 transition-all hover:bg-zinc-900 hover:text-zinc-50 dark:border-white/5 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-50 dark:hover:text-zinc-950"
                >
                  <Download size={14} />
                  Download for Linux
                </a>
                <div className="flex gap-2">
                  <button className="flex-1 rounded-lg border border-zinc-300 bg-zinc-200 py-1.5 text-[9px] font-bold tracking-tighter text-zinc-500 transition-colors hover:text-zinc-900 dark:border-white/5 dark:bg-zinc-950 dark:text-zinc-600 dark:hover:text-zinc-400">
                    .deb
                  </button>
                  <button className="flex-1 rounded-lg border border-zinc-300 bg-zinc-200 py-1.5 text-[9px] font-bold tracking-tighter text-zinc-500 transition-colors hover:text-zinc-900 dark:border-white/5 dark:bg-zinc-950 dark:text-zinc-600 dark:hover:text-zinc-400">
                    .rpm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="border-t border-zinc-200 bg-zinc-100/30 px-6 py-24 dark:border-white/5 dark:bg-zinc-900/10">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-16 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-500">
              <Laptop size={20} />
            </div>
            <h4 className="text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
              Extremely Light
            </h4>
            <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-500">
              Built with performance in mind. Low memory footprint and instant
              startup.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-500">
              <Monitor size={20} />
            </div>
            <h4 className="text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
              Native Feel
            </h4>
            <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-500">
              Designed to feel like a part of your OS. Smooth animations and
              transitions.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-500">
              <Terminal size={20} />
            </div>
            <h4 className="text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
              Privacy First
            </h4>
            <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-500">
              Everything stays on your device. No cloud sync, no tracking, no
              data leaks.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-zinc-50 px-6 pt-24 pb-12 dark:border-white/5 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 grid grid-cols-2 gap-12 md:grid-cols-4">
            <div className="col-span-2">
              <div className="mb-6 flex items-center gap-3 text-lg font-medium tracking-tighter text-zinc-900 dark:text-zinc-50">
                <Logo size={28} />
                iMemo
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
                The ultimate companion for your desktop clipboard. Designed for
                developers, writers, and power users who value speed and
                privacy.
              </p>
            </div>

            <div>
              <h4 className="mb-6 text-xs font-bold tracking-widest text-zinc-900 dark:text-zinc-100">
                Product
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/#features"
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-50"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/download"
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-50"
                  >
                    Download
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-50"
                  >
                    Release Notes
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-xs font-bold tracking-widest text-zinc-900 dark:text-zinc-100">
                Connect
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="https://github.com/lwshakib/imemo-smart-clipboard"
                    className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-50"
                  >
                    <Icon icon="lucide:github" width={14} /> GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-50"
                  >
                    <Icon icon="lucide:twitter" width={14} /> Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-50"
                  >
                    <Icon icon="lucide:mail" width={14} /> Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-12 md:flex-row">
            <div className="text-[11px] font-medium text-zinc-600">
              © {new Date().getFullYear()} iMemo Smart Clipboard. All rights
              reserved.
            </div>
            <div className="flex items-center gap-8">
              <Link
                href="#"
                className="text-[11px] text-zinc-600 transition-colors hover:text-zinc-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-[11px] text-zinc-600 transition-colors hover:text-zinc-400"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
