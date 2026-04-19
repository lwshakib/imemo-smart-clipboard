import React, { useState } from 'react';
import { Search as SearchIcon, Trash2, Star } from 'lucide-react';

interface ClipboardItem {
  id: string;
  content: string;
  timestamp: number;
  isStarred: boolean;
}

const SearchView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ClipboardItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    const searchResults = await window.ipcRenderer.invoke('history:search', query);
    setResults(searchResults);
    setHasSearched(true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleItemClick = (content: string) => {
    window.ipcRenderer.send('clipboard:paste-item', content);
  };

  const handleRemove = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = await window.ipcRenderer.invoke('history:remove', id);
    setResults(results.filter(item => item.id !== id));
  };

  const handleToggleStar = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = await window.ipcRenderer.invoke('history:toggle-star', id);
    setResults(results.map(item => 
      item.id === id ? { ...item, isStarred: !item.isStarred } : item
    ));
  };

  const formatTime = (timestamp: number) => {
    const diff = Math.floor((Date.now() - timestamp) / 60000);
    if (diff < 1) return 'Just now';
    return `${diff} mins ago`;
  };

  return (
    <div className="flex flex-col p-4 animate-in fade-in duration-500">
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type and press Enter to search..." 
          className="w-full rounded-xl border border-white/10 bg-zinc-900/50 py-3 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500/50 focus:outline-none focus:ring-1 focus:ring-zinc-500/50"
        />
      </div>

      <div className="space-y-3">
        {hasSearched && results.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-10 text-center">
            <p className="text-sm text-zinc-500">No matches found for "{query}"</p>
          </div>
        ) : (
          results.map((item) => (
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
        
        {!hasSearched && (
          <div className="flex flex-col items-center justify-center pt-10 text-center">
            <p className="text-sm text-zinc-500">Search through your local clipboard history.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;
