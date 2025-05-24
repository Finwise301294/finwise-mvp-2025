
export const FeaturedCard = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-green-50 rounded-3xl p-6 text-center border border-yellow-100">
      <div className="relative inline-block mb-4">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-2">
          📦
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">✓</span>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Polycule</h3>
      <p className="text-yellow-600 font-semibold text-lg">$967K MC</p>
    </div>
  );
};
