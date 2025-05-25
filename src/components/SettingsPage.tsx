
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FeedbackModal } from './FeedbackModal';

interface SettingsPageProps {
  onBack: () => void;
}

export const SettingsPage = ({ onBack }: SettingsPageProps) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

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
      title: "Rate Finwise",
      hasChevron: true
    },
    {
      icon: "💬",
      title: "Support",
      hasChevron: true
    },
    {
      icon: "📝",
      title: "Send Feedback",
      hasChevron: true,
      onClick: () => setShowFeedbackModal(true)
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12 bg-neutral">
        <button onClick={onBack} className="p-2">
          <ChevronLeft className="w-6 h-6 text-accent" />
        </button>
        <h1 className="text-2xl font-bold text-accent">Settings</h1>
        <div className="w-10 h-6"></div>
      </div>

      {/* Profile Section */}
      <div className="text-center px-4 mb-8 bg-neutral pt-4 pb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
          <img 
            src="/lovable-uploads/7179a805-1e9a-4986-bf99-5e78cc2b0caa.png" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-accent">Joshua Lei</h2>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-2 mb-8">
        {menuItems.map((item, index) => (
          <button 
            key={index}
            onClick={item.onClick}
            className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-neutral-light transition-colors bg-neutral"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 flex items-center justify-center text-lg">
                {item.icon}
              </div>
              <div className="text-left">
                <div className="text-lg font-medium text-accent">{item.title}</div>
                {item.subtitle && (
                  <div className="text-sm text-neutral-dark">{item.subtitle}</div>
                )}
              </div>
            </div>
            {item.hasChevron && (
              <ChevronRight className="w-5 h-5 text-neutral-dark" />
            )}
          </button>
        ))}
      </div>

      {/* Sign Out */}
      <div className="px-4 mb-4">
        <button className="w-full text-left p-4 text-lg font-medium text-accent bg-neutral rounded-2xl hover:bg-neutral-light transition-colors">
          Sign Out
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 pb-8 text-center">
        <div className="flex items-center justify-center space-x-4 text-sm text-neutral-dark">
          <span>Finwise v2025.4.24</span>
          <button className="underline">Terms</button>
          <button className="underline">Privacy</button>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <FeedbackModal onClose={() => setShowFeedbackModal(false)} />
      )}
    </div>
  );
};
