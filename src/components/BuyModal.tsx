
import { useState } from 'react';
import { X } from 'lucide-react';

interface BuyModalProps {
  coin: {
    name: string;
    symbol: string;
    icon: string;
    color: string;
    marketCap?: string;
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
    if (!selectedAmount) return;
    
    setIsSliding(true);
    
    // Save to localStorage
    const existingHoldings = JSON.parse(localStorage.getItem('userHoldings') || '[]');
    const newHolding = {
      name: coin.name,
      symbol: coin.symbol,
      marketCap: coin.marketCap || 'Investment holding',
      price: `$${selectedAmount}`,
      color: coin.color,
      icon: coin.icon
    };
    
    // Check if already exists, if so update the price, otherwise add new
    const existingIndex = existingHoldings.findIndex((h: any) => h.symbol === coin.symbol);
    if (existingIndex >= 0) {
      existingHoldings[existingIndex] = newHolding;
    } else {
      existingHoldings.push(newHolding);
    }
    
    localStorage.setItem('userHoldings', JSON.stringify(existingHoldings));
    
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
                  ? 'bg-primary text-white'
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
                ? 'bg-primary text-white'
                : 'bg-gray-300 text-gray-500'
            }`}
          >
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <div className={`w-12 h-12 bg-purple-600 rounded-full transition-transform duration-1000 ${isSliding ? 'translate-x-80' : ''}`}></div>
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
