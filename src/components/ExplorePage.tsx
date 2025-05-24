import { Search, ChevronRight } from 'lucide-react';
import { CryptoItem } from './CryptoItem';
import { FeaturedCard } from './FeaturedCard';

interface ExplorePageProps {
  onProfileClick: () => void;
}

export const ExplorePage = ({ onProfileClick }: ExplorePageProps) => {
  const cryptos = [
    {
      name: "Concert Saving Squad",
      symbol: "LC",
      marketCap: "Save for Taylor Swift Tickets",
      price: "View",
      color: "bg-green-500",
      icon: "🎤"
    },
    {
      name: "Globetrotter Gang", 
      symbol: "DUPE",
      marketCap: "Save for group travel",
      price: "View",
      color: "bg-cyan-400",
      icon: "✈️"
    },
    {
      name: "Upgrade Fund",
      symbol: "YAP", 
      marketCap: "Save for phone upgrade",
      price: "View",
      color: "bg-pink-400",
      icon: "📱"
    },
    {
      name: "Rent Ready",
      symbol: "FIT",
      marketCap: "Save up for your rent", 
      price: "View",
      color: "bg-gradient-to-r from-blue-400 to-cyan-300",
      icon: "🏡"
    },
    {
      name: "Retail Rehab",
      symbol: "CB",
      marketCap: "Limit impulse buys",
      price: "View",
      color: "bg-orange-500",
      icon: "🛍️"
    },
    {
      name: "Almost Adults",
      symbol: "GIG",
      marketCap: " Save for utilities",
      price: "View",
      color: "bg-gradient-to-r from-green-400 to-blue-500",
      icon: "😄"
    }
  ];

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
          <CryptoItem key={index} {...crypto} />
        ))}
      </div>
    </div>
  );
};
