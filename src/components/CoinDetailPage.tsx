
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { BuyModal } from './BuyModal';

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
  };
  onBack: () => void;
}

export const CoinDetailPage = ({ coin, onBack }: CoinDetailPageProps) => {
  const [showBuyModal, setShowBuyModal] = useState(false);

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
        <button className="p-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <span className="text-gray-700">⋯</span>
          </div>
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
        
        {coin.price && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">{coin.price}</span>
            {coin.change && (
              <span className="text-green-500 font-medium">↗ {coin.change} Past Hour</span>
            )}
          </div>
        )}
      </div>

      {/* About Section */}
      <div className="px-4 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            Introducing: @{coin.name.toLowerCase()}app, the most realistic AI influencers ever (yes this video is AI).
          </p>
          <p>
            Brands get scalable ads. Influencers earn passive income when an ad is generated with their face.
          </p>
          <p>
            No lawsuits. No fake-looking avatars. Just AI-powered marketing at scale.
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

      {/* Stats Section */}
      <div className="px-4 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Stats</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Market Cap</span>
            <span className="font-bold text-gray-900">$427.1K</span>
          </div>
          {coin.volume && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Volume (24h)</span>
              <span className="font-bold text-gray-900">{coin.volume}</span>
            </div>
          )}
        </div>
      </div>

      {/* Buy Button */}
      <div className="px-4 mb-8">
        <button
          onClick={() => setShowBuyModal(true)}
          className="w-full bg-green-500 text-white py-4 rounded-3xl font-semibold text-lg"
        >
          Buy
        </button>
      </div>

      {/* Buy Modal */}
      {showBuyModal && (
        <BuyModal 
          coin={coin}
          onClose={() => setShowBuyModal(false)}
        />
      )}
    </div>
  );
};
