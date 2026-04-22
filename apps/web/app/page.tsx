"use client"

import Link from "next/link"
import { Icon } from "@iconify/react"
import { ModeToggle } from "@/components/mode-toggle"
import { Logo } from "@/components/logo"
import {
  Download,
  Zap,
  History,
  Keyboard,
  Shield,
  Star,
  Image as ImageIcon,
  Search,
} from "lucide-react"

export default function Page() {
  return (
    <div className="bg-zinc-50 font-light antialiased transition-colors duration-300 dark:bg-zinc-950">
      {/* Minimalist Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-zinc-50/70 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/70">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3 text-lg font-medium tracking-tighter text-zinc-900 dark:text-zinc-50">
            <Logo size={28} />
            iMemo
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link
              href="/download"
              className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              <Download size={12} />
              Download
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden px-6 pt-32 pb-20 md:pt-48 md:pb-32"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.08) 0%, transparent 70%)",
        }}
      >
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs text-sky-600 dark:border-sky-900/30 dark:bg-sky-900/10 dark:text-sky-300">
            <Icon
              icon="solar:star-fall-minimalistic-linear"
              className="text-sm text-sky-500 dark:text-sky-400"
            />
            The Ultimate Clipboard Companion
          </div>
          <h1 className="mx-auto mb-8 max-w-4xl text-4xl leading-tight font-medium tracking-tighter text-zinc-900 md:text-6xl lg:text-7xl dark:text-zinc-50">
            Your Clipboard,{" "}
            <span className="text-zinc-400 dark:text-zinc-600">
              Reimagined for Productivity.
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg dark:text-zinc-400">
            Stop losing track of what you copy. iMemo stores your history,
            enables instant previews, and puts your most important clips just a
            hotkey away.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/download"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 py-3 text-center text-sm font-medium text-zinc-50 transition-all hover:bg-zinc-800 sm:w-auto dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              <Download size={16} />
              Download Now
            </Link>
            <Link
              href="#features"
              className="flex w-full items-center justify-center gap-2 rounded-full px-8 py-3 text-center text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 sm:w-auto dark:text-zinc-300 dark:hover:text-zinc-50"
            >
              Explore Features <Icon icon="solar:arrow-right-linear" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features (Bento Grid Structure) */}
      <section
        id="features"
        className="border-t border-white/5 px-6 pt-24 pb-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:mb-24">
            <h2 className="mb-4 text-2xl font-medium tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-50">
              Built for speed.
              <br />
              Designed for precision.
            </h2>
            <p className="max-w-xl text-sm text-zinc-600 md:text-base dark:text-zinc-400">
              Everything you need to manage your clipboard history without
              breaking your workflow.
            </p>
          </div>

          <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3">
            {/* Bento Item 1 (Wide) */}
            <div className="group relative col-span-1 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100/50 p-8 transition-colors hover:bg-zinc-200/50 md:col-span-2 dark:border-white/5 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/40">
              <div className="absolute top-0 right-0 p-8 text-sky-500 opacity-20 transition-opacity group-hover:opacity-40">
                <History size={64} />
              </div>
              <div className="relative z-10 flex h-full flex-col justify-end pt-12">
                <h3 className="mb-3 text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                  Persistent History
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Stores up to 100 clipboard items, including text and images,
                  so you never lose that important snippet again.
                </p>
              </div>
            </div>

            {/* Bento Item 2 */}
            <div className="group col-span-1 rounded-3xl border border-zinc-200 bg-zinc-100/50 p-8 transition-colors hover:bg-zinc-200/50 dark:border-white/5 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/40">
              <Zap className="mb-6 text-2xl text-zinc-500" />
              <h3 className="mb-2 text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                Instant Paste
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Paste directly into any application the moment you select an
                item from your history.
              </p>
            </div>

            {/* Bento Item 3 */}
            <div className="group col-span-1 rounded-3xl border border-zinc-200 bg-zinc-100/50 p-8 transition-colors hover:bg-zinc-200/50 dark:border-white/5 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/40">
              <Keyboard className="mb-6 text-2xl text-zinc-500" />
              <h3 className="mb-2 text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                Global Hotkeys
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Toggle your clipboard history from anywhere with a customizable
                global shortcut.
              </p>
            </div>

            {/* Bento Item 4 (Wide) */}
            <div className="group relative col-span-1 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100/50 p-8 transition-colors hover:bg-zinc-200/50 md:col-span-2 dark:border-white/5 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/40">
              <div className="absolute top-0 right-0 p-8 text-sky-500 opacity-20 transition-opacity group-hover:opacity-40">
                <Search size={64} />
              </div>
              <div className="relative z-10 flex h-full flex-col justify-end pt-12">
                <h3 className="mb-3 text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                  Lightning Fast Search
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Find exactly what you&apos;re looking for with instantaneous
                  search across all your saved clips.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience (Sticky Scroll Structure) */}
      <section className="border-t border-white/5 px-6 py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row lg:gap-24">
          {/* Sticky Left Column */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <h2 className="mb-6 text-2xl font-medium tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-50">
                Designed for Focus.
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-zinc-600 md:text-base dark:text-zinc-400">
                iMemo stays out of your way until you need it. The minimalist
                interface and smooth transitions keep your focus where it
                belongs—on your work.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                  <Star size={16} className="text-sky-500" /> Star important
                  items
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                  <ImageIcon size={16} className="text-sky-500" /> Native image
                  support
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                  <Shield size={16} className="text-sky-500" /> Secure local
                  storage
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Right Column */}
          <div className="space-y-8 lg:w-2/3">
            <div className="flex flex-col items-start gap-8 rounded-3xl border border-zinc-200 bg-zinc-100/50 p-8 md:flex-row md:p-10 dark:border-white/5 dark:bg-zinc-900/10">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-zinc-200 text-sm font-medium text-zinc-900 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-50">
                01
              </div>
              <div>
                <h3 className="mb-3 text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                  Smart Capture
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Automatically detects text and image copies across all your
                  applications. Everything is organized and timestamped for easy
                  retrieval.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-8 rounded-3xl border border-zinc-200 bg-zinc-100/50 p-8 md:flex-row md:p-10 dark:border-white/5 dark:bg-zinc-900/10">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-zinc-200 text-sm font-medium text-zinc-900 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-50">
                02
              </div>
              <div>
                <h3 className="mb-3 text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                  Instant Preview
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Hover over any item to get a quick glimpse of its contents.
                  Need a closer look? Open a persistent preview window for
                  longer snippets.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-8 rounded-3xl border border-sky-200/50 bg-sky-50 p-8 md:flex-row md:p-10 dark:border-sky-900/20 dark:bg-sky-900/5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-sky-500/20 bg-sky-500/10 text-sm font-medium text-sky-600 dark:text-sky-400">
                03
              </div>
              <div>
                <h3 className="mb-3 text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">
                  Universal Compatibility
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Available for Windows, macOS, and Linux. iMemo works where you
                  work, ensuring a consistent experience across all your
                  devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-zinc-200 px-6 py-24 dark:border-white/5">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-sky-500/5 dark:to-sky-900/10"></div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-4xl font-medium tracking-tighter text-zinc-900 md:text-5xl dark:text-zinc-50">
            Boost your productivity today.
          </h2>
          <p className="mb-10 text-base text-zinc-600 dark:text-zinc-400">
            Download iMemo Smart Clipboard and transform how you work with data.
          </p>

          <div className="flex justify-center">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-10 py-4 text-center text-sm font-medium text-zinc-50 transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              <Download size={18} />
              Download for Free
            </Link>
          </div>
          <p className="mt-6 text-xs font-medium tracking-widest text-zinc-500">
            Lightweight • Fast • Open Source
          </p>
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
                    href="#features"
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

          <div className="flex flex-col items-center justify-between gap-6 border-t border-zinc-200 pt-12 md:flex-row dark:border-white/5">
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
