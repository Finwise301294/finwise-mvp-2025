import { useState } from 'react';
import { X } from 'lucide-react';
import { SuccessModal } from './SuccessModal';

interface CashOutPageProps {
  onClose: () => void;
  onCashOut?: (amount: number) => void;
  availableAmount?: number;
}

export const CashOutPage = ({ onClose, onCashOut, availableAmount = 0 }: CashOutPageProps) => {
  const [amount, setAmount] = useState('0');
  const [isSliding, setIsSliding] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleNumberClick = (num: string) => {
    const newAmount = amount === '0' ? num : amount + num;
    const numericAmount = parseFloat(newAmount);
    
    // Prevent entering amount greater than available amount
    if (numericAmount <= availableAmount) {
      setAmount(newAmount);
    }
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

  const handleUseMax = () => {
    setAmount(availableAmount.toString());
  };

  const handleSlide = () => {
    const cashOutAmount = parseFloat(amount) || 0;
    
    // Prevent cash out if amount is greater than available
    if (cashOutAmount > availableAmount) {
      return;
    }
    
    setIsSliding(true);
    
    setTimeout(() => {
      setIsSliding(false);
      if (onCashOut) {
        onCashOut(cashOutAmount);
      }
      setShowSuccessModal(true);
    }, 1000);
  };

  const currentAmount = parseFloat(amount) || 0;
  const exceedsAvailable = currentAmount > availableAmount;

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <div></div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Cash Out</h1>
          <p className="text-gray-500">${availableAmount} Available</p>
        </div>
        <button onClick={onClose} className="p-2">
          <X className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Amount Display */}
      <div className="text-center py-12">
        <div className={`text-6xl font-bold ${exceedsAvailable ? 'text-red-500' : 'text-gray-900'}`}>
          ${amount}
        </div>
        {exceedsAvailable && (
          <p className="text-red-500 text-sm mt-2">Amount exceeds available balance</p>
        )}
      </div>

      {/* Solana and Use Max Buttons */}
      <div className="px-4 mb-8 flex space-x-4">
        <button className="flex items-center space-x-2 bg-gray-100 rounded-2xl px-4 py-3 flex-1">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">≡</span>
          </div>
          <span className="text-gray-900 font-medium">Solana</span>
        </button>
        <button 
          onClick={() => setAmount(availableAmount.toString())}
          className="bg-gray-100 rounded-2xl px-6 py-3"
        >
          <span className="text-gray-900 font-medium">Use Max</span>
        </button>
      </div>

      {/* Numeric Keypad */}
      <div className="px-8 mb-8">
        <div className="grid grid-cols-3 gap-6 text-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="text-3xl font-medium text-gray-900 py-4 hover:bg-gray-100 rounded-2xl transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleDecimalClick()}
            className="text-3xl font-medium text-gray-900 py-4 hover:bg-gray-100 rounded-2xl transition-colors"
          >
            .
          </button>
          <button
            onClick={() => handleNumberClick('0')}
            className="text-3xl font-medium text-gray-900 py-4 hover:bg-gray-100 rounded-2xl transition-colors"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="text-3xl font-medium text-gray-900 py-4 hover:bg-gray-100 rounded-2xl transition-colors flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Slide to Cash Out */}
      <div className="px-4">
        <div className="relative">
          <button
            onClick={handleSlide}
            disabled={isSliding || exceedsAvailable || currentAmount === 0}
            className={`w-full py-4 rounded-3xl font-semibold text-lg relative overflow-hidden ${
              exceedsAvailable || currentAmount === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-500 text-white'
            }`}
          >
            <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
              exceedsAvailable || currentAmount === 0 ? 'hidden' : ''
            }`}>
              <div className={`w-12 h-12 bg-green-600 rounded-full transition-transform duration-1000 ${isSliding ? 'translate-x-80' : ''}`}></div>
            </div>
            <span className={`transition-opacity duration-500 ${isSliding ? 'opacity-50' : ''}`}>
              {exceedsAvailable ? 'Amount Too High' : currentAmount === 0 ? 'Enter Amount' : 'Slide to Cash Out'}
            </span>
          </button>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal 
          title="Cash Out Successful!"
          message={`You've successfully cashed out $${amount}`}
          onClose={handleSuccessClose}
        />
      )}
    </div>
  );
};
