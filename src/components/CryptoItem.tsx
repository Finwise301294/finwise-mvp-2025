
interface CryptoItemProps {
  name: string;
  symbol: string;
  marketCap: string;
  price: string;
  color: string;
  icon: string;
}

export const CryptoItem = ({ name, symbol, marketCap, price, color, icon }: CryptoItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-sm transition-shadow">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white font-bold`}>
          <span className="text-lg">{icon}</span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-lg">{name}</h4>
          <p className="text-gray-500 text-sm">{marketCap}</p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="font-semibold text-gray-900 text-lg">{price}</p>
      </div>
    </div>
  );
};
