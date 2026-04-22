import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search as SearchIcon, Trash2, Star, Loader2 } from 'lucide-react';

interface ClipboardItem {
  id: string;
  content: string;
  type: 'text' | 'image';
  timestamp: number;
  isStarred: boolean;
}

const PAGE_SIZE = 20;

const SearchView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ClipboardItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchResults = useCallback(async (isInitial = false) => {
    if (isLoading || (!hasMore && !isInitial)) return;
    if (!query.trim()) return;

    setIsLoading(true);
    const offset = isInitial ? 0 : results.length;

    try {
      const result = await window.ipcRenderer.invoke('history:search', { query, offset, limit: PAGE_SIZE });
      
      if (isInitial) {
        setResults(result.items);
      } else {
        setResults(prev => [...prev, ...result.items]);
      }
      setHasMore(result.hasMore);
      setHasSearched(true);
    } catch (error) {
      console.error('Failed to search history:', error);
    } finally {
      setIsLoading(false);
    }
  }, [query, results.length, isLoading, hasMore]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setHasMore(true); // Reset hasMore for new search
      setResults([]);   // Clear old results
      fetchResults(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchResults();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchResults, hasMore, isLoading]);

  const handleItemClick = (item: ClipboardItem) => {
    window.ipcRenderer.send('clipboard:paste-item', { content: item.content, type: item.type || 'text' });
  };

  const handleRemove = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await window.ipcRenderer.invoke('history:remove', id);
    setResults(results.filter(item => item.id !== id));
  };

  const handleToggleStar = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await window.ipcRenderer.invoke('history:toggle-star', id);
    setResults(results.map(item => 
      item.id === id ? { ...item, isStarred: !item.isStarred } : item
    ));
  };

  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (item: ClipboardItem) => {
    if (item.type === 'image') return;
    
    hoverTimer.current = setTimeout(() => {
      window.ipcRenderer.send('preview:show', item.content);
    }, 800);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    window.ipcRenderer.send('preview:hide');
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
    <div className="flex flex-col p-4 animate-in fade-in duration-500 min-h-screen">
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

      <div className="space-y-3 pb-8">
        {hasSearched && results.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center pt-10 text-center">
            <p className="text-sm text-zinc-500">No matches found for "{query}"</p>
          </div>
        ) : (
          <>
            {results.map((item) => (
              <div 
                key={item.id} 
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-all hover:bg-zinc-800/80 active:scale-[0.98]"
              >
                {item.type === 'image' ? (
                  <div className="mb-2 max-h-40 overflow-hidden rounded-lg bg-zinc-800">
                    <img 
                      src={item.content} 
                      alt="Clipboard item" 
                      className="w-full object-contain"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-zinc-300 line-clamp-3">{item.content}</p>
                )}
                
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
            ))}

            <div ref={observerTarget} className="h-10 flex items-center justify-center">
              {isLoading && <Loader2 className="animate-spin text-zinc-600" size={20} />}
            </div>
          </>
        )}
        
        {!hasSearched && !isLoading && (
          <div className="flex flex-col items-center justify-center pt-10 text-center">
            <p className="text-sm text-zinc-500">Search through your local clipboard history.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;
