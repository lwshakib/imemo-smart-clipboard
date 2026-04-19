import React, { useState } from 'react';
import { Trash2, Star, StarOff } from 'lucide-react';

interface HistoryItem {
  id: number;
  content: string;
  time: string;
  isStarred: boolean;
}

const HistoryView: React.FC = () => {
  const [items, setItems] = useState<HistoryItem[]>(
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      content: `This is a sample clipboard content number ${i + 1}. It could be a long text or a small snippet.`,
      time: `${i + 1} mins ago`,
      isStarred: false,
    }))
  );

  const handleItemClick = () => {
    window.ipcRenderer.send('hide-window');
  };

  const handleRemove = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setItems(items.filter(item => item.id !== id));
  };

  const handleToggleStar = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setItems(items.map(item => 
      item.id === id ? { ...item, isStarred: !item.isStarred } : item
    ));
  };

  return (
    <div className="flex flex-col p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id} 
            onClick={handleItemClick}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-all hover:bg-zinc-800/80 active:scale-[0.98]"
          >
            <p className="text-sm text-zinc-300 truncate">{item.content}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] text-zinc-500 font-medium">{item.time}</span>
              
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
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
