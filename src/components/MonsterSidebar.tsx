import { motion, AnimatePresence } from 'motion/react';
import { Skull, X, Sword, Shield, Crown } from 'lucide-react';
import { useState } from 'react';
import { MONSTERS } from '../data/gameData';

interface MonsterSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MonsterSidebar({ isOpen, onToggle }: MonsterSidebarProps) {
  // Group monsters by rank
  const generalMonsters = MONSTERS.filter(m => m.rank === 'General');
  const midBosses = MONSTERS.filter(m => m.rank === 'Mid-Boss');
  const bosses = MONSTERS.filter(m => m.rank === 'Boss');

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed top-10 left-20 z-40 p-3 bg-black/60 border border-red-900/50 rounded-full text-red-500 hover:bg-black/80 hover:text-red-400 transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(220,38,38,0.2)] ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        title="Bestiary"
      >
        <Skull size={20} />
      </button>

      {/* Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 md:w-96 max-w-[85vw] bg-[#1a0f0f] border-l-2 border-red-900 z-50 overflow-y-auto custom-scrollbar"
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#1a0f0f] p-4 border-b border-red-900/50 flex justify-between items-center z-10">
                <h2 className="text-xl font-cinzel font-bold text-red-500 flex items-center gap-2">
                  <Skull size={24} />
                  Bestiary
                </h2>
                <button
                  onClick={onToggle}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Monster List */}
              <div className="p-4 space-y-8">
                
                {/* General Monsters */}
                <section>
                  <h3 className="text-gray-400 font-cinzel text-sm border-b border-gray-800 pb-2 mb-4 flex items-center gap-2">
                    <Sword size={14} /> General Monsters
                  </h3>
                  <div className="space-y-4">
                    {generalMonsters.map((monster) => (
                      <div key={monster.id} className="bg-black/40 border border-gray-800 p-3 rounded hover:border-gray-600 transition-colors">
                        <h4 className="text-gray-200 font-bold font-myeongjo mb-1">{monster.name}</h4>
                        <p className="text-xs text-gray-400 font-myeongjo leading-relaxed">{monster.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Mid Bosses */}
                <section>
                  <h3 className="text-orange-400 font-cinzel text-sm border-b border-orange-900/30 pb-2 mb-4 flex items-center gap-2">
                    <Shield size={14} /> Mid-Bosses
                  </h3>
                  <div className="space-y-4">
                    {midBosses.map((monster) => (
                      <div key={monster.id} className="bg-black/40 border border-orange-900/30 p-3 rounded hover:border-orange-700/50 transition-colors">
                        <h4 className="text-orange-200 font-bold font-myeongjo mb-1">{monster.name}</h4>
                        <p className="text-xs text-gray-400 font-myeongjo leading-relaxed">{monster.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Bosses */}
                <section>
                  <h3 className="text-red-500 font-cinzel text-sm border-b border-red-900/30 pb-2 mb-4 flex items-center gap-2">
                    <Crown size={14} /> Bosses
                  </h3>
                  <div className="space-y-4">
                    {bosses.map((monster) => (
                      <div key={monster.id} className="bg-red-950/10 border border-red-900/50 p-4 rounded hover:bg-red-950/20 transition-colors relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                          <Skull size={48} className="text-red-500" />
                        </div>
                        <h4 className="text-red-400 font-bold font-myeongjo mb-1 text-lg">{monster.name}</h4>
                        <p className="text-sm text-gray-300 font-myeongjo leading-relaxed relative z-10">{monster.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
