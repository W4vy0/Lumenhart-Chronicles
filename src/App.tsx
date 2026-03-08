/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import LoadingScreen from './components/LoadingScreen';
import WorldMap from './components/WorldMap';
import CharacterSidebar from './components/CharacterSidebar';
import MonsterSidebar from './components/MonsterSidebar';
import RegionCard from './components/RegionCard';
import BGMPlayer from './components/BGMPlayer';
import { Region } from './data/gameData';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [isMonsterSidebarOpen, setIsMonsterSidebarOpen] = useState(false);

  const handleEnterWorld = () => {
    setIsLoading(false);
    setIsPlaying(true); // Try to auto-play on first interaction
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={handleEnterWorld} />
        ) : (
          <div key="main" className="relative w-full h-full">
            {/* Background Music Player */}
            <BGMPlayer isPlaying={isPlaying} onToggle={() => setIsPlaying(!isPlaying)} />

            {/* Character Sidebar (Top Left Toggle) */}
            <CharacterSidebar />

            {/* Monster Sidebar (Top Right Toggle) */}
            <MonsterSidebar 
              isOpen={isMonsterSidebarOpen} 
              onToggle={() => setIsMonsterSidebarOpen(!isMonsterSidebarOpen)} 
            />

            {/* Main World Map */}
            <WorldMap 
              onRegionSelect={setSelectedRegion} 
              selectedRegion={selectedRegion} 
            />

            {/* Region Info Card (Bottom Overlay) */}
            <RegionCard 
              region={selectedRegion} 
              onClose={() => setSelectedRegion(null)} 
              onOpenMonsterSidebar={() => setIsMonsterSidebarOpen(true)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
