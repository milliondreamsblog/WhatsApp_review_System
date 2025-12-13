import React from 'react';
import { MessageSquare, TrendingUp, LayoutDashboard, Settings, Users, LogOut } from 'lucide-react';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-[#F8F9FD]/70 dark:bg-slate-900/70 backdrop-blur-xl border-r border-white/50 dark:border-slate-700/50 flex flex-col items-center lg:items-stretch py-8 z-40 transition-all duration-300 ease-in-out">
    
      <div className="mb-10 px-6 flex items-center gap-3 justify-center lg:justify-start">
        <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-200 dark:shadow-none">
          <span className="text-white dark:text-slate-900 font-bold text-lg">S</span>
        </div>
        <span className="hidden lg:block font-bold text-xl text-slate-800 dark:text-white tracking-tight">StratusCRM</span>
      </div>


      <nav className="flex-1 px-4 space-y-2 w-full">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as TabType)}
            className={`group w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ease-out relative overflow-hidden ${
              activeTab === item.id
                ? 'bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none font-semibold backdrop-blur-sm'
                : 'text-slate-500 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-slate-800/40 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <item.icon className={`w-5 h-5 transition-colors ${activeTab === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
            <span className="hidden lg:block">{item.label}</span>
            {activeTab === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 dark:bg-indigo-400 rounded-r-full" />
            )}
          </button>
        ))}
        
        {/* <div className="py-4">
             <div className="h-px bg-slate-200/60 dark:bg-slate-700/60 w-full mx-auto mb-4" />
             <p className="hidden lg:block px-4 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Menu</p>
             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-slate-800/40 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
                <LayoutDashboard className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                <span className="hidden lg:block">Overview</span>
             </button>
             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 dark:text-slate-400 hover:bg-white/40 dark:hover:bg-slate-800/40 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
                <Users className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                <span className="hidden lg:block">Customers</span>
             </button>
        </div> */}
      </nav>


      <div className="px-4 space-y-2 w-full">
        {bottomItems.map((item) => (
           <button
            key={item.id}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 dark:text-slate-500 hover:bg-white/40 dark:hover:bg-slate-800/40 hover:text-slate-600 dark:hover:text-slate-300 transition-all"
          >
            <item.icon className="w-5 h-5" />
            <span className="hidden lg:block">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;