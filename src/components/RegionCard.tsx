import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Skull } from 'lucide-react';
import { Region } from '../data/gameData';

interface RegionCardProps {
  region: Region | null;
  onClose: () => void;
  onOpenMonsterSidebar: () => void;
}

export default function RegionCard({ region, onClose, onOpenMonsterSidebar }: RegionCardProps) {
  return (
    <AnimatePresence>
      {region && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-96 z-30"
        >
          <div className="relative bg-[#1a1a1a] border-2 border-yellow-700 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-500 z-10"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500 z-10"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500 z-10"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-500 z-10"></div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 z-20 p-1 text-gray-400 hover:text-white bg-black/50 rounded-full"
            >
              <X size={20} />
            </button>

            {/* Image Header */}
            <div className="h-32 w-full relative overflow-hidden">
              <img
                src={region.imageUrl}
                alt={region.name}
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
              <div className="absolute bottom-2 left-4">
                <h3 className="text-xl font-cinzel font-bold text-yellow-500 drop-shadow-md flex items-center gap-2">
                  <MapPin size={16} />
                  {region.name}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 pt-2">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-800 to-transparent mb-3"></div>
              <p className="text-gray-300 font-myeongjo text-sm leading-relaxed">
                {region.description}
              </p>
              
              <div className="mt-4 flex justify-between items-center">
                {region.id === 'castle' ? (
                  <button 
                    onClick={onOpenMonsterSidebar}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-cinzel text-red-500 border border-red-900/50 hover:bg-red-950/30 transition-colors rounded-sm"
                  >
                    <Skull size={14} />
                    MONSTERS
                  </button>
                ) : (
                  <div></div> // Spacer
                )}
              </div>

              {/* Status & Quest Info */}
              {(region.currentQuest || region.status) && (
                <div className="mt-4 pt-3 border-t border-yellow-900/30">
                  {region.status && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-yellow-600 font-cinzel">STATUS:</span>
                      <span className="text-xs text-yellow-400/80 font-myeongjo">{region.status}</span>
                    </div>
                  )}
                  {region.currentQuest && (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-yellow-600 font-cinzel">CURRENT QUEST:</span>
                      <span className="text-xs text-white/90 font-myeongjo bg-yellow-900/20 p-2 rounded border border-yellow-900/30">
                        {region.currentQuest}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
