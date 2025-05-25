
import { ChevronLeft } from 'lucide-react';

interface DiscountsPageProps {
  onBack: () => void;
}

interface Discount {
  id: number;
  title: string;
  description: string;
  brand: string;
  discount: string;
  streakRequired: number;
  icon: string;
  color: string;
}

export const DiscountsPage = ({ onBack }: DiscountsPageProps) => {
  const currentStreak = parseInt(localStorage.getItem('dailyStreak') || '7');
  
  const allDiscounts: Discount[] = [
    {
      id: 1,
      title: "Free Coffee",
      description: "Get a free coffee at participating cafes",
      brand: "Local Cafes",
      discount: "Free",
      streakRequired: 10,
      icon: "☕",
      color: "bg-amber-500"
    },
    {
      id: 2,
      title: "20% Off Food Delivery",
      description: "Save on your next UberEats or DoorDash order",
      brand: "Food Delivery",
      discount: "20%",
      streakRequired: 20,
      icon: "🍕",
      color: "bg-orange-500"
    },
    {
      id: 3,
      title: "Free Movie Ticket",
      description: "Enjoy a free movie at participating cinemas",
      brand: "Cinemas",
      discount: "Free",
      streakRequired: 30,
      icon: "🎬",
      color: "bg-red-500"
    },
    {
      id: 4,
      title: "30% Off Clothing",
      description: "Get discount on fashion and apparel",
      brand: "Fashion Retailers",
      discount: "30%",
      streakRequired: 40,
      icon: "👕",
      color: "bg-pink-500"
    },
    {
      id: 5,
      title: "Free Gym Day Pass",
      description: "Access to premium gyms for a day",
      brand: "Fitness Centers",
      discount: "Free",
      streakRequired: 50,
      icon: "💪",
      color: "bg-green-500"
    },
    {
      id: 6,
      title: "25% Off Tech Gadgets",
      description: "Save on electronics and accessories",
      brand: "Tech Stores",
      discount: "25%",
      streakRequired: 60,
      icon: "📱",
      color: "bg-blue-500"
    }
  ];

  const unlockedDiscounts = allDiscounts.filter(discount => currentStreak >= discount.streakRequired);
  const lockedDiscounts = allDiscounts.filter(discount => currentStreak < discount.streakRequired);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button onClick={onBack} className="p-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Discounts</h1>
        <div className="w-10 h-6"></div>
      </div>

      {/* Current Streak */}
      <div className="px-4 mb-6">
        <div className="bg-white rounded-3xl p-6 text-center">
          <div className="text-4xl mb-2">🔥</div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{currentStreak} Day Streak</h2>
          <p className="text-gray-600">Keep going to unlock more discounts!</p>
        </div>
      </div>

      {/* Unlocked Discounts */}
      {unlockedDiscounts.length > 0 && (
        <div className="px-4 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Unlocked Discounts</h3>
          <div className="space-y-3">
            {unlockedDiscounts.map((discount) => (
              <div key={discount.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${discount.color} rounded-full flex items-center justify-center text-white text-xl`}>
                    {discount.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{discount.title}</h4>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {discount.discount} OFF
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{discount.description}</p>
                    <p className="text-gray-500 text-xs mt-1">{discount.brand}</p>
                  </div>
                  <div className="text-green-500">
                    ✓
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Discounts */}
      {lockedDiscounts.length > 0 && (
        <div className="px-4 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Coming Up</h3>
          <div className="space-y-3">
            {lockedDiscounts.map((discount) => (
              <div key={discount.id} className="bg-gray-100 rounded-2xl p-4 opacity-60">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white text-xl">
                    🔒
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-700">{discount.title}</h4>
                      <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {discount.discount} OFF
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">{discount.description}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      Unlock at {discount.streakRequired} day streak
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
