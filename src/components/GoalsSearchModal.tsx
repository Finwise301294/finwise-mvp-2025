import { useState } from 'react';
import { Search, X } from 'lucide-react';
interface GoalsSearchModalProps {
  onClose: () => void;
}
export const GoalsSearchModal = ({
  onClose
}: GoalsSearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const suggestedGoals = [{
    emoji: '🎓',
    text: 'College Tuition'
  }, {
    emoji: '🏠',
    text: 'First Home Down Payment'
  }, {
    emoji: '💍',
    text: 'Wedding Fund'
  }, {
    emoji: '🌍',
    text: 'World Trip'
  }, {
    emoji: '💻',
    text: 'New Laptop'
  }, {
    emoji: '🚗',
    text: 'Car Down Payment'
  }];
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-hidden animate-slide-in-bottom">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">What's your goal?</h2>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search for your saving goal..." autoFocus className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-gray-500" />
          </div>
        </div>

        {/* Suggested Goals */}
        <div className="px-4 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Goals</h3>
          <div className="grid grid-cols-2 gap-3">
            {suggestedGoals.map((goal, index) => <button key={index} className="bg-gray-50 rounded-2xl p-4 text-left hover:bg-gray-100 transition-colors" onClick={onClose}>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{goal.emoji}</span>
                  <span className="font-medium text-gray-900">{goal.text}</span>
                </div>
              </button>)}
          </div>
        </div>
      </div>
    </div>;
};