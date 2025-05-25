
import { useState, useEffect } from 'react';

export const TotalSavingsCard = () => {
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    // Always show $0 for testing - reset on each load
    setTotalSavings(0);
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
