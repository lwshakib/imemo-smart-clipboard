import React, { useState, useEffect, useCallback } from 'react';
import { Shield, Keyboard, Zap, Loader2, Bell, Rocket } from 'lucide-react';

interface AppSettings {
  instantPaste: boolean;
  globalHotkey: string;
  startOnStartup: boolean;
  showNotifications: boolean;
}

const SettingsView: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const s = await window.ipcRenderer.invoke('settings:get');
      setSettings(s);
    };
    fetchSettings();
  }, []);

  const updateSetting = useCallback(async <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    if (!settings) return;
    const newSettings = { ...settings, [key]: value };
    const saved = await window.ipcRenderer.invoke('settings:update', newSettings);
    setSettings(saved);
  }, [settings]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isRecording) return;
    e.preventDefault();
    e.stopPropagation();

    const modifiers = [];
    if (e.ctrlKey) modifiers.push('Ctrl');
    if (e.shiftKey) modifiers.push('Shift');
    if (e.altKey) modifiers.push('Alt');
    if (e.metaKey) modifiers.push('Cmd');

    // If it's just a modifier key, keep waiting
    if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) return;

    const key = e.key.toUpperCase();
    const shortcut = [...modifiers, key].join('+');
    
    updateSetting('globalHotkey', shortcut);
    setIsRecording(false);
  }, [isRecording, updateSetting]);

  useEffect(() => {
    if (isRecording) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRecording, handleKeyDown]);

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
      
      <div className="space-y-3">
        {/* Instant Paste */}
        <div 
          onClick={() => updateSetting('instantPaste', !settings.instantPaste)}
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

        {/* Start on Startup */}
        <div 
          onClick={() => updateSetting('startOnStartup', !settings.startOnStartup)}
          className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-all hover:bg-zinc-800/80 cursor-pointer group active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-800 p-2 text-zinc-100 group-hover:bg-zinc-700 transition-colors">
              <Rocket size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-200">Launch at Startup</span>
              <span className="text-[10px] text-zinc-500">Start iMemo when you log in</span>
            </div>
          </div>
          <div className={`h-5 w-10 rounded-full relative transition-colors ${settings.startOnStartup ? 'bg-zinc-100' : 'bg-zinc-700'}`}>
            <div className={`absolute top-1 h-3 w-3 rounded-full shadow-sm transition-all ${settings.startOnStartup ? 'right-1 bg-zinc-900' : 'left-1 bg-zinc-200'}`} />
          </div>
        </div>

        {/* Notifications */}
        <div 
          onClick={() => updateSetting('showNotifications', !settings.showNotifications)}
          className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-all hover:bg-zinc-800/80 cursor-pointer group active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-800 p-2 text-zinc-100 group-hover:bg-zinc-700 transition-colors">
              <Bell size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-200">Desktop Notifications</span>
              <span className="text-[10px] text-zinc-500">Show alert when new item is copied</span>
            </div>
          </div>
          <div className={`h-5 w-10 rounded-full relative transition-colors ${settings.showNotifications ? 'bg-zinc-100' : 'bg-zinc-700'}`}>
            <div className={`absolute top-1 h-3 w-3 rounded-full shadow-sm transition-all ${settings.showNotifications ? 'right-1 bg-zinc-900' : 'left-1 bg-zinc-200'}`} />
          </div>
        </div>

        {/* Hotkeys */}
        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-colors hover:bg-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-800 p-2 text-zinc-100">
              <Keyboard size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-200">Global Shortcut</span>
              <span className="text-[10px] text-zinc-500">Hotkey to toggle window</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono px-2 py-1 rounded transition-colors ${isRecording ? 'bg-zinc-100 text-zinc-900 animate-pulse' : 'bg-zinc-800 text-zinc-400'}`}>
              {isRecording ? 'Press keys...' : settings.globalHotkey}
            </span>
            <button 
              onClick={() => setIsRecording(!isRecording)}
              className="text-[10px] text-zinc-200 font-semibold px-2 py-1 border border-zinc-700 rounded hover:bg-zinc-700 transition-colors"
            >
              {isRecording ? 'Cancel' : 'Change'}
            </button>
          </div>
        </div>

        {/* Privacy */}
        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-colors hover:bg-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-800 p-2 text-zinc-100">
              <Shield size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-200">Privacy Mode</span>
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
