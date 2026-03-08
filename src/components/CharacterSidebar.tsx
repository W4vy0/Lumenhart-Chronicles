import { motion, AnimatePresence } from 'motion/react';
import { Users, X, Sparkles, Heart, Zap } from 'lucide-react';
import { useState } from 'react';
import { CHARACTERS, Character } from '../data/gameData';

export default function CharacterSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-10 left-6 z-40 p-3 bg-black/60 border border-yellow-600/50 rounded-full text-yellow-500 hover:bg-black/80 hover:text-yellow-400 transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(234,179,8,0.2)] ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Users size={20} />
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
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 md:w-96 max-w-[85vw] bg-[#151515] border-r-2 border-yellow-800 z-50 overflow-y-auto custom-scrollbar"
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#151515] p-4 border-b border-yellow-800/50 flex justify-between items-center z-10">
                <h2 className="text-xl font-cinzel font-bold text-yellow-500">Party Members</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Character List */}
              <div className="p-4 space-y-6">
                {CHARACTERS.map((char, index) => (
                  <motion.div
                    key={char.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Character Card */}
                    <div 
                      className={`group cursor-pointer relative overflow-hidden rounded-lg border transition-all duration-300 ${selectedChar?.id === char.id ? 'border-yellow-500 bg-black/60' : 'border-yellow-900/30 bg-black/40 hover:border-yellow-700'}`}
                      onClick={() => setSelectedChar(selectedChar?.id === char.id ? null : char)}
                    >
                      {/* Header Row (Always Visible) */}
                      <div className="flex items-center p-3 gap-4">
                        {/* Small Thumbnail (Visible only when collapsed) */}
                        {selectedChar?.id !== char.id && (
                          <div className="relative w-12 h-12 shrink-0">
                            <img 
                              src={char.imageUrl}
                              alt={char.name}
                              className="w-full h-full object-cover rounded-full border border-yellow-700"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                        
                        {/* Name & Role */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-cinzel font-bold text-sm ${char.color} truncate`}>
                            {char.name}
                          </h3>
                          <p className="text-xs text-gray-400 font-myeongjo">{char.role}</p>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {selectedChar?.id === char.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-3 pt-0">
                              {/* Large Framed Image (1:1 Aspect Ratio) */}
                              <div className="relative w-full aspect-square mb-4 rounded-sm overflow-hidden border-2 border-yellow-800/60 shadow-lg">
                                <img 
                                  src={char.imageUrl}
                                  alt={char.name}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                {/* Frame Decoration */}
                                <div className="absolute inset-0 border-4 border-[#1a1a1a]/50 pointer-events-none"></div>
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500"></div>
                              </div>

                              {/* Stats */}
                              <div className="grid grid-cols-2 gap-2 mb-4">
                                <div className="bg-gray-900/50 p-2 rounded border border-gray-800 flex items-center gap-2">
                                  <Heart size={12} className="text-red-400" />
                                  <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500">HP</span>
                                    <span className="text-xs font-mono text-gray-200">{char.stats.sp}/100</span>
                                  </div>
                                </div>
                                <div className="bg-gray-900/50 p-2 rounded border border-gray-800 flex items-center gap-2">
                                  <Zap size={12} className="text-blue-400" />
                                  <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500">MP</span>
                                    <span className="text-xs font-mono text-gray-200">{char.stats.mp}/100</span>
                                  </div>
                                </div>
                              </div>

                              {/* Description */}
                              <div className="space-y-3 bg-black/20 p-3 rounded border border-white/5">
                                <div>
                                  <span className="text-yellow-600 font-bold block mb-1 text-[10px] font-cinzel">PERSONALITY</span>
                                  <p className="text-xs text-gray-300 font-myeongjo leading-relaxed">
                                    {char.description}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-yellow-600 font-bold block mb-2 text-[10px] font-cinzel">APPEARANCE</span>
                                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs font-myeongjo">
                                    <div className="text-gray-500">Hair</div>
                                    <div className="text-gray-300 text-right">{char.appearance.hairColor}</div>
                                    
                                    <div className="text-gray-500">Eyes</div>
                                    <div className="text-gray-300 text-right">{char.appearance.eyeColor}</div>
                                    
                                    <div className="text-gray-500">Height</div>
                                    <div className="text-gray-300 text-right">{char.appearance.height}</div>
                                    
                                    <div className="text-gray-500">Body</div>
                                    <div className="text-gray-300 text-right">{char.appearance.bodyType}</div>
                                    
                                    <div className="col-span-2 mt-1 pt-1 border-t border-white/5 flex justify-between">
                                      <span className="text-gray-500">Outfit</span>
                                      <span className="text-gray-300 text-right max-w-[60%] truncate">{char.appearance.outfit}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Footer Decoration */}
              <div className="p-4 text-center">
                <div className="w-8 h-8 mx-auto text-yellow-800 opacity-50">
                  <Sparkles size={32} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
