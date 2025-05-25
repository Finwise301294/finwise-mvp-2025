
import { X, ChevronRight } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const menuItems = [
    {
      icon: "𝕏",
      title: "Link your X",
      subtitle: "Claim your fees",
      hasChevron: true
    },
    {
      icon: "👤",
      title: "Edit Profile", 
      hasChevron: true
    },
    {
      icon: "💳",
      title: "My Wallet",
      subtitle: "FqT9...5aZM",
      hasChevron: true
    },
    {
      icon: "⭐",
      title: "Rate Believe",
      hasChevron: true
    },
    {
      icon: "💬",
      title: "Support",
      hasChevron: true
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white rounded-t-3xl w-full max-w-md mx-auto animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-6">
          <div className="w-6" /> {/* Spacer */}
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="text-center px-4 mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
            <img 
              src="/lovable-uploads/7179a805-1e9a-4986-bf99-5e78cc2b0caa.png" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Joshua Lei</h2>
        </div>

        {/* Menu Items */}
        <div className="px-4 space-y-1 mb-8">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center text-lg">
                  {item.icon}
                </div>
                <div className="text-left">
                  <div className="text-lg font-medium text-gray-900">{item.title}</div>
                  {item.subtitle && (
                    <div className="text-sm text-gray-500">{item.subtitle}</div>
                  )}
                </div>
              </div>
              {item.hasChevron && (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
          ))}
        </div>

        {/* Sign Out */}
        <div className="px-4 mb-4">
          <button className="w-full text-left p-4 text-lg font-medium text-gray-900">
            Sign Out
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 pb-8 text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>Believe v2025.4.24</span>
            <button className="underline">Terms</button>
            <button className="underline">Privacy</button>
          </div>
        </div>
      </div>
    </div>
  );
};
