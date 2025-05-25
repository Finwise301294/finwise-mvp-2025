
import { useState, useEffect } from 'react';
import { Settings, ChevronRight, Search, Check } from 'lucide-react';
import { CashOutPage } from './CashOutPage';
import { AddCashPage } from './AddCashPage';
import { HoldingDetailPage } from './HoldingDetailPage';

interface ProfilePageProps {
  onSettingsClick: () => void;
  onExploreClick: () => void;
}

interface Holding {
  name: string;
  symbol: string;
  marketCap: string;
  price: string;
  color: string;
  icon: string;
  targetAmount?: string;
}

export const ProfilePage = ({ onSettingsClick, onExploreClick }: ProfilePageProps) => {
  const [showCashOut, setShowCashOut] = useState(false);
  const [showAddCash, setShowAddCash] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    // Get holdings from localStorage (includes joined pods and created pods)
    const storedHoldings = localStorage.getItem('userHoldings');
    if (storedHoldings) {
      setHoldings(JSON.parse(storedHoldings));
    }
  }, []);

  const isGoalReached = (holding: Holding) => {
    const currentAmount = parseFloat(holding.price.replace('$', '')) || 0;
    const targetAmount = parseInt(holding.targetAmount || '500');
    return currentAmount >= targetAmount;
  };

  if (showCashOut) {
    return <CashOutPage onClose={() => setShowCashOut(false)} />;
  }

  if (showAddCash) {
    return <AddCashPage onClose={() => setShowAddCash(false)} />;
  }

  if (selectedHolding) {
    return <HoldingDetailPage holding={selectedHolding} onBack={() => setSelectedHolding(null)} />;
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
              src="/lovable-uploads/7179a805-1e9a-4986-bf99-5e78cc2b0caa.png" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✏️</span>
            </div>
          </div>
        </div>
        
        <button onClick={onExploreClick} className="p-2">
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* User Name and Yield */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Joshua Lei</h2>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-6">
        <div className="flex space-x-8">
          <button className="text-lg font-semibold text-gray-900 border-b-2 border-gray-900 pb-1">
            My pods
          </button>
        </div>
      </div>

      {/* Holdings Content */}
      {holdings.length > 0 ? (
        <div className="px-4 space-y-3">
          {holdings.map((holding, index) => {
            const goalReached = isGoalReached(holding);
            
            return (
              <div 
                key={index} 
                onClick={() => setSelectedHolding(holding)}
                className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-sm transition-shadow cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${holding.color} rounded-full flex items-center justify-center text-white font-bold relative`}>
                    <span className="text-lg">{holding.icon}</span>
                    {goalReached && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{holding.name}</h4>
                    <p className="text-gray-500 text-sm">
                      {goalReached ? "🎉 Goal Reached!" : holding.marketCap}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-lg">{holding.price}</p>
                  {goalReached && (
                    <p className="text-green-600 text-sm font-medium">Complete</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* No Holdings State */
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-2xl text-gray-500">📋</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Pods Yet</h3>
          <p className="text-gray-500 mb-8">Pods you join will show up here.</p>
          
          <button 
            onClick={onExploreClick}
            className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold"
          >
            <Search className="w-5 h-5" />
            <span>Explore</span>
          </button>
        </div>
      )}
    </div>
  );
};
