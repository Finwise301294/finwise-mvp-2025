
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { CashOutPage } from './CashOutPage';
import { AddCashPage } from './AddCashPage';

interface Holding {
  name: string;
  symbol: string;
  marketCap: string;
  price: string;
  color: string;
  icon: string;
}

interface HoldingDetailPageProps {
  holding: Holding;
  onBack: () => void;
}

export const HoldingDetailPage = ({ holding, onBack }: HoldingDetailPageProps) => {
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
        <button onClick={onBack} className="p-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{holding.name}</h1>
        <div className="w-10 h-6"></div>
      </div>

      {/* Buying Power Card */}
      <div className="mx-4 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-3xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-5xl font-bold">$0</div>
              <div className="text-lg opacity-90 mt-2">Buying Power</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold">$0</div>
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

      {/* Holding Details */}
      <div className="px-4">
        <div className="flex items-center space-x-4 mb-6">
          <div className={`w-16 h-16 ${holding.color} rounded-full flex items-center justify-center text-white font-bold`}>
            <span className="text-2xl">{holding.icon}</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{holding.name}</h2>
            <p className="text-gray-500">{holding.marketCap}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
