
import { useState } from 'react';
import { ChevronLeft, Share2 } from 'lucide-react';
import { ShareModal } from './ShareModal';
import { ConfettiModal } from './ConfettiModal';

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
    members?: number;
  };
  onBack: () => void;
}

export const CoinDetailPage = ({ coin, onBack }: CoinDetailPageProps) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleJoin = () => {
    // Save to user holdings
    const existingHoldings = JSON.parse(localStorage.getItem('userHoldings') || '[]');
    const newHolding = {
      ...coin,
      price: '$0', // Start with $0 when joining
    };
    
    const updatedHoldings = [...existingHoldings, newHolding];
    localStorage.setItem('userHoldings', JSON.stringify(updatedHoldings));
    
    setShowConfetti(true);
  };

  const memberCount = coin.members || Math.floor(Math.random() * 20) + 5;

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
            <h1 className="text-2xl font-bold text-gray-900">{coin.name.toLowerCase()}</h1>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="px-4 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
        <div className="space-y-4 text-gray-600">
          <p>{coin.marketCap}</p>
          <p>
            Join this pod to save money together with friends and reach your financial goals through collective motivation and accountability.
          </p>
        </div>
      </div>

      {/* Builder Section */}
      <div className="px-4 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Builder</h2>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img 
              src="/lovable-uploads/45f0034a-fe81-4807-8a2e-224661fb6eac.png" 
              alt="Builder" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg font-medium text-gray-900">swunicorn</span>
        </div>
      </div>

      {/* Join Button */}
      <div className="px-4 mb-8">
        <button
          onClick={handleJoin}
          className="w-full bg-green-500 text-white py-4 rounded-3xl font-semibold text-lg"
        >
          Join
        </button>
      </div>

      {/* Member Count */}
      <div className="px-4 mb-8 text-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white"></div>
            ))}
          </div>
          <span className="text-gray-600 ml-2">{memberCount} people joined</span>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} />
      )}

      {/* Confetti Modal */}
      {showConfetti && (
        <ConfettiModal onClose={() => setShowConfetti(false)} />
      )}
    </div>
  );
};
