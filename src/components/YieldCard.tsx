
import { Clock, TrendingUp, Lock } from 'lucide-react';

interface YieldCardProps {
  currentYield: number;
  projectedYield: number;
  daysLocked: number;
  daysToGoal: number;
  yieldRate: number;
}

export const YieldCard = ({ currentYield, projectedYield, daysLocked, daysToGoal, yieldRate }: YieldCardProps) => {
  const getYieldRate = (days: number) => {
    if (days < 8) return 0;
    if (days < 15) return 1;
    if (days < 30) return 3;
    return 6;
  };

  const currentRate = getYieldRate(daysLocked);
  const isYieldActive = daysLocked >= 8;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-6 text-white mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span className="font-semibold">Yield Progress</span>
        </div>
        <div className="text-2xl font-bold">{currentRate}% APY</div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="opacity-90">Current Yield Earned</span>
          <span className="font-bold">${currentYield.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="opacity-90">Projected at Goal</span>
          <span className="font-bold">${projectedYield.toFixed(2)}</span>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <Clock className="w-4 h-4" />
          <span className="text-sm opacity-90">
            {daysLocked} days locked • {daysToGoal} days to goal
          </span>
        </div>

        {!isYieldActive && (
          <div className="bg-white/20 rounded-2xl p-3 mt-4">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span className="text-sm">Yield activates in {8 - daysLocked} days</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
