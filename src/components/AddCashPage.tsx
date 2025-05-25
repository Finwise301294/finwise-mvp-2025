import { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { SuccessModal } from './SuccessModal';

interface AddCashPageProps {
  onClose: () => void;
  onAddCash?: (amount: number) => void;
}

export const AddCashPage = ({ onClose, onAddCash }: AddCashPageProps) => {
  const [amount, setAmount] = useState('0');
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
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
    setAmount(preset);
    setSelectedAmount(preset);
  };

  const handleAdd = () => {
    const addAmount = parseFloat(amount) || 0;
    if (onAddCash && addAmount > 0) {
      onAddCash(addAmount);
      setShowSuccessModal(true);
    } else {
      onClose();
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <div></div>
        <h1 className="text-2xl font-bold text-gray-900">Add Cash</h1>
        <button onClick={onClose} className="p-2">
          <X className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Amount Display */}
      <div className="text-center py-12">
        <div className="text-6xl font-bold text-gray-900">${amount}</div>
      </div>

      {/* Preset Amount Buttons */}
      <div className="px-4 mb-8 flex space-x-4">
        {['100', '500', '1000'].map((preset) => (
          <button
            key={preset}
            onClick={() => handlePresetAmount(preset)}
            className={`flex-1 py-3 rounded-2xl font-medium transition-colors ${
              selectedAmount === preset 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            ${preset}
          </button>
        ))}
      </div>

      {/* Debit Card Option */}
      <div className="px-4 mb-8">
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

      {/* Add Button */}
      <div className="px-4">
        <button
          onClick={handleAdd}
          className="w-full bg-green-500 text-white py-4 rounded-3xl font-semibold text-lg"
        >
          Add
        </button>
      </div>

      {showSuccessModal && (
        <SuccessModal 
          title="Cash Added Successfully!"
          message={`You've added $${amount} to your savings`}
          onClose={handleSuccessClose}
        />
      )}
    </div>
  );
};
