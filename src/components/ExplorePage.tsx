
import { useState, useEffect } from 'react';
import { Plus, ChevronRight } from 'lucide-react';
import { CryptoItem } from './CryptoItem';
import { FeaturedCard } from './FeaturedCard';
import { DiscountsCard } from './DiscountsCard';
import { TotalSavingsCard } from './TotalSavingsCard';
import { CoinDetailPage } from './CoinDetailPage';
import { CreatePodPage } from './CreatePodPage';
import { DiscountsPage } from './DiscountsPage';

interface ExplorePageProps {
  onProfileClick: () => void;
}

export const ExplorePage = ({ onProfileClick }: ExplorePageProps) => {
  const [selectedCoin, setSelectedCoin] = useState<any>(null);
  const [showCreatePod, setShowCreatePod] = useState(false);
  const [showDiscounts, setShowDiscounts] = useState(false);
  const [allPods, setAllPods] = useState<any[]>([]);

  const defaultCryptos = [
    {
      name: "Concert Fund",
      symbol: "LC",
      marketCap: "Save for concert tickets",
      price: "",
      color: "bg-green-500",
      icon: "🎤",
      memberCount: 12,
      targetAmount: "300"
    },
    {
      name: "House Down Payment", 
      symbol: "DUPE",
      marketCap: "Save for future home",
      price: "",
      color: "bg-cyan-400",
      icon: "🏠",
      memberCount: 8,
      targetAmount: "5000"
    },
    {
      name: "Phone Upgrade",
      symbol: "YAP", 
      marketCap: "Save for new phone",
      price: "",
      color: "bg-pink-400",
      icon: "📱",
      memberCount: 15,
      targetAmount: "800"
    },
    {
      name: "Emergency Fund",
      symbol: "EF",
      marketCap: "Build emergency savings", 
      price: "",
      color: "bg-gradient-to-r from-blue-400 to-cyan-300",
      icon: "🛡️",
      memberCount: 23,
      targetAmount: "1000"
    },
    {
      name: "Travel Adventure",
      symbol: "CB",
      marketCap: "Save for dream vacation",
      price: "",
      color: "bg-orange-500",
      icon: "✈️",
      memberCount: 6,
      targetAmount: "1200"
    },
    {
      name: "Car Fund",
      symbol: "GIG",
      marketCap: "Save for first car",
      price: "",
      color: "bg-gradient-to-r from-green-400 to-blue-500",
      icon: "🚗",
      memberCount: 19,
      targetAmount: "2500"
    }
  ];

  useEffect(() => {
    // Load public pods and combine with default pods
    const publicPods = JSON.parse(localStorage.getItem('publicPods') || '[]');
    setAllPods([...defaultCryptos, ...publicPods]);
  }, [showCreatePod]);

  if (selectedCoin) {
    return (
      <CoinDetailPage 
        coin={selectedCoin}
        onBack={() => setSelectedCoin(null)}
        onProfileRedirect={onProfileClick}
      />
    );
  }

  if (showCreatePod) {
    return (
      <CreatePodPage onBack={() => setShowCreatePod(false)} />
    );
  }

  if (showDiscounts) {
    return (
      <DiscountsPage onBack={() => setShowDiscounts(false)} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button onClick={onProfileClick} className="w-12 h-12 rounded-full overflow-hidden">
          <img 
            src="/lovable-uploads/7179a805-1e9a-4986-bf99-5e78cc2b0caa.png" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </button>
        
        <h1 className="text-2xl font-bold text-gray-900">Home</h1>
        
        <button onClick={() => setShowCreatePod(true)} className="p-2">
          <Plus className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Total Savings Card */}
      <div className="px-4 mb-4">
        <TotalSavingsCard />
      </div>

      {/* Featured Cards Grid */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <FeaturedCard />
          <DiscountsCard onDiscountsClick={() => setShowDiscounts(true)} />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex space-x-8">
          <button className="text-lg font-semibold text-gray-900 border-b-2 border-gray-900 pb-1">
            Pods
          </button>
        </div>
      </div>

      {/* Crypto List */}
      <div className="px-4 space-y-3">
        {allPods.map((crypto, index) => (
          <div key={index} onClick={() => setSelectedCoin(crypto)}>
            <CryptoItem {...crypto} />
          </div>
        ))}
      </div>
    </div>
  );
};
