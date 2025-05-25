import { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { SuccessModal } from './SuccessModal';

interface AddCashPageProps {
  onClose: () => void;
  onAddCash?: (amount: number) => void;
  targetAmount?: number;
  currentAmount?: number;
}

export const AddCashPage = ({ onClose, onAddCash, targetAmount = 500, currentAmount = 0 }: AddCashPageProps) => {
  const [amount, setAmount] = useState('0');
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  const maxAllowedAmount = targetAmount - currentAmount;

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
    const finalAmount = Math.min(presetNum, maxAllowedAmount);
    setAmount(finalAmount.toString());
    setSelectedAmount(preset);
  };

  const handleSlideToAdd = () => {
    setIsSliding(true);
    const addAmount = parseFloat(amount) || 0;
    const finalAmount = Math.min(addAmount, maxAllowedAmount);
    
    setTimeout(() => {
      setIsSliding(false);
      if (onAddCash && finalAmount > 0) {
        onAddCash(finalAmount);
        setShowSuccessModal(true);
      } else {
        onClose();
      }
    }, 1000);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const currentAmountValue = parseFloat(amount) || 0;
  const exceedsLimit = currentAmountValue > maxAllowedAmount;

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-12 shrink-0">
          <div></div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Add Cash</h1>
            <p className="text-gray-500">Max: ${maxAllowedAmount}</p>
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
              <p className="text-red-500 text-sm mt-2">Amount exceeds remaining target</p>
            )}
          </div>

          {/* Preset Amount Buttons */}
          <div className="px-4 mb-6 flex space-x-4">
            {['100', '250', maxAllowedAmount.toString()].map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetAmount(preset)}
                className={`flex-1 py-3 rounded-2xl font-medium transition-colors ${
                  selectedAmount === preset 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                ${parseFloat(preset)}
              </button>
            ))}
          </div>

          {/* Debit Card Option */}
          <div className="px-4 mb-6">
            <button className="w-full flex items-center justify-between bg-gray-100 rounded-2xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">💳</span>
                </div>
                <span className="text-gray-900 font-medium">Debit Card</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
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

          {/* Slide to Add Cash */}
          <div className="px-4 mt-auto">
            <div className="relative">
              <button
                onClick={handleSlideToAdd}
                disabled={isSliding || exceedsLimit || currentAmountValue <= 0}
                className={`w-full py-4 rounded-3xl font-semibold text-lg relative overflow-hidden ${
                  isSliding || exceedsLimit || currentAmountValue <= 0
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-green-500 text-white'
                }`}
              >
                <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-transform duration-1000 ${
                  isSliding ? 'translate-x-80' : ''
                }`}>
                  <div className="w-12 h-12 bg-green-600 rounded-full"></div>
                </div>
                <span className={`transition-opacity duration-500 ${isSliding ? 'opacity-50' : ''}`}>
                  Slide to Add Cash
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal 
          title="Cash Added Successfully!"
          message={`You've added $${Math.min(currentAmountValue, maxAllowedAmount)} to your savings`}
          onClose={handleSuccessClose}
        />
      )}
    </div>
  );
};

