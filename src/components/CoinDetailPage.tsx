
import { useState } from 'react';
import { ChevronLeft, Share2 } from 'lucide-react';
import { JoinSuccessModal } from './JoinSuccessModal';
import { ShareModal } from './ShareModal';

interface CoinDetailPageProps {
  coin: {
    name: string;
    symbol: string;
    price?: string;
    marketCap: string;
    volume?: string;
    change?: string;
    icon: string;
    color: string;
    memberCount?: number;
    targetAmount?: string;
  };
  onBack: () => void;
}

export const CoinDetailPage = ({ coin, onBack }: CoinDetailPageProps) => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleJoin = () => {
    // Add to user holdings
    const existingHoldings = JSON.parse(localStorage.getItem('userHoldings') || '[]');
    const newHolding = {
      name: coin.name,
      symbol: coin.symbol,
      marketCap: coin.marketCap,
      price: '$0',
      color: coin.color,
      icon: coin.icon,
      targetAmount: coin.targetAmount || '500'
    };
    
    // Check if already exists
    const existingIndex = existingHoldings.findIndex((h: any) => h.symbol === coin.symbol);
    if (existingIndex === -1) {
      existingHoldings.push(newHolding);
      localStorage.setItem('userHoldings', JSON.stringify(existingHoldings));
    }
    
    setShowJoinModal(true);
  };

  const memberCount = coin.memberCount || Math.floor(Math.random() * 20) + 5;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button onClick={onBack} className="p-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div className="text-center">
          <div className="w-8 h-8 mx-auto"></div>
        </div>
        <button onClick={() => setShowShareModal(true)} className="p-2">
          <Share2 className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Coin Header */}
      <div className="px-4 mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-16 h-16 ${coin.color} rounded-full flex items-center justify-center text-white font-bold`}>
            <span className="text-2xl">{coin.icon}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{coin.name}</h1>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="px-4 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
        <div className="space-y-4 text-gray-600">
          <p>{coin.marketCap}</p>
          <p>Join this pod to start saving together with your friends and reach your financial goals!</p>
        </div>
      </div>

      {/* Builder Section */}
      <div className="px-4 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Creator</h2>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img 
              src="/lovable-uploads/45f0034a-fe81-4807-8a2e-224661fb6eac.png" 
              alt="Creator" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg font-medium text-gray-900">Joshua Lei</span>
        </div>
      </div>

      {/* Join Button */}
      <div className="px-4 mb-8">
        <button
          onClick={handleJoin}
          className="w-full bg-green-500 text-white py-4 rounded-3xl font-semibold text-lg"
        >
          Join Pod
        </button>
      </div>

      {/* Member Count */}
      <div className="px-4 text-center text-gray-500">
        <p>{memberCount} people have joined this pod</p>
      </div>

      {/* Modals */}
      {showJoinModal && (
        <JoinSuccessModal onClose={() => setShowJoinModal(false)} />
      )}

      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
};
