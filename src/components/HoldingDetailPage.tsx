
import { useState, useEffect } from 'react';
import { ChevronLeft, Share2 } from 'lucide-react';
import { CashOutPage } from './CashOutPage';
import { AddCashPage } from './AddCashPage';
import { ShareModal } from './ShareModal';
import { Progress } from './ui/progress';
import { YieldCard } from './YieldCard';
import { YieldProgressTracker } from './YieldProgressTracker';
import { WithdrawalWarningModal } from './WithdrawalWarningModal';
import { GoalUnlockCelebration } from './GoalUnlockCelebration';

interface Holding {
  name: string;
  symbol: string;
  marketCap: string;
  price: string;
  color: string;
  icon: string;
  targetAmount?: string;
  isPublic?: boolean;
}

interface HoldingDetailPageProps {
  holding: Holding;
  onBack: () => void;
}

// Mock leaderboard data that reflects progress towards target
const generateLeaderboard = (targetAmount: number) => [
  { name: "Joshua Lei", progress: 85, amount: Math.round(targetAmount * 0.85) },
  { name: "Sarah Chen", progress: 72, amount: Math.round(targetAmount * 0.72) },
  { name: "Mike Johnson", progress: 65, amount: Math.round(targetAmount * 0.65) },
  { name: "Emma Davis", progress: 48, amount: Math.round(targetAmount * 0.48) },
  { name: "Alex Rodriguez", progress: 33, amount: Math.round(targetAmount * 0.33) },
];

export const HoldingDetailPage = ({ holding, onBack }: HoldingDetailPageProps) => {
  const [showCashOut, setShowCashOut] = useState(false);
  const [showAddCash, setShowAddCash] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showWithdrawalWarning, setShowWithdrawalWarning] = useState(false);
  const [showGoalCelebration, setShowGoalCelebration] = useState(false);
  const [currentSavings, setCurrentSavings] = useState(0);

  // Mock yield data - would come from backend in real implementation
  const [daysLocked, setDaysLocked] = useState(12); // Example: 12 days locked
  const [yieldEarned, setYieldEarned] = useState(2.45); // Example yield earned

  useEffect(() => {
    // Get current savings for this holding
    const savings = parseFloat(holding.price.replace('$', '')) || 0;
    setCurrentSavings(savings);
  }, [holding.price]);

  const handleCashOutClick = () => {
    const targetAmount = parseInt(holding.targetAmount || '500');
    const hasReachedGoal = currentSavings >= targetAmount;
    
    // If goal is reached, go directly to cash out page
    if (hasReachedGoal) {
      setShowCashOut(true);
    } else if (yieldEarned > 0 || daysLocked > 0) {
      // Show warning for early withdrawal
      setShowWithdrawalWarning(true);
    } else {
      setShowCashOut(true);
    }
  };

  const handleConfirmCashOut = () => {
    setShowWithdrawalWarning(false);
    setShowCashOut(true);
  };

  const handleCashOut = (amount: number) => {
    const newAmount = Math.max(0, currentSavings - amount);
    setCurrentSavings(newAmount);
    updateHoldingInStorage(newAmount);
    // Reset yield and days when cashing out
    setYieldEarned(0);
    setDaysLocked(0);
  };

  const handleAddCash = (amount: number) => {
    const targetAmount = parseInt(holding.targetAmount || '500');
    const newAmount = Math.min(targetAmount, currentSavings + amount);
    setCurrentSavings(newAmount);
    updateHoldingInStorage(newAmount);
    
    // Check if goal is reached
    if (newAmount >= targetAmount && !hasReachedGoal) {
      setShowGoalCelebration(true);
    }
  };

  const updateHoldingInStorage = (newAmount: number) => {
    const holdings = JSON.parse(localStorage.getItem('userHoldings') || '[]');
    const updatedHoldings = holdings.map((h: any) => 
      h.symbol === holding.symbol ? { ...h, price: `$${newAmount}` } : h
    );
    localStorage.setItem('userHoldings', JSON.stringify(updatedHoldings));
  };

  if (showCashOut) {
    const targetAmount = parseInt(holding.targetAmount || '500');
    const hasReachedGoal = currentSavings >= targetAmount;
    
    return (
      <CashOutPage 
        onClose={() => setShowCashOut(false)} 
        onCashOut={handleCashOut}
        availableAmount={currentSavings}
        yieldEarned={hasReachedGoal ? yieldEarned : 0}
        targetAmount={targetAmount}
      />
    );
  }

  if (showAddCash) {
    return (
      <AddCashPage 
        onClose={() => setShowAddCash(false)} 
        onAddCash={handleAddCash}
        targetAmount={parseInt(holding.targetAmount || '500')}
        currentAmount={currentSavings}
      />
    );
  }

  const targetAmount = parseInt(holding.targetAmount || '500');
  const hasReachedGoal = currentSavings >= targetAmount;
  const leaderboardData = generateLeaderboard(targetAmount);
  const projectedYield = (targetAmount * 0.06 * (daysLocked + (targetAmount - currentSavings) / 10)) / 365; // Rough calculation

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button onClick={onBack} className="p-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 ${holding.color} rounded-full flex items-center justify-center text-white font-bold`}>
            <span className="text-lg">{holding.icon}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{holding.name}</h1>
        </div>
        <button onClick={() => setShowShareModal(true)} className="p-2">
          <Share2 className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Yield Progress Tracker */}
      <div className="px-4 mb-6">
        <YieldProgressTracker 
          daysLocked={daysLocked}
          targetDays={30}
          currentAmount={currentSavings}
          targetAmount={targetAmount}
          currentYield={yieldEarned}
        />
      </div>

      {/* Action Buttons */}
      <div className="px-4 mb-8">
        <div className="flex space-x-4">
          <button 
            onClick={handleCashOutClick}
            disabled={currentSavings === 0}
            className={`flex-1 rounded-2xl py-4 text-lg font-semibold ${
              currentSavings === 0 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : hasReachedGoal
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            {hasReachedGoal ? 'Cash Out (Goal Reached)' : 'Cash Out (Early)'}
          </button>
          <button 
            onClick={() => setShowAddCash(true)}
            disabled={hasReachedGoal}
            className={`flex-1 rounded-2xl py-4 text-lg font-semibold ${
              hasReachedGoal 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Add Cash
          </button>
        </div>
      </div>

      {/* Target Section */}
      <div className="px-4 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">Target</h3>
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">Goal Amount</span>
            <span className="font-semibold text-gray-900">${targetAmount}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Progress value={(currentSavings / targetAmount) * 100} className="flex-1" />
            <span className="text-sm text-gray-500">
              {Math.round((currentSavings / targetAmount) * 100)}%
            </span>
          </div>
          {hasReachedGoal && (
            <div className="text-green-600 font-semibold mt-2 text-center">🎉 Goal Completed!</div>
          )}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="px-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Leaderboard</h3>
        <div className="space-y-3">
          {leaderboardData.map((participant, index) => (
            <div key={index} className="bg-white rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-700">#{index + 1}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{participant.name}</span>
                </div>
                <span className="font-semibold text-green-600">${participant.amount}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Progress value={participant.progress} className="flex-1" />
                <span className="text-sm text-gray-500">{participant.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} />
      )}

      <WithdrawalWarningModal 
        isOpen={showWithdrawalWarning}
        onClose={() => setShowWithdrawalWarning(false)}
        onConfirm={handleConfirmCashOut}
        currentYield={yieldEarned}
        penaltyAmount={yieldEarned}
        daysLocked={daysLocked}
      />

      <GoalUnlockCelebration 
        isOpen={showGoalCelebration}
        onClose={() => setShowGoalCelebration(false)}
        yieldEarned={yieldEarned}
        goalAmount={targetAmount}
        daysLocked={daysLocked}
      />
    </div>
  );
};
