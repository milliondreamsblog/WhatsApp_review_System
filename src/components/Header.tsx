import React from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-30 px-8 py-5 flex items-center justify-between bg-[#eef2f6]/60 dark:bg-slate-900/60 backdrop-blur-md transition-all">
        <div className="flex items-center gap-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full px-6 py-2.5 shadow-sm border border-white/50 dark:border-slate-700/50 w-96 max-w-full transition-colors">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Search reviews, analytics..." 
            className="bg-transparent border-none outline-none text-sm text-slate-600 dark:text-slate-200 w-full placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center gap-1 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-1 rounded-full shadow-sm border border-white/50 dark:border-slate-700/50">
              <button 
                onClick={!isDarkMode ? undefined : toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 ${
                  !isDarkMode 
                    ? 'bg-white text-amber-500 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sun className="w-4 h-4" />
              </button>
              <button 
                onClick={isDarkMode ? undefined : toggleDarkMode}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-700 text-indigo-400 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Moon className="w-4 h-4" />
              </button>
           </div>

           <button className="relative p-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full shadow-sm border border-white/50 dark:border-slate-700/50 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
           </button>

           <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Akshat Darshi</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Product Manager</p>
              </div>
              <img 
                src="https://picsum.photos/200" 
                alt="User" 
                className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-md object-cover"
              />
           </div>
        </div>
    </header>
  );
};

export default Header;