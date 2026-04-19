import React, { useState, useEffect } from 'react';
import { Trash2, Star } from 'lucide-react';

interface ClipboardItem {
  id: string;
  content: string;
  timestamp: number;
  isStarred: boolean;
}

const HistoryView: React.FC = () => {
  const [items, setItems] = useState<ClipboardItem[]>([]);

  const fetchHistory = async () => {
    const history = await window.ipcRenderer.invoke('history:get');
    setItems(history);
  };

  useEffect(() => {
    fetchHistory();

    // Listen for real-time updates from main process
    const listener = (_event: any, updatedHistory: ClipboardItem[]) => {
      setItems(updatedHistory);
    };

    window.ipcRenderer.on('history:updated', listener);
    return () => {
      window.ipcRenderer.off('history:updated', listener);
    };
  }, []);

  const handleItemClick = (content: string) => {
    window.ipcRenderer.send('clipboard:paste-item', content);
  };

  const handleRemove = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = await window.ipcRenderer.invoke('history:remove', id);
    setItems(updated);
  };

  const handleToggleStar = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = await window.ipcRenderer.invoke('history:toggle-star', id);
    setItems(updated);
  };

  const formatTime = (timestamp: number) => {
    const diff = Math.floor((Date.now() - timestamp) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} mins ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} hours ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="flex flex-col p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10 text-center text-zinc-500">
            <p className="text-sm">History is empty</p>
            <p className="text-[10px] mt-1">Copied text will appear here</p>
          </div>
        ) : (
          items.map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleItemClick(item.content)}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-all hover:bg-zinc-800/80 active:scale-[0.98]"
            >
              <p className="text-sm text-zinc-300 truncate">{item.content}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-medium">{formatTime(item.timestamp)}</span>
                
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => handleToggleStar(e, item.id)}
                    className={`transition-colors ${item.isStarred ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    <Star size={14} fill={item.isStarred ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={(e) => handleRemove(e, item.id)}
                    className="text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryView;
