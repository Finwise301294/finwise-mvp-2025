
import { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { CryptoItem } from './CryptoItem';
import { CoinDetailPage } from './CoinDetailPage';
import { CreatePodPage } from './CreatePodPage';
import { StreakModal } from './StreakModal';
import { GoalsSearchModal } from './GoalsSearchModal';

interface ExplorePageProps {
  onProfileClick: () => void;
}

export const ExplorePage = ({ onProfileClick }: ExplorePageProps) => {
  const [selectedCoin, setSelectedCoin] = useState<any>(null);
  const [showCreatePod, setShowCreatePod] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showGoalsSearch, setShowGoalsSearch] = useState(false);
  const [allPods, setAllPods] = useState<any[]>([]);

  const defaultCryptos = [
    {
      name: "Concert Tickets",
      symbol: "CT",
      marketCap: "Save for your favorite artist",
      price: "",
      color: "bg-green-500",
      icon: "🎤",
      memberCount: 12,
      targetAmount: "300"
    },
    {
      name: "Dream Vacation", 
      symbol: "DV",
      marketCap: "Save for travel adventures",
      price: "",
      color: "bg-cyan-400",
      icon: "✈️",
      memberCount: 8,
      targetAmount: "1200"
    },
    {
      name: "New iPhone",
      symbol: "IP", 
      marketCap: "Save for latest tech",
      price: "",
      color: "bg-pink-400",
      icon: "📱",
      memberCount: 15,
      targetAmount: "800"
    },
    {
      name: "Emergency Fund",
      symbol: "EF",
      marketCap: "Build your safety net", 
      price: "",
      color: "bg-gradient-to-r from-blue-400 to-cyan-300",
      icon: "🛡️",
      memberCount: 23,
      targetAmount: "1000"
    },
    {
      name: "First Car",
      symbol: "FC",
      marketCap: "Save for your ride",
      price: "",
      color: "bg-orange-500",
      icon: "🚗",
      memberCount: 6,
      targetAmount: "2500"
    },
    {
      name: "Gaming Setup",
      symbol: "GS",
      marketCap: "Build the ultimate setup",
      price: "",
      color: "bg-gradient-to-r from-green-400 to-blue-500",
      icon: "🎮",
      memberCount: 19,
      targetAmount: "1500"
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
            src="/lovable-uploads/7179a805-1e9a-4986-bf99-5e78cc2b0caa.png" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </button>
        
        <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
        
        <button onClick={() => setShowStreakModal(true)} className="relative">
          <div className="bg-orange-100 rounded-full px-3 py-2 flex items-center space-x-1">
            <span className="text-lg">🔥</span>
            <span className="text-orange-600 font-bold text-sm">{currentStreak}</span>
          </div>
        </button>
      </div>

      {/* Goals Today Card - Centered content */}
      <div className="px-4 mb-6">
        <div 
          className="rounded-3xl p-8 text-white relative overflow-hidden text-center"
          style={{
            background: 'radial-gradient(circle at 0% 0%, #79b5fd, #a659ef, #f372b7, #f77518)'
          }}
        >
          <div className="relative z-10">
            <h2 className="text-lg font-bold mb-2">What do you want to save today?</h2>
            <button
              onClick={() => setShowGoalsSearch(true)}
              className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl px-6 py-3 flex items-center justify-center space-x-2 hover:bg-opacity-30 transition-all mx-auto"
            >
              <Search className="w-5 h-5" />
              <span>Search your goals</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex space-x-8">
          <button className="text-lg font-semibold text-gray-900 border-b-2 border-gray-900 pb-1">
            Goals
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

      {/* Floating Action Button - Black */}
      <button
        onClick={() => setShowCreatePod(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-black rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors z-50"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Modals */}
      {showStreakModal && (
        <StreakModal onClose={() => setShowStreakModal(false)} />
      )}

      {showGoalsSearch && (
        <GoalsSearchModal onClose={() => setShowGoalsSearch(false)} />
      )}
    </div>
  );
};
