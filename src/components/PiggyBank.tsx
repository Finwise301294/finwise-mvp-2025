
interface PiggyBankProps {
  currentAmount: number;
  targetAmount: number;
  onCashOut: () => void;
  onAddCash: () => void;
}

export const PiggyBank = ({ currentAmount, targetAmount, onCashOut, onAddCash }: PiggyBankProps) => {
  const fillPercentage = Math.min((currentAmount / targetAmount) * 100, 100);

  return (
    <div className="mx-4 mb-8">
      <div className="bg-white rounded-3xl p-6 text-center shadow-lg">
        {/* Piggy Bank Container */}
        <div className="relative w-48 h-32 mx-auto mb-6">
          {/* Piggy Bank Body */}
          <div className="relative w-full h-full">
            {/* Main Body */}
            <div className="absolute inset-0 bg-pink-200 bg-opacity-60 rounded-full border-4 border-pink-300 backdrop-blur-sm">
              {/* Liquid Fill */}
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-400 to-green-300 rounded-full transition-all duration-1000 ease-out"
                style={{ height: `${fillPercentage}%` }}
              />
              
              {/* Sparkles */}
              {fillPercentage > 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-yellow-400 animate-pulse">✨</div>
                </div>
              )}
            </div>
            
            {/* Pig Features */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-pink-700">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-pink-800 rounded-full"></div>
                <div className="w-2 h-2 bg-pink-800 rounded-full"></div>
              </div>
            </div>
            
            {/* Snout */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-pink-300 rounded-full border-2 border-pink-400">
              <div className="flex justify-center space-x-1 mt-1">
                <div className="w-1 h-1 bg-pink-800 rounded-full"></div>
                <div className="w-1 h-1 bg-pink-800 rounded-full"></div>
              </div>
            </div>
            
            {/* Ears */}
            <div className="absolute -top-2 left-6 w-6 h-8 bg-pink-200 border-2 border-pink-300 rounded-t-full transform rotate-12"></div>
            <div className="absolute -top-2 right-6 w-6 h-8 bg-pink-200 border-2 border-pink-300 rounded-t-full transform -rotate-12"></div>
            
            {/* Tail */}
            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-pink-200 border-2 border-pink-300 rounded-full transform rotate-45"></div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-4xl font-bold text-gray-900 mb-2">${currentAmount}</div>
          <div className="text-lg text-gray-600">Total Savings</div>
          <div className="text-sm text-gray-500 mt-1">{Math.round(fillPercentage)}% of ${targetAmount} goal</div>
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={onCashOut}
            className="flex-1 bg-red-500 text-white rounded-2xl py-3 text-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Cash Out
          </button>
          <button 
            onClick={onAddCash}
            className="flex-1 bg-green-500 text-white rounded-2xl py-3 text-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Add Cash
          </button>
        </div>
      </div>
    </div>
  );
};
