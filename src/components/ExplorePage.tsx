
import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { CryptoItem } from './CryptoItem';
import { FeaturedCard } from './FeaturedCard';
import { CoinDetailPage } from './CoinDetailPage';

interface ExplorePageProps {
  onProfileClick: () => void;
}

export const ExplorePage = ({ onProfileClick }: ExplorePageProps) => {
  const [selectedCoin, setSelectedCoin] = useState<any>(null);

  const cryptos = [
    {
      name: "Concert Saving Squad",
      symbol: "LC",
      marketCap: "Save for Taylor Swift Tickets",
      view: "View",
      color: "bg-green-500",
      icon: "🚀"
    },
    {
      name: "Dupe", 
      symbol: "DUPE",
      marketCap: "$15.1M MC",
      price: "$0.0151",
      color: "bg-cyan-400",
      icon: "∞",
      volume: "$1.2M"
    },
    {
      name: "Yapper",
      symbol: "YAP", 
      marketCap: "$7.3M MC",
      price: "$0.0073",
      color: "bg-pink-400",
      icon: "😊",
      volume: "$800K"
    },
    {
      name: "FITCOIN",
      symbol: "FIT",
      marketCap: "$5.7M MC", 
      price: "$0.0062",
      color: "bg-gradient-to-r from-blue-400 to-cyan-300",
      icon: "☁️",
      volume: "$30.6K",
      change: "16%"
    },
    {
      name: "CreatorBuddy",
      symbol: "CB",
      marketCap: "$4.9M MC",
      price: "$0.0049", 
      color: "bg-orange-500",
      icon: "📝",
      volume: "$650K"
    },
    {
      name: "Giggles",
      symbol: "GIG",
      marketCap: "$3.2M MC",
      price: "$0.0032",
      color: "bg-gradient-to-r from-green-400 to-blue-500",
      icon: "😄",
      volume: "$420K"
    }
  ];

  if (selectedCoin) {
    return (
      <CoinDetailPage 
        coin={selectedCoin}
        onBack={() => setSelectedCoin(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button onClick={onProfileClick} className="w-12 h-12 rounded-full overflow-hidden">
          <img 
            src="/lovable-uploads/45f0034a-fe81-4807-8a2e-224661fb6eac.png" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </button>
        
        <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
        
        <button className="p-2">
          <Search className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Featured Card */}
      <div className="px-4 mb-6">
        <FeaturedCard />
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex space-x-8">
          <button className="text-lg font-semibold text-gray-900 border-b-2 border-gray-900 pb-1">
            Verified
          </button>
          <button className="text-lg font-medium text-gray-400">
            New
          </button>
        </div>
      </div>

      {/* Crypto List */}
      <div className="px-4 space-y-3">
        {cryptos.map((crypto, index) => (
          <div key={index} onClick={() => setSelectedCoin(crypto)}>
            <CryptoItem {...crypto} />
          </div>
        ))}
      </div>
    </div>
  );
};
