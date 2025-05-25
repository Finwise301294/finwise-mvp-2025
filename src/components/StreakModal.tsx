
import { X } from 'lucide-react';

interface StreakModalProps {
  onClose: () => void;
}

export const StreakModal = ({ onClose }: StreakModalProps) => {
  const currentStreak = parseInt(localStorage.getItem('dailyStreak') || '7');
  const daysUntilNextDiscount = 10 - (currentStreak % 10);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="text-center">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🔥</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Daily Streak</h2>
          <p className="text-4xl font-bold text-orange-500 mb-4">{currentStreak} days</p>
          
          <div className="bg-orange-50 rounded-2xl p-4 mb-6">
            <p className="text-orange-700 font-medium">
              {daysUntilNextDiscount === 10 ? 'You just unlocked a new discount!' : `${daysUntilNextDiscount} more days to unlock a new discount!`}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-orange-500 text-white py-3 rounded-2xl font-semibold hover:bg-orange-600 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};
