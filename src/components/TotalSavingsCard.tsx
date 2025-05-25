
import { useState, useEffect } from 'react';

export const TotalSavingsCard = () => {
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    // Calculate total savings from all user holdings
    const holdings = JSON.parse(localStorage.getItem('userHoldings') || '[]');
    const total = holdings.reduce((sum: number, holding: any) => {
      const amount = parseFloat(holding.price.replace('$', '')) || 0;
      return sum + amount;
    }, 0);
    setTotalSavings(total);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-300 rounded-3xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold">${totalSavings.toFixed(0)}</div>
          <div className="text-lg opacity-90 mt-1">Total Saved</div>
        </div>
      </div>
    </div>
  );
};
