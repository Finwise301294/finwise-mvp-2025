
import { useState } from 'react';
import { X } from 'lucide-react';
import { SuccessModal } from './SuccessModal';

interface CashOutPageProps {
  onClose: () => void;
  onCashOut?: (amount: number) => void;
  availableAmount?: number;
  targetAmount?: number;
  yieldEarned?: number;
}

export const CashOutPage = ({ onClose, onCashOut, availableAmount = 0, targetAmount = 500, yieldEarned = 0 }: CashOutPageProps) => {
  const [amount, setAmount] = useState('0');
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleNumberClick = (num: string) => {
    if (amount === '0') {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
    setSelectedAmount(null);
  };

  const handleDecimalClick = () => {
    if (!amount.includes('.')) {
      setAmount(amount + '.');
    }
  };

  const handleBackspace = () => {
    if (amount.length > 1) {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount('0');
    }
  };

  const handlePresetAmount = (preset: string) => {
    const presetNum = parseFloat(preset);
    const finalAmount = Math.min(presetNum, availableAmount);
    setAmount(finalAmount.toString());
    setSelectedAmount(preset);
  };

  const handleSlide = () => {
    setIsSliding(true);
    const cashOutAmount = parseFloat(amount) || 0;
    const finalAmount = Math.min(cashOutAmount, availableAmount);
    
    setTimeout(() => {
      setIsSliding(false);
      if (onCashOut && finalAmount > 0) {
        onCashOut(finalAmount);
      }
      setShowSuccessModal(true);
    }, 1000);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const currentAmountValue = parseFloat(amount) || 0;
  const exceedsLimit = currentAmountValue > availableAmount;
  const hasReachedGoal = availableAmount >= targetAmount;

  // Calculate preset amounts (100%, 50%, 25% of target goal)
  const fullAmount = Math.min(targetAmount, availableAmount);
  const halfAmount = Math.min(targetAmount * 0.5, availableAmount);
  const quarterAmount = Math.min(targetAmount * 0.25, availableAmount);

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-12 shrink-0">
          <div></div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Cash Out</h1>
            <p className="text-gray-500">
              ${availableAmount} Available
              {hasReachedGoal && yieldEarned > 0 && (
                <span className="text-green-600"> + ${yieldEarned.toFixed(2)} Yield</span>
              )}
            </p>
          </div>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 flex flex-col pb-4">
          {/* Amount Display */}
          <div className="text-center py-8">
            <div className={`text-5xl font-bold ${exceedsLimit ? 'text-red-500' : 'text-gray-900'}`}>
              ${amount}
            </div>
            {exceedsLimit && (
              <p className="text-red-500 text-sm mt-2">Amount exceeds available balance</p>
            )}
          </div>

          {/* Preset Amount Buttons */}
          <div className="px-4 mb-6 flex space-x-4">
            {[fullAmount.toString(), halfAmount.toString(), quarterAmount.toString()].map((preset, index) => {
              const labels = ['100%', '50%', '25%'];
              return (
                <button
                  key={preset}
                  onClick={() => handlePresetAmount(preset)}
                  className={`flex-1 py-3 rounded-2xl font-medium transition-colors ${
                    selectedAmount === preset 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-sm">{labels[index]}</div>
                  <div className="text-xs opacity-75">${parseFloat(preset).toFixed(0)}</div>
                </button>
              );
            })}
          </div>

          {/* Solana Payment Method */}
          <div className="px-4 mb-6">
            <button className="w-full flex items-center justify-between bg-gray-100 rounded-2xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">≡</span>
                </div>
                <span className="text-gray-900 font-medium">Solana</span>
              </div>
            </button>
          </div>

          {/* Numeric Keypad */}
          <div className="px-8 mb-6 flex-1">
            <div className="grid grid-cols-3 gap-4 text-center max-w-xs mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num.toString())}
                  className="text-2xl font-medium text-gray-900 py-3 hover:bg-gray-100 rounded-2xl transition-colors"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleDecimalClick()}
                className="text-2xl font-medium text-gray-900 py-3 hover:bg-gray-100 rounded-2xl transition-colors"
              >
                .
              </button>
              <button
                onClick={() => handleNumberClick('0')}
                className="text-2xl font-medium text-gray-900 py-3 hover:bg-gray-100 rounded-2xl transition-colors"
              >
                0
              </button>
              <button
                onClick={handleBackspace}
                className="text-2xl font-medium text-gray-900 py-3 hover:bg-gray-100 rounded-2xl transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Slide to Cash Out */}
          <div className="px-4 mt-auto">
            <div className="relative">
              <button
                onClick={handleSlide}
                disabled={isSliding || exceedsLimit || currentAmountValue <= 0}
                className={`w-full py-4 rounded-3xl font-semibold text-lg relative overflow-hidden ${
                  isSliding || exceedsLimit || currentAmountValue <= 0
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-red-500 text-white'
                }`}
              >
                <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-transform duration-1000 ${
                  isSliding ? 'translate-x-80' : ''
                }`}>
                  <div className="w-12 h-12 bg-red-600 rounded-full"></div>
                </div>
                <span className={`transition-opacity duration-500 ${isSliding ? 'opacity-50' : ''}`}>
                  Slide to Cash Out
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal 
          title="Cash Out Successful!"
          message={`You've successfully cashed out $${Math.min(currentAmountValue, availableAmount)}${hasReachedGoal && yieldEarned > 0 ? ` including $${yieldEarned.toFixed(2)} yield` : ''}`}
          onClose={handleSuccessClose}
        />
      )}
    </div>
  );
};
