
import { useState } from 'react';
import { ChevronLeft, Share2 } from 'lucide-react';
import { CashOutPage } from './CashOutPage';
import { AddCashPage } from './AddCashPage';
import { ShareModal } from './ShareModal';
import { Progress } from './ui/progress';

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

// Mock leaderboard data
const leaderboardData = [
  { name: "Joshua Lei", progress: 85, amount: "$425" },
  { name: "Sarah Chen", progress: 72, amount: "$360" },
  { name: "Mike Johnson", progress: 65, amount: "$325" },
  { name: "Emma Davis", progress: 48, amount: "$240" },
  { name: "Alex Rodriguez", progress: 33, amount: "$165" },
];

export const HoldingDetailPage = ({ holding, onBack }: HoldingDetailPageProps) => {
  const [showCashOut, setShowCashOut] = useState(false);
  const [showAddCash, setShowAddCash] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  if (showCashOut) {
    return <CashOutPage onClose={() => setShowCashOut(false)} />;
  }

  if (showAddCash) {
    return <AddCashPage onClose={() => setShowAddCash(false)} />;
  }

  // Extract the amount from the price string (remove $ sign)
  const totalSavings = holding.price.replace('$', '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button onClick={onBack} className="p-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{holding.name}</h1>
        <button onClick={() => setShowShareModal(true)} className="p-2">
          <Share2 className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Total Savings Card */}
      <div className="mx-4 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-3xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-5xl font-bold">${totalSavings}</div>
              <div className="text-lg opacity-90 mt-2">Total Savings</div>
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
        </div>
      </div>

      {/* Pod Details */}
      <div className="px-4 mb-8">
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

      {/* Leaderboard */}
      <div className="px-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Leaderboard</h3>
        <div className="space-y-3">
          {leaderboardData.map((participant, index) => (
            <div key={index} className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-700">#{index + 1}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{participant.name}</span>
                </div>
                <span className="font-semibold text-green-600">{participant.amount}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Progress value={participant.progress} className="flex-1" />
                <span className="text-sm text-gray-500">{participant.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
};
