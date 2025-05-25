
import { X } from 'lucide-react';

interface JoinSuccessModalProps {
  onClose: () => void;
}

export const JoinSuccessModal = ({ onClose }: JoinSuccessModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 text-center">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2">
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Celebration Emoji */}
        <div className="text-6xl mb-4">🎉</div>
        
        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to the Pod!</h2>
        <p className="text-gray-600 mb-6">You've successfully joined the pod</p>

        {/* OK Button */}
        <button
          onClick={onClose}
          className="w-full bg-green-500 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-green-600 transition-colors"
        >
          Let's Go!
        </button>
      </div>
    </div>
  );
};
