
interface CryptoItemProps {
  name: string;
  symbol: string;
  marketCap: string;
  price: string;
  color: string;
  icon: string;
  targetAmount?: string;
  memberCount?: number;
}

export const CryptoItem = ({ name, symbol, marketCap, price, color, icon, targetAmount, memberCount }: CryptoItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-sm transition-shadow">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white font-bold`}>
          <span className="text-lg">{icon}</span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-lg">{name}</h4>
          <p className="text-gray-500 text-sm">{marketCap}</p>
          {memberCount && (
            <p className="text-gray-400 text-xs">{memberCount} members</p>
          )}
        </div>
      </div>
      
      <div className="text-right">
        {price ? (
          <p className="font-semibold text-gray-900 text-lg">{price}</p>
        ) : targetAmount ? (
          <p className="font-semibold text-gray-900 text-lg">${targetAmount}</p>
        ) : null}
      </div>
    </div>
  );
};
