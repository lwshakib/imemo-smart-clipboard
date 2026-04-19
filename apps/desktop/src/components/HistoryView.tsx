import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trash2, Star, Loader2 } from 'lucide-react';

interface ClipboardItem {
  id: string;
  content: string;
  timestamp: number;
  isStarred: boolean;
}

const PAGE_SIZE = 20;

const HistoryView: React.FC = () => {
  const [items, setItems] = useState<ClipboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchItems = useCallback(async (isInitial = false) => {
    if (isLoading || (!hasMore && !isInitial)) return;
    
    setIsLoading(true);
    const offset = isInitial ? 0 : items.length;
    
    try {
      const result = await window.ipcRenderer.invoke('history:get', { offset, limit: PAGE_SIZE });
      
      if (isInitial) {
        setItems(result.items);
      } else {
        setItems(prev => [...prev, ...result.items]);
      }
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setIsLoading(false);
    }
  }, [items.length, isLoading, hasMore]);

  useEffect(() => {
    fetchItems(true);

    const listener = (_event: any, updatedHistory: ClipboardItem[]) => {
      // For real-time updates, we reset to the first page to show the newest item
      setItems(updatedHistory.slice(0, PAGE_SIZE));
      setHasMore(updatedHistory.length > PAGE_SIZE);
    };

    window.ipcRenderer.on('history:updated', listener);
    return () => {
      window.ipcRenderer.off('history:updated', listener);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchItems();
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
  }, [fetchItems, hasMore, isLoading]);

  const handleItemClick = (content: string) => {
    window.ipcRenderer.send('clipboard:paste-item', content);
  };

  const handleRemove = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = await window.ipcRenderer.invoke('history:remove', id);
    // After removal, it's safer to just update the local state than refetch everything
    setItems(items.filter(item => item.id !== id));
  };

  const handleToggleStar = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = await window.ipcRenderer.invoke('history:toggle-star', id);
    setItems(items.map(item => item.id === id ? { ...item, isStarred: !item.isStarred } : item));
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
    <div className="flex flex-col p-4 animate-in fade-in slide-in-from-bottom-2 duration-500 min-h-screen">
      <div className="space-y-3 pb-8">
        {items.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center p-10 text-center text-zinc-500">
            <p className="text-sm">History is empty</p>
            <p className="text-[10px] mt-1">Copied text will appear here</p>
          </div>
        ) : (
          <>
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
            
            {/* Scroll Target */}
            <div ref={observerTarget} className="h-10 flex items-center justify-center">
              {isLoading && <Loader2 className="animate-spin text-zinc-600" size={20} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryView;
