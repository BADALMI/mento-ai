import React from 'react';
import { Home, BarChart3, BookOpen, Bot, Users, Settings, History, PlusCircle } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: 'dashboard' | 'checkin' | 'team' | 'settings' | 'history' | 'journal' | 'mento') => void;
  userMode: 'solo' | 'team';
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, userMode }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', color: 'text-[#A5E3D8]' },
    { id: 'checkin', icon: PlusCircle, label: 'Check In', color: 'text-[#A5E3D8]' },
    { id: 'history', icon: BarChart3, label: 'Analytics', color: 'text-[#C2E7FF]' },
    { id: 'journal', icon: BookOpen, label: 'Journal', color: 'text-[#D2F8D2]' },
    { id: 'mento', icon: Bot, label: 'Mento AI', color: 'text-[#FFF6B3]' },
    ...(userMode === 'team' ? [{ id: 'team', icon: Users, label: 'Team', color: 'text-[#FFDBD3]' }] : []),
    { id: 'settings', icon: Settings, label: 'Settings', color: 'text-[#334155] dark:text-gray-300' }
  ];

  return (
    <>
      {/* Desktop Navigation - Left Sidebar */}
      <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-72">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/20 px-6 py-8 transition-colors duration-300">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#A5E3D8]/20 dark:bg-[#A5E3D8]/30 rounded-xl">
                <Bot className="w-8 h-8 text-[#A5E3D8]" />
              </div>
              <div>
                <h1 className="font-sora font-bold text-xl text-[#334155] dark:text-white">Mento AI</h1>
                <p className="font-inter text-sm text-[#334155]/60 dark:text-gray-400">Mind in sync</p>
              </div>
            </div>
            <DarkModeToggle />
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onNavigate(item.id as any)}
                      className={`group flex gap-x-3 rounded-2xl p-4 text-sm font-medium leading-6 w-full transition-all duration-300 ${
                        isActive
                          ? 'bg-white/20 dark:bg-gray-800/20 text-[#334155] dark:text-white shadow-lg backdrop-blur-sm border border-white/30 dark:border-gray-700/30'
                          : 'text-[#334155]/70 dark:text-gray-400 hover:text-[#334155] dark:hover:text-white hover:bg-white/10 dark:hover:bg-gray-800/10'
                      }`}
                    >
                      <Icon className={`h-6 w-6 shrink-0 ${isActive ? item.color : 'text-[#334155]/50 dark:text-gray-500'}`} />
                      <span className="font-inter">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation - Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/20 transition-colors duration-300">
        <div className="flex justify-around items-center py-2 px-4">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-white/20 dark:bg-gray-800/20 text-[#334155] dark:text-white'
                    : 'text-[#334155]/60 dark:text-gray-400 hover:text-[#334155] dark:hover:text-white'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? item.color : 'text-[#334155]/50 dark:text-gray-500'}`} />
                <span className="font-inter text-xs">{item.label}</span>
              </button>
            );
          })}
          <DarkModeToggle />
        </div>
      </div>
    </>
  );
};

export default Navigation;