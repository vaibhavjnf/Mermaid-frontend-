import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import Mail from './views/Mail';
import Social from './views/Social';
import Chat from './views/Chat';
import Maps from './views/Maps';
import Vault from './views/Vault';
import { AppModule } from './types';
import { Users } from 'lucide-react';

const ForumPlaceholder = () => (
  <div className="h-full flex flex-col items-center justify-center text-neo-black bg-neo-bg">
    <div className="bg-neo-white border-2 border-black p-12 shadow-neo flex flex-col items-center">
      <Users size={64} className="mb-6 text-neo-primary" />
      <h2 className="text-3xl font-bold mb-2 uppercase tracking-tighter">Agora Forums</h2>
      <p className="font-mono text-sm border-t-2 border-black pt-4 mt-2">Decentralized discussion nodes syncing...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<AppModule>(AppModule.DASHBOARD);
  const [isBrownMode, setIsBrownMode] = useState(false);

  const renderModule = () => {
    switch (currentModule) {
      case AppModule.DASHBOARD:
        return <Dashboard />;
      case AppModule.MAIL:
        return <Mail />;
      case AppModule.SOCIAL:
        return <Social />;
      case AppModule.CHAT:
        return <Chat />;
      case AppModule.MAPS:
        return <Maps />;
      case AppModule.VAULT:
        return <Vault />;
      case AppModule.FORUM:
        return <ForumPlaceholder />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans selection:bg-neo-primary selection:text-white ${isBrownMode ? 'theme-brown' : ''} bg-neo-bg text-black transition-colors duration-300`}>
      {/* Container Frame */}
      <div className="flex w-full h-full p-2 md:p-4 gap-4">
        <Sidebar 
          currentModule={currentModule} 
          onModuleChange={setCurrentModule} 
          isBrownMode={isBrownMode}
          toggleTheme={() => setIsBrownMode(!isBrownMode)}
        />
        
        <main className="flex-1 relative overflow-hidden flex flex-col bg-neo-white border-2 border-black shadow-neo rounded-lg transition-colors duration-300">
           {/* Top Stripe Decoration */}
           <div className="h-2 w-full flex border-b-2 border-black">
             <div className="w-1/4 bg-neo-secondary"></div>
             <div className="w-1/4 bg-neo-primary"></div>
             <div className="w-1/4 bg-neo-accent"></div>
             <div className="w-1/4 bg-neo-success"></div>
           </div>
           
           <div className="flex-1 relative overflow-hidden">
             {renderModule()}
           </div>
        </main>
      </div>
    </div>
  );
};

export default App;