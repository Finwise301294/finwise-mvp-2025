
interface DiscountsBadgeProps {
  onDiscountsClick: () => void;
}

export const DiscountsBadge = ({ onDiscountsClick }: DiscountsBadgeProps) => {
  const currentStreak = parseInt(localStorage.getItem('dailyStreak') || '7');
  const unlockedDiscounts = Math.floor(currentStreak / 10);
  
  return (
    <button 
      onClick={onDiscountsClick}
      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 hover:bg-purple-200 transition-colors"
    >
      <span>💝</span>
      <span>{unlockedDiscounts} discounts</span>
    </button>
  );
};
