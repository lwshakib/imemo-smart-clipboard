import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

const SearchView: React.FC = () => {
  return (
    <div className="flex flex-col p-4 animate-in fade-in duration-500">
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input 
          type="text" 
          placeholder="Search history..." 
          className="w-full rounded-xl border border-white/10 bg-zinc-900/50 py-3 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500/50 focus:outline-none focus:ring-1 focus:ring-zinc-500/50"
        />
      </div>
      <div className="flex flex-col items-center justify-center pt-10 text-center">
        <p className="text-sm text-zinc-500">Start typing to search through your clipboard history.</p>
      </div>
    </div>
  );
};

export default SearchView;
