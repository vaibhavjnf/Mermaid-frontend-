import React from 'react';
import { MODULES } from '../constants';
import { AppModule } from '../types';
import { LogOut, Settings, Waves, Coffee } from 'lucide-react';

interface SidebarProps {
  currentModule: AppModule;
  onModuleChange: (module: AppModule) => void;
  isBrownMode: boolean;
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentModule, onModuleChange, isBrownMode, toggleTheme }) => {
  return (
    <div className="w-20 md:w-24 flex flex-col gap-4 py-2 h-full z-50">
      {/* Brand */}
      <div className="bg-neo-white border-2 border-black shadow-neo p-2 flex items-center justify-center aspect-square rounded-lg group cursor-pointer hover:bg-neo-accent transition-colors">
        <Waves size={32} className="text-black group-hover:rotate-12 transition-transform" />
      </div>

      {/* Nav */}
      <div className="flex-1 bg-neo-white border-2 border-black shadow-neo rounded-lg flex flex-col items-center py-4 gap-3 overflow-y-auto no-scrollbar">
        {MODULES.map((mod) => {
          const isActive = currentModule === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => onModuleChange(mod.id)}
              className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border-2 border-black transition-all neo-button relative ${
                isActive 
                  ? 'bg-neo-primary text-white shadow-neo-sm -translate-y-1' 
                  : 'bg-white text-black hover:bg-gray-100 hover:shadow-neo-sm'
              } rounded-md`}
              title={mod.label}
            >
              <mod.icon size={24} strokeWidth={2.5} />
            </button>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="bg-neo-white border-2 border-black shadow-neo rounded-lg p-2 flex flex-col gap-2">
        <button 
          onClick={toggleTheme}
          className={`w-full aspect-square border-2 border-black rounded flex items-center justify-center transition-all ${isBrownMode ? 'bg-neo-black text-white' : 'bg-white hover:bg-neo-accent'}`}
          title={isBrownMode ? "Switch to Pop Mode" : "Switch to Brown Mode"}
        >
          <Coffee size={22} className={isBrownMode ? "text-neo-accent" : ""} />
        </button>
        <button className="w-full aspect-square border-2 border-black rounded flex items-center justify-center hover:bg-gray-200 transition-colors">
          <Settings size={22} />
        </button>
        <button className="w-full aspect-square border-2 border-black rounded flex items-center justify-center bg-neo-danger text-white hover:bg-red-500 transition-colors">
          <LogOut size={22} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;