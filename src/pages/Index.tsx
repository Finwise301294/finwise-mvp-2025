
import { useState } from 'react';
import { ExplorePage } from '@/components/ExplorePage';
import { ProfilePage } from '@/components/ProfilePage';
import { SettingsModal } from '@/components/SettingsModal';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'explore' | 'profile'>('explore');
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      {currentPage === 'explore' && (
        <ExplorePage 
          onProfileClick={() => setCurrentPage('profile')}
        />
      )}
      
      {currentPage === 'profile' && (
        <ProfilePage 
          onSettingsClick={() => setShowSettings(true)}
          onExploreClick={() => setCurrentPage('explore')}
        />
      )}

      {showSettings && (
        <SettingsModal 
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default Index;
