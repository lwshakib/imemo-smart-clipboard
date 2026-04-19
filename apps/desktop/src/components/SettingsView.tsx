import React, { useState, useEffect } from 'react';
import { Shield, Keyboard, Zap, Loader2 } from 'lucide-react';

const SettingsView: React.FC = () => {
  const [settings, setSettings] = useState<{ instantPaste: boolean; globalHotkey: string } | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const s = await window.ipcRenderer.invoke('settings:get');
      setSettings(s || { instantPaste: false, globalHotkey: 'Alt+V' });
    };
    fetchSettings();
  }, []);

  const toggleInstantPaste = async () => {
    if (!settings) return;
    const newSettings = { ...settings, instantPaste: !settings.instantPaste };
    const saved = await window.ipcRenderer.invoke('settings:update', newSettings);
    setSettings(saved);
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="animate-spin text-zinc-500" size={32} />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 animate-in fade-in slide-in-from-top-2 duration-500">
      <h2 className="text-xl font-semibold text-zinc-100 mb-6 border-none">Settings</h2>
      
      <div className="space-y-4">
        <div 
          onClick={toggleInstantPaste}
          className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-all hover:bg-zinc-800/80 cursor-pointer group active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-800 p-2 text-zinc-100 group-hover:bg-zinc-700 transition-colors">
              <Zap size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-200">Instant Paste</span>
              <span className="text-[10px] text-zinc-500">Paste immediately after selection</span>
            </div>
          </div>
          <div className={`h-5 w-10 rounded-full relative transition-colors ${settings.instantPaste ? 'bg-zinc-100' : 'bg-zinc-700'}`}>
            <div className={`absolute top-1 h-3 w-3 rounded-full shadow-sm transition-all ${settings.instantPaste ? 'right-1 bg-zinc-900' : 'left-1 bg-zinc-200'}`} />
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
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-1 rounded">{settings.globalHotkey}</span>
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
