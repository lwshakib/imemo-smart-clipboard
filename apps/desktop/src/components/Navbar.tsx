import React from 'react';
import { Clock, Star, Search, Settings } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TabId = 'history' | 'starred' | 'search' | 'settings';

interface TabItem {
  id: TabId;
  icon: React.ElementType;
  label: string;
}

const tabs: TabItem[] = [
  { id: 'history', icon: Clock, label: 'History' },
  { id: 'starred', icon: Star, label: 'Starred' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

interface NavbarProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="sticky top-0 z-50 flex h-14 w-full items-center justify-around border-b border-white/10 bg-zinc-950/80 px-4 backdrop-blur-md drag">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "group relative flex flex-col items-center justify-center transition-all duration-300",
              isActive ? "text-blue-500" : "text-zinc-400 hover:text-zinc-200"
            )}
            title={tab.label}
          >
            <Icon size={20} className={cn(
              "transition-transform duration-300",
              isActive ? "scale-110" : "group-hover:scale-105"
            )} />
            <span className="mt-1 text-[10px] font-medium uppercase tracking-wider">
              {tab.label}
            </span>
            
            {isActive && (
              <span className="absolute -bottom-3 h-1 w-6 rounded-t-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;
