import React from 'react';

const HistoryView: React.FC = () => {
  return (
    <div className="flex flex-col p-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="group relative overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-all hover:bg-zinc-800/80">
            <p className="text-sm text-zinc-300 truncate">This is a sample clipboard content number {i}. It could be a long text or a small snippet.</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] text-zinc-500 font-medium">2 mins ago</span>
              <button className="text-[10px] text-zinc-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Copy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
