
import { useState } from 'react';
import { X } from 'lucide-react';

interface BuyModalProps {
  coin: {
    name: string;
    symbol: string;
    icon: string;
    color: string;
  };
  onClose: () => void;
}

export const BuyModal = ({ coin, onClose }: BuyModalProps) => {
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  const [isSliding, setIsSliding] = useState(false);

  const presetAmounts = ['30', '40', '50', '100', '250', '...'];

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
  };

  const handleSlide = () => {
    setIsSliding(true);
    // Simulate slide action
    setTimeout(() => {
      setIsSliding(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="w-full bg-white rounded-t-3xl p-6 animate-slide-in-bottom">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div></div>
          <h2 className="text-2xl font-bold text-gray-900">Buy {coin.symbol}</h2>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Amount Selection */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleAmountSelect(amount)}
              className={`py-6 rounded-2xl font-semibold text-lg transition-colors ${
                selectedAmount === amount
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {amount === '...' ? amount : `$${amount}`}
            </button>
          ))}
        </div>

        {/* Slide to Buy */}
        <div className="relative">
          <button
            onClick={handleSlide}
            disabled={isSliding || !selectedAmount}
            className={`w-full py-4 rounded-3xl font-semibold text-lg relative overflow-hidden transition-colors ${
              selectedAmount && !isSliding
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-500'
            }`}
          >
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <div className={`w-12 h-12 bg-green-600 rounded-full transition-transform duration-1000 ${isSliding ? 'translate-x-80' : ''}`}></div>
            </div>
            <span className={`transition-opacity duration-500 ${isSliding ? 'opacity-50' : ''}`}>
              Slide to Buy
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
