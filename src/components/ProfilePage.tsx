
import { useState, useEffect } from 'react';
import { Settings, ChevronRight, Search, Check } from 'lucide-react';
import { CashOutPage } from './CashOutPage';
import { AddCashPage } from './AddCashPage';
import { HoldingDetailPage } from './HoldingDetailPage';
import { DiscountsBadge } from './DiscountsBadge';
import { DiscountsPage } from './DiscountsPage';
import { SettingsPage } from './SettingsPage';
import { CryptoItem } from './CryptoItem';

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
  const [showDiscounts, setShowDiscounts] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [totalSavings, setTotalSavings] = useState(0);

  const loadHoldingsAndCalculateTotal = () => {
    const userHoldings = JSON.parse(localStorage.getItem('userHoldings') || '[]');
    setHoldings(userHoldings);
    
    // Calculate total savings from all holdings
    const total = userHoldings.reduce((sum: number, holding: Holding) => {
      const amount = parseFloat(holding.price.replace('$', '')) || 0;
      return sum + amount;
    }, 0);
    setTotalSavings(total);
  };

  useEffect(() => {
    loadHoldingsAndCalculateTotal();
    
    // Listen for storage changes to update when other components modify holdings
    const handleStorageChange = () => {
      loadHoldingsAndCalculateTotal();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events for same-tab updates
    window.addEventListener('holdingsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('holdingsUpdated', handleStorageChange);
    };
  }, []);

  const handleHoldingUpdate = () => {
    loadHoldingsAndCalculateTotal();
  };

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
    return (
      <HoldingDetailPage 
        holding={selectedHolding} 
        onBack={() => {
          setSelectedHolding(null);
          handleHoldingUpdate();
        }}
        onUpdate={handleHoldingUpdate}
      />
    );
  }

  if (showDiscounts) {
    return <DiscountsPage onBack={() => setShowDiscounts(false)} />;
  }

  if (showSettings) {
    return <SettingsPage onBack={() => setShowSettings(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button onClick={() => setShowSettings(true)} className="p-2">
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

      {/* User Name and Discounts Badge */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Joshua Lei</h2>
        <div className="flex justify-center">
          <DiscountsBadge onDiscountsClick={() => setShowDiscounts(true)} />
        </div>
      </div>

      {/* Total Savings Card with Gradient */}
      <div className="px-4 mb-6">
        <div 
          className="rounded-3xl p-6 text-white"
          style={{
            background: 'radial-gradient(circle at 0% 0%, #79b5fd, #a659ef, #f372b7, #f77518)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">${totalSavings.toFixed(0)}</div>
              <div className="text-lg opacity-90 mt-1">Total Saved</div>
            </div>
          </div>
        </div>
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
      {holdings.length === 0 ? (
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
      ) : (
        <div className="px-4 space-y-3 pb-24">
          {holdings.map((holding, index) => (
            <div key={index} onClick={() => setSelectedHolding(holding)} className="relative">
              <CryptoItem {...holding} />
              {isGoalReached(holding) && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
