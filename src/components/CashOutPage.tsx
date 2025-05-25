import { useState } from 'react';
import { X } from 'lucide-react';

interface CashOutPageProps {
  onClose: () => void;
}

export const CashOutPage = ({ onClose }: CashOutPageProps) => {
  const [amount, setAmount] = useState('0');
  const [isSliding, setIsSliding] = useState(false);

  const handleNumberClick = (num: string) => {
    if (amount === '0') {
      setAmount(num);
    } else {
      setAmount(amount + num);
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
    // Here you would fetch the user's available balance and set it
    setAmount('1000'); // Example max amount
  };

  const handleSlide = async () => {
    setIsSliding(true);
    try {
      const response = await axios.post('/cash-out', {
        userId: 'user123', // Replace with actual user ID
        amount: parseFloat(amount),
      });
      console.log(response.data.message);
      // Simulate slide action
      setTimeout(() => {
        setIsSliding(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Error during cash out:', error);
      setIsSliding(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <div></div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Cash Out</h1>
          <p className="text-gray-500">$0 Available</p>
        </div>
        <button onClick={onClose} className="p-2">
          <X className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Amount Display */}
      <div className="text-center py-12">
        <div className="text-6xl font-bold text-gray-900">${amount}</div>
      </div>

      {/* Use Max Button */}
      <div className="px-4 mb-8">
        <button 
          onClick={handleUseMax}
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
            onClick={handleDecimalClick}
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
            disabled={isSliding}
            className="w-full bg-green-500 text-white py-4 rounded-3xl font-semibold text-lg relative overflow-hidden"
          >
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <div className={`w-12 h-12 bg-green-600 rounded-full transition-transform duration-1000 ${isSliding ? 'translate-x-80' : ''}`}></div>
            </div>
            <span className={`transition-opacity duration-500 ${isSliding ? 'opacity-50' : ''}`}>
              Slide to Cash Out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

