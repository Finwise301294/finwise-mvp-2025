
import { Trophy, Target } from 'lucide-react';

interface YieldProgressTrackerProps {
  daysLocked: number;
  targetDays: number;
  currentAmount: number;
  targetAmount: number;
  currentYield: number;
}

export const YieldProgressTracker = ({ daysLocked, targetDays, currentAmount, targetAmount, currentYield }: YieldProgressTrackerProps) => {
  const getYieldMilestone = (days: number) => {
    if (days < 8) return { rate: 0, label: 'No Yield', color: 'bg-gray-400' };
    if (days < 15) return { rate: 1, label: 'Basic Yield', color: 'bg-yellow-400' };
    if (days < 30) return { rate: 3, label: 'Good Yield', color: 'bg-orange-400' };
    return { rate: 6, label: 'Max Yield', color: 'bg-green-500' };
  };

  const currentMilestone = getYieldMilestone(daysLocked);
  const nextMilestone = getYieldMilestone(daysLocked + 1);
  
  const milestones = [
    { days: 0, rate: 0, label: 'Start', lockDays: '0 days' },
    { days: 8, rate: 1, label: 'Basic', lockDays: '8+ days' },
    { days: 15, rate: 3, label: 'Good', lockDays: '15+ days' },
    { days: 30, rate: 6, label: 'Max', lockDays: '30+ days' }
  ];

  const getNextUnlock = () => {
    if (daysLocked < 8) return { days: 8 - daysLocked, rate: 1 };
    if (daysLocked < 15) return { days: 15 - daysLocked, rate: 3 };
    if (daysLocked < 30) return { days: 30 - daysLocked, rate: 6 };
    return null;
  };

  const nextUnlock = getNextUnlock();

  return (
    <div className="bg-white rounded-2xl p-4 mb-4">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
        <span>Yield Progress</span>
      </h3>

      {/* Progress Timeline */}
      <div className="relative mb-6">
        <div className="flex justify-between items-center">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full ${
                daysLocked >= milestone.days ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
              <span className="text-xs text-gray-500 mt-1">{milestone.label}</span>
              <span className="text-xs font-bold text-gray-700">{milestone.rate}%</span>
              <span className="text-xs text-gray-400">{milestone.lockDays}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-200 -z-10">
          <div 
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${Math.min((daysLocked / 30) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Days Locked</span>
          </div>
          <span className="font-bold text-gray-900">{daysLocked} days</span>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Current Rate</span>
          <span className={`font-bold ${currentMilestone.rate > 0 ? 'text-green-600' : 'text-gray-500'}`}>
            {currentMilestone.rate}% APY
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">Yield Earned</span>
          <span className="font-bold text-green-600">${currentYield.toFixed(2)}</span>
        </div>

        {nextUnlock && (
          <div className="mt-3 p-3 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-700">
              Unlock {nextUnlock.rate}% yield in {nextUnlock.days} more days!
            </p>
          </div>
        )}

        {daysLocked >= 30 && (
          <div className="mt-3 p-3 bg-green-50 rounded-xl">
            <p className="text-sm text-green-700">
              You've reached maximum yield rate! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
