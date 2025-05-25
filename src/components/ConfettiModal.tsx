
import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ConfettiModalProps {
  onClose: () => void;
}

export const ConfettiModal = ({ onClose }: ConfettiModalProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-8 text-center overflow-hidden">
        {/* Confetti Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <div
              key={i + 20}
              className="absolute w-2 h-2 bg-pink-400 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <div
              key={i + 40}
              className="absolute w-2 h-2 bg-green-400 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 p-2">
          <X className="w-6 h-6 text-gray-700" />
        </button>

        <div className="relative z-10">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to the Pod!</h2>
          <p className="text-gray-600">You've successfully joined this savings challenge</p>
        </div>
      </div>
    </div>
  );
};
