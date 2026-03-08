import { Music, VolumeX } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface BGMPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function BGMPlayer({ isPlaying, onToggle }: BGMPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with new URL
    const audio = new Audio('https://raw.githubusercontent.com/W4vy0/bgmhill/refs/heads/main/bgm.mp3'); 
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden group ${
          isPlaying 
            ? 'bg-amber-900/80 border-amber-500 text-amber-200' 
            : 'bg-gray-900/80 border-gray-600 text-gray-500'
        }`}
        aria-label={isPlaying ? "Mute Music" : "Play Music"}
      >
        {/* Musical Vibrations (Only when playing) */}
        {isPlaying && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border border-amber-500/30 rounded-full"
                animate={{ 
                  scale: [1, 1.5],
                  opacity: [0.5, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
        
        {/* Icon - Music Note mimicking Violin Bowing */}
        <div className="relative z-10">
          {isPlaying ? (
            <motion.div
              animate={{ 
                rotate: [-10, 10, -10],
                x: [-1, 1, -1]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Music size={20} />
            </motion.div>
          ) : (
            <VolumeX size={20} />
          )}
        </div>
      </motion.button>
      
      {/* Label Tooltip */}
      <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        <span className="text-[10px] font-cinzel text-amber-300 tracking-widest bg-black/80 px-2 py-1 rounded border border-amber-900">
          {isPlaying ? 'PLAYING' : 'MUTED'}
        </span>
      </div>
    </div>
  );
}
