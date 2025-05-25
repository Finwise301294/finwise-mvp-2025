
import { Trophy, Gift, TrendingUp, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface GoalUnlockCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  yieldEarned: number;
  goalAmount: number;
  daysLocked: number;
}

export const GoalUnlockCelebration = ({ 
  isOpen, 
  onClose, 
  yieldEarned, 
  goalAmount, 
  daysLocked 
}: GoalUnlockCelebrationProps) => {
  const [showBonusOffer, setShowBonusOffer] = useState(false);

  if (!isOpen) return null;

  const handleClaimYield = () => {
    setShowBonusOffer(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center">
        {!showBonusOffer ? (
          <>
            {/* Celebration Screen */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Goal Achieved! 🎉</h2>
              <p className="text-gray-600">
                You successfully saved ${goalAmount} in {daysLocked} days!
              </p>
            </div>

            {/* Yield Unlocked */}
            <div className="bg-green-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Gift className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Yield Unlocked!</span>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                +${yieldEarned.toFixed(2)}
              </div>
              <p className="text-sm text-green-700">Earned through disciplined saving</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleClaimYield}
                className="w-full py-3 bg-green-500 text-white rounded-2xl font-semibold"
              >
                Claim Your Yield
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-100 text-gray-900 rounded-2xl font-semibold"
              >
                View Pod Details
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Bonus Offer Screen */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bonus Opportunity!</h2>
              <p className="text-gray-600">
                Keep your money locked for 2 more weeks for an extra +1.5% yield!
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-800">Extended Lock Bonus</span>
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-1">
                +${(goalAmount * 0.015).toFixed(2)}
              </div>
              <p className="text-sm text-purple-700">Additional yield for 14 more days</p>
            </div>

            <div className="space-y-3">
              <button className="w-full py-3 bg-purple-500 text-white rounded-2xl font-semibold">
                Accept Bonus Challenge
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-100 text-gray-900 rounded-2xl font-semibold"
              >
                Claim Original Yield
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
