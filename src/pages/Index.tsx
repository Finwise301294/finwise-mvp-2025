
import { useState } from 'react';
import { ExplorePage } from '@/components/ExplorePage';
import { ProfilePage } from '@/components/ProfilePage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'explore' | 'profile'>('explore');

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      {currentPage === 'explore' && (
        <ExplorePage 
          onProfileClick={() => setCurrentPage('profile')}
        />
      )}
      
      {currentPage === 'profile' && (
        <ProfilePage 
          onSettingsClick={() => {}} // Settings now handled within ProfilePage
          onExploreClick={() => setCurrentPage('explore')}
        />
      )}
    </div>
  );
};

export default Index;
