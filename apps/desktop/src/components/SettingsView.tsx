import React from 'react';
import { Settings as SettingsIcon, Shield, Keyboard, Zap } from 'lucide-react';

const SettingsView: React.FC = () => {
  return (
    <div className="flex flex-col p-4 animate-in fade-in slide-in-from-top-2 duration-500">
      <h2 className="text-xl font-semibold text-zinc-100 mb-6">Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-colors hover:bg-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-800 p-2 text-zinc-100">
              <Zap size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-200">Instant Paste</span>
              <span className="text-[10px] text-zinc-500">Paste immediately after selection</span>
            </div>
          </div>
          <div className="h-5 w-10 cursor-pointer rounded-full bg-zinc-700 relative transition-colors">
            <div className="absolute right-1 top-1 h-3 w-3 rounded-full bg-zinc-200 shadow-sm" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-colors hover:bg-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-800 p-2 text-zinc-100">
              <Keyboard size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-200">Hotkeys</span>
              <span className="text-[10px] text-zinc-500">Manage keyboard shortcuts</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-1 rounded">Alt + V</span>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-colors hover:bg-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-800 p-2 text-zinc-100">
              <Shield size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-200">Privacy</span>
              <span className="text-[10px] text-zinc-500">Exclude sensitive applications</span>
            </div>
          </div>
          <button className="text-[10px] text-zinc-400 font-semibold px-2 py-1 border border-zinc-700 rounded hover:bg-zinc-700">Manage</button>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5">
        <p className="text-[10px] text-center text-zinc-600">iMemo Smart Clipboard v0.0.1</p>
      </div>
    </div>
  );
};

export default SettingsView;
