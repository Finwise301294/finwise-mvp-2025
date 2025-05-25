
export const FeaturedCard = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 text-center border border-yellow-100">
      <div className="relative inline-block mb-4">
        <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-2">
          🔥
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">7</span>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Daily Streak</h3>
      <p className="text-amber-600 font-semibold text-lg">7 days and counting!</p>
      <p className="text-amber-600 font-semibold text-md">3 more days to unlock a new discount</p>
    </div>
  );
};
