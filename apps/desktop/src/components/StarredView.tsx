import React, { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';

interface ClipboardItem {
  id: string;
  content: string;
  timestamp: number;
  isStarred: boolean;
}

const StarredView: React.FC = () => {
  const [items, setItems] = useState<ClipboardItem[]>([]);

  const fetchStarred = async () => {
    const history = await window.ipcRenderer.invoke('history:get');
    setItems(history.filter((item: ClipboardItem) => item.isStarred));
  };

  useEffect(() => {
    fetchStarred();
    
    // Refresh if history changes (e.g., something was unstarred in another view)
    const listener = (_event: any, updatedHistory: ClipboardItem[]) => {
      setItems(updatedHistory.filter(item => item.isStarred));
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
    setItems(updated.filter((item: ClipboardItem) => item.isStarred));
  };

  const handleToggleStar = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = await window.ipcRenderer.invoke('history:toggle-star', id);
    setItems(updated.filter((item: ClipboardItem) => item.isStarred));
  };

  const formatTime = (timestamp: number) => {
    const diff = Math.floor((Date.now() - timestamp) / 60000);
    if (diff < 1) return 'Just now';
    return `${diff} mins ago`;
  };

  return (
    <div className="flex flex-col p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 h-[400px] text-center">
          <div className="rounded-full bg-zinc-800 p-4 mb-4">
            <Star size={32} className="text-zinc-600" />
          </div>
          <h2 className="text-xl font-semibold text-zinc-100 mb-2 border-none">No Favorites Yet</h2>
          <p className="text-xs text-zinc-500 max-w-[200px]">
            Star important clipboard items to quickly access them here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
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
                    className="text-zinc-100 transition-colors"
                  >
                    <Star size={14} fill="currentColor" />
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
          ))}
        </div>
      )}
    </div>
  );
};

export default StarredView;
