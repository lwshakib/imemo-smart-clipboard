import React from 'react';
import { Star } from 'lucide-react';

const StarredView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 h-[400px] text-center animate-in zoom-in-95 duration-500">
      <div className="rounded-full bg-yellow-500/10 p-4 mb-4">
        <Star size={32} className="text-yellow-500" />
      </div>
      <h2 className="text-xl font-semibold text-zinc-100 mb-2">Favorite Snippets</h2>
      <p className="text-sm text-zinc-400 max-w-[250px]">
        Star important clipboard items to quickly access them later. Your favorites will appear here.
      </p>
    </div>
  );
};

export default StarredView;
