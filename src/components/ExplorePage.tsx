
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { CryptoItem } from './CryptoItem';
import { TotalSavingsCard } from './TotalSavingsCard';
import { CoinDetailPage } from './CoinDetailPage';
import { CreatePodPage } from './CreatePodPage';
import { StreakModal } from './StreakModal';

interface ExplorePageProps {
  onProfileClick: () => void;
}

export const ExplorePage = ({ onProfileClick }: ExplorePageProps) => {
  const [selectedCoin, setSelectedCoin] = useState<any>(null);
  const [showCreatePod, setShowCreatePod] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);
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

  const currentStreak = parseInt(localStorage.getItem('dailyStreak') || '7');

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

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button onClick={onProfileClick} className="w-12 h-12 rounded-full overflow-hidden">
          <img 
            src="/lovable-uploads/e7235b5a-22e7-4077-91eb-bbd62bc89352.png" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </button>
        
        <h1 className="text-2xl font-bold text-gray-900">Home</h1>
        
        <button onClick={() => setShowStreakModal(true)} className="relative">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">🔥</span>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{currentStreak}</span>
          </div>
        </button>
      </div>

      {/* Total Savings Card */}
      <div className="px-4 mb-6">
        <TotalSavingsCard />
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
      <div className="px-4 space-y-3 pb-24">
        {allPods.map((crypto, index) => (
          <div key={index} onClick={() => setSelectedCoin(crypto)}>
            <CryptoItem {...crypto} />
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowCreatePod(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors z-50"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Streak Modal */}
      {showStreakModal && (
        <StreakModal onClose={() => setShowStreakModal(false)} />
      )}
    </div>
  );
};
