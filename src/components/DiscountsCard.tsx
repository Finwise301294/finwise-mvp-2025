
export const DiscountsCard = ({ onDiscountsClick }: { onDiscountsClick: () => void }) => {
  // Get current streak from localStorage or default to 7
  const currentStreak = parseInt(localStorage.getItem('dailyStreak') || '7');
  const unlockedDiscounts = Math.floor(currentStreak / 10);
  
  return (
    <div 
      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 text-center border border-purple-100 cursor-pointer"
      onClick={onDiscountsClick}
    >
      <div className="relative inline-block mb-4">
        <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-2">
          💝
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">{unlockedDiscounts}</span>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Discounts Unlocked</h3>
      <p className="text-purple-600 font-semibold text-lg">{unlockedDiscounts} discounts available!</p>
    </div>
  );
};
