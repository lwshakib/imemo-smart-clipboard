import React from 'react';

const HistoryView: React.FC = () => {
  const handleItemClick = () => {
    window.ipcRenderer.send('hide-window');
  };

  return (
    <div className="flex flex-col p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="space-y-3">
        {Array.from({ length: 15 }, (_, i) => i + 1).map((i) => (
          <div 
            key={i} 
            onClick={handleItemClick}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-all hover:bg-zinc-800/80 active:scale-[0.98]"
          >
            <p className="text-sm text-zinc-300 truncate">This is a sample clipboard content number {i}. It could be a long text or a small snippet.</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] text-zinc-500 font-medium">{i} mins ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
