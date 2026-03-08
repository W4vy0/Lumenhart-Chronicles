import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isReady, setIsReady] = useState(false);
  const [eyeState, setEyeState] = useState<'closed' | 'opening' | 'open'>('closed');

  // Simulate loading and eye blinking sequence
  useEffect(() => {
    // Extended blinking sequence (approx 10s)
    const sequence = async () => {
      // Phase 1: Deep sleep (2s)
      await new Promise(r => setTimeout(r, 2000));
      
      // Phase 2: First stir (1s)
      setEyeState('opening'); // Slight open
      await new Promise(r => setTimeout(r, 200));
      setEyeState('closed'); // Close immediately
      
      // Phase 3: Trying to open (3s)
      await new Promise(r => setTimeout(r, 1500));
      setEyeState('opening'); 
      await new Promise(r => setTimeout(r, 500));
      setEyeState('closed');
      await new Promise(r => setTimeout(r, 1000));
      
      // Phase 4: Almost there (2s)
      setEyeState('opening');
      await new Promise(r => setTimeout(r, 1000));
      setEyeState('closed');
      await new Promise(r => setTimeout(r, 500));
      
      // Phase 5: Awakening (2s)
      setEyeState('open'); // Fully open
      await new Promise(r => setTimeout(r, 1500));
      
      // Ready state triggers the lore text and button
      setIsReady(true);
    };
    
    sequence();
  }, []);

  // Eyelid animation variants
  const eyelidVariants = {
    closed: { height: "50%" },
    opening: { height: "35%" },
    open: { height: "0%" }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      {/* World Background (Visible when eyes open) */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[url('https://i.postimg.cc/rygGcXL4/1.png')] bg-cover bg-center opacity-30 blur-sm scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center p-8 text-center max-w-2xl w-full">
        
        {/* Wake Up Text - Blinks with eyes, visible DURING the sequence */}
        <motion.div
          animate={{ 
            opacity: eyeState === 'closed' ? 0.3 : 1,
            scale: eyeState === 'closed' ? 0.95 : 1,
            filter: eyeState === 'closed' ? 'blur(4px)' : 'blur(0px)'
          }}
          transition={{ duration: 0.2 }}
          className="mb-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
        >
          {!isReady && (
            <h1 className="text-3xl md:text-5xl font-myeongjo font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              "깨어나세요, 용사여..."
            </h1>
          )}
        </motion.div>

        {/* World Lore & Enter Button - Only visible AFTER sequence (isReady) */}
        <AnimatePresence>
          {isReady && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center w-full max-w-lg"
            >
              {/* Login / System Interface Container */}
              <div className="w-full bg-black/60 border border-yellow-600/30 p-1 rounded-lg backdrop-blur-md shadow-[0_0_30px_rgba(234,179,8,0.1)]">
                {/* Header Bar */}
                <div className="bg-yellow-900/20 border-b border-yellow-600/30 p-2 flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono text-yellow-500/70">SYSTEM: CONNECTED</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/30"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/10"></div>
                  </div>
                </div>

                {/* Lore Content */}
                <div className="px-6 py-4 text-center">
                  <h3 className="text-yellow-500 font-cinzel text-sm tracking-[0.3em] uppercase mb-6 border-b border-yellow-500/20 pb-2 inline-block">
                    World Synchronization
                  </h3>
                  
                  <div className="space-y-4 mb-8">
                    <p className="text-gray-200 font-myeongjo leading-loose text-sm md:text-base drop-shadow-md">
                      마왕의 위협이 드리운<br/>
                      <span className="text-yellow-200">루멘하르트 왕국.</span>
                    </p>
                    <p className="text-gray-300 font-myeongjo leading-loose text-sm md:text-base">
                      왕립 마도 의뢰청의 부름을<br/>
                      받은 당신은...
                    </p>
                    <p className="text-gray-300 font-myeongjo leading-loose text-sm md:text-base">
                      네 명의 치유 마법사들과 함께<br/>
                      운명의 소용돌이 속으로<br/>
                      걸어 들어갑니다.
                    </p>
                  </div>

                  {/* Login Button */}
                  <button
                    onClick={onComplete}
                    className="w-full group relative px-8 py-3 bg-yellow-900/20 border border-yellow-600/50 hover:bg-yellow-900/40 hover:border-yellow-500 transition-all duration-300 rounded-sm overflow-hidden"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="font-cinzel text-lg text-yellow-500 tracking-widest group-hover:text-yellow-200 transition-colors">
                        LOGIN TO WORLD
                      </span>
                    </div>
                    
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000"></div>
                  </button>
                </div>
                
                {/* Footer Status */}
                <div className="bg-black/40 p-2 text-center border-t border-yellow-600/20">
                  <span className="text-[10px] font-mono text-gray-500">v1.0.0 | SERVER: LUMENHART_ASIA</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Eyelids Overlay */}
      {/* Top Eyelid */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-black z-20"
        initial="closed"
        animate={eyeState}
        variants={eyelidVariants}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent"></div>
      </motion.div>
      
      {/* Bottom Eyelid */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-black z-20"
        initial="closed"
        animate={eyeState}
        variants={eyelidVariants}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black to-transparent"></div>
      </motion.div>

      {/* Vignette for "Blurry Vision" effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-10 backdrop-blur-[2px]"
        animate={{ opacity: eyeState === 'open' ? 0 : 1 }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
};

export default LoadingScreen;
