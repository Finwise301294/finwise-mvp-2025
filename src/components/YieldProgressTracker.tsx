
import { Progress } from './ui/progress';

interface YieldProgressTrackerProps {
  daysLocked: number;
  targetDays: number;
  currentAmount: number;
  targetAmount: number;
  currentYield: number;
}

export const YieldProgressTracker = ({ 
  daysLocked, 
  targetDays, 
  currentAmount, 
  targetAmount,
  currentYield
}: YieldProgressTrackerProps) => {
  const dayProgress = (daysLocked / targetDays) * 100;
  const amountProgress = (currentAmount / targetAmount) * 100;

  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Progress Tracker</h3>
        <div className="text-right">
          <div className="text-lg font-bold text-green-600">+${currentYield.toFixed(2)}</div>
          <div className="text-xs text-gray-500">Yield Earned</div>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Days Locked Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Days Locked</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{daysLocked}/{targetDays}</span>
          </div>
          <Progress value={dayProgress} className="h-2" />
        </div>
        
        {/* Amount Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Amount Saved</span>
            <span className="text-sm font-medium text-gray-900">${currentAmount}/${targetAmount}</span>
          </div>
          <Progress value={amountProgress} className="h-2" />
        </div>
      </div>
    </div>
  );
};
