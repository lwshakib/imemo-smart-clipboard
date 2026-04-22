import React, { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';

const Preview: React.FC = () => {
  const [content, setContent] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Get ID from URL
    const params = new URLSearchParams(window.location.search);
    const windowId = params.get('id');
    const isManualParam = params.get('isManual') === 'true';
    setId(windowId);

    const listener = (_event: any, payload: { id: string, content: string }) => {
      // Only update if the ID matches or if it's the hover window (no ID check needed for hover)
      if (!windowId || payload.id === windowId) {
        setContent(payload.content);
        setCopied(false);
      }
    };

    window.ipcRenderer.on('preview:content', listener);
    return () => {
      window.ipcRenderer.off('preview:content', listener);
    };
  }, []);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    const params = new URLSearchParams(window.location.search);
    const windowId = params.get('id');
    const isManual = params.get('isManual') === 'true';
    window.ipcRenderer.send('preview:hide', { id: windowId, isManual });
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-zinc-900/98 shadow-2xl backdrop-blur-xl text-white border border-white/10">
      {/* Draggable Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 cursor-move drag">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Preview</span>
        <div className="flex items-center gap-2 no-drag">
          <button 
            onClick={handleCopy}
            className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-md transition-all disabled:opacity-30"
            title="Copy content"
            disabled={!content}
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          </button>
          <button 
            onClick={handleClose}
            className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-all"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 pb-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent select-text no-drag">
        {content === null ? (
          <div className="flex items-center justify-center h-full text-zinc-600 text-xs animate-pulse">
            Loading preview...
          </div>
        ) : content === '' ? (
          <div className="flex items-center justify-center h-full text-zinc-600 text-xs italic">
            No content to display
          </div>
        ) : (
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-300 selection:bg-sky-500/30">
            {content}
          </p>
        )}
      </div>
    </div>
  );
};

export default Preview;
