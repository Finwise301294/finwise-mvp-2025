
import { AlertTriangle, X } from 'lucide-react';

interface WithdrawalWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentYield: number;
  penaltyAmount: number;
  daysLocked: number;
}

export const WithdrawalWarningModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  currentYield, 
  penaltyAmount,
  daysLocked 
}: WithdrawalWarningModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Early Withdrawal</h3>
          </div>
          <button onClick={onClose} className="p-2">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-gray-600">
            Withdrawing now will reset your progress and you'll lose earned yield.
          </p>
          
          <div className="bg-red-50 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-red-600 font-medium">Yield Lost</span>
              <span className="text-red-600 font-bold">-${currentYield.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-red-600 font-medium">Days Reset</span>
              <span className="text-red-600 font-bold">{daysLocked} days</span>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Keep your money locked for better rewards! You're {daysLocked >= 8 ? 'earning' : 'close to earning'} yield.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onConfirm}
            className="w-full py-3 bg-red-500 text-white rounded-2xl font-semibold"
          >
            Continue Withdrawal
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-900 rounded-2xl font-semibold"
          >
            Keep Saving
          </button>
        </div>
      </div>
    </div>
  );
};
