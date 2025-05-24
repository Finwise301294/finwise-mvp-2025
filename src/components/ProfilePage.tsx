
import { useState } from 'react';
import { Settings, ChevronRight, Search } from 'lucide-react';
import { CashOutPage } from './CashOutPage';
import { AddCashPage } from './AddCashPage';

interface ProfilePageProps {
  onSettingsClick: () => void;
  onExploreClick: () => void;
}

export const ProfilePage = ({ onSettingsClick, onExploreClick }: ProfilePageProps) => {
  const [showCashOut, setShowCashOut] = useState(false);
  const [showAddCash, setShowAddCash] = useState(false);

  if (showCashOut) {
    return <CashOutPage onClose={() => setShowCashOut(false)} />;
  }

  if (showAddCash) {
    return <AddCashPage onClose={() => setShowAddCash(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button onClick={onSettingsClick} className="p-2">
          <Settings className="w-6 h-6 text-gray-700" />
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 rounded-full overflow-hidden relative">
            <img 
              src="/lovable-uploads/f49c00e3-6b6d-4e5b-83d0-bee1f6cffcc1.png" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✏️</span>
            </div>
          </div>
        </div>
        
        <button className="p-2">
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* User Name */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Joshua Lei</h2>
      </div>

      {/* Buying Power Card */}
      <div className="mx-4 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-3xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-5xl font-bold">$200</div>
              <div className="text-lg opacity-90 mt-2">Buying Power</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold">$250</div>
            </div>
          </div>
          
          <div className="flex space-x-4 mt-6">
            <button 
              onClick={() => setShowCashOut(true)}
              className="flex-1 bg-white/20 rounded-2xl py-4 text-lg font-semibold backdrop-blur-sm"
            >
              Cash Out
            </button>
            <button 
              onClick={() => setShowAddCash(true)}
              className="flex-1 bg-white/20 rounded-2xl py-4 text-lg font-semibold backdrop-blur-sm"
            >
              Add Cash
            </button>
          </div>
          
          <div className="text-center mt-4 text-sm opacity-75">
            Stored in Solana. Amount may fluctuate.
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-6">
        <div className="flex space-x-8">
          <button className="text-lg font-semibold text-gray-900 border-b-2 border-gray-900 pb-1">
            Holdings
          </button>
          <button className="text-lg font-medium text-gray-400">
            Projects
          </button>
        </div>
      </div>

      {/* No Holdings State */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 bg-gray-300 rounded-2xl flex items-center justify-center mb-4">
          <span className="text-2xl text-gray-500">📋</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Holdings Yet</h3>
        <p className="text-gray-500 mb-8">Holdings you own will show up here.</p>
        
        <button 
          onClick={onExploreClick}
          className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold"
        >
          <Search className="w-5 h-5" />
          <span>Explore</span>
        </button>
      </div>
    </div>
  );
};
