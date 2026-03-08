import { motion } from 'motion/react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { REGIONS, Region } from '../data/gameData';

interface WorldMapProps {
  onRegionSelect: (region: Region) => void;
  selectedRegion: Region | null;
}

const NEWS_ITEMS = [
  "소식통: 용사 파티가 왕립 마도청에 도착했다는 소문입니다.",
  "속보: 고대 던전에서 정체불명의 마력이 감지되었습니다.",
  "알림: 비밀의 숲에서 희귀 약초가 대량 발견되었습니다.",
  "소문: 달빛 여관의 새로운 메뉴 '드래곤 스테이크'가 인기라네요.",
  "경고: 마왕성 주변의 안개가 더욱 짙어지고 있습니다.",
  "축제: 시작의 마을에서 봄맞이 축제가 열릴 예정입니다."
];

export default function WorldMap({ onRegionSelect, selectedRegion }: WorldMapProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState<{ x: number | string, y: number | string }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random stars for background - use useMemo for stability
  const stars = useMemo(() => Array.from({ length: 50 }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    isSparkle: Math.random() > 0.8 // 20% chance to be a sparkle icon
  })), []);

  // Generate constellation lines (connecting nearby stars) - use useMemo
  const constellations = useMemo(() => {
    const lines: { x1: string; y1: string; x2: string; y2: string; opacity: number }[] = [];
    // Create a few random connections
    for (let i = 0; i < 10; i++) {
      const start = Math.floor(Math.random() * stars.length);
      const end = Math.floor(Math.random() * stars.length);
      if (start !== end) {
        lines.push({
          x1: stars[start].left,
          y1: stars[start].top,
          x2: stars[end].left,
          y2: stars[end].top,
          opacity: Math.random() * 0.3 + 0.1
        });
      }
    }
    return lines;
  }, [stars]);

  // Handle region click to zoom and pan
  const handleMarkerClick = (region: Region) => {
    onRegionSelect(region);
    
    // Calculate position to center the marker
    // Map is 100% x 100%. Markers are at region.x% and region.y%
    // We want to move the map so that (region.x, region.y) is at the center of the viewport
    
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      // Target scale for zoom
      const targetScale = 2.5;
      
      // Calculate displacement to center the target point
      // The map scales from the center (50% 50%)
      // We need to move the map so the target point ends up at the viewport center
      // Formula: (Center - Target) * Scale
      
      const offsetX = 50 - region.x;
      const offsetY = 50 - region.y;
      
      // We use percentage strings for responsiveness
      const moveX = `${offsetX * targetScale}%`;
      const moveY = `${offsetY * targetScale}%`;
      
      setScale(targetScale);
      setPosition({ x: moveX as any, y: moveY as any });
    }
  };

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Reset view when deselecting (if handled externally) or clicking background
  useEffect(() => {
    if (!selectedRegion) {
      resetView();
    }
  }, [selectedRegion]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-[#0a0a0a] cursor-move active:cursor-grabbing"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onRegionSelect(null as any); // Type hack for quick reset
        }
      }}
    >
      {/* Animated Background Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Nebulae */}
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-purple-900/20 blur-[100px]"
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] rounded-full bg-blue-900/20 blur-[100px]"
        />
        
        {/* Stars and Constellations */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          {constellations.map((line, i) => (
            <motion.line
              key={`line-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="white"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [line.opacity, line.opacity * 2, line.opacity] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            />
          ))}
        </svg>

        {stars.map((star, i) => (
          <motion.div
            key={i}
            className={`absolute ${star.isSparkle ? 'text-yellow-100' : 'bg-white rounded-full'}`}
            style={{
              left: star.left,
              top: star.top,
              width: star.isSparkle ? 'auto' : star.size,
              height: star.isSparkle ? 'auto' : star.size,
            }}
            animate={{ 
              opacity: [0.2, 1, 0.2],
              scale: star.isSparkle ? [0.8, 1.2, 0.8] : [1, 1, 1]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
          >
            {star.isSparkle && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      {/* Map Layer */}
      <motion.div
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        animate={{ 
          scale: scale,
          x: position.x,
          y: position.y
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Map Image Container - Updated to 10:16 aspect ratio */}
        <div className="relative h-full max-h-[90vh] aspect-[10/16] shadow-2xl">
          {/* Base Map Texture - Thinner border */}
          <div className="absolute inset-0 bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#3a2a1a]/50">
            {/* Actual Map Image */}
            <div className="w-full h-full bg-[url('https://i.postimg.cc/2593jZYY/Kakao-Talk-20260309-000654107.png')] bg-cover bg-center"></div>
            
            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.3)_100%)] pointer-events-none"></div>
          </div>

          {/* Region Markers */}
          {REGIONS.map((region) => {
            // Determine pin colors based on region ID
            let colors = {
              pulse: 'bg-yellow-500/30',
              glow: 'bg-yellow-400/20',
              glowActive: 'bg-yellow-400/40',
              core: 'bg-yellow-100',
              coreBorder: 'border-yellow-600',
              coreActiveBorder: 'border-yellow-400',
              text: 'text-yellow-500',
              border: 'border-yellow-900/50'
            };

            if (region.id === 'castle') {
              colors = {
                pulse: 'bg-red-500/30',
                glow: 'bg-red-500/20',
                glowActive: 'bg-red-500/40',
                core: 'bg-red-100',
                coreBorder: 'border-red-600',
                coreActiveBorder: 'border-red-500',
                text: 'text-red-500',
                border: 'border-red-900/50'
              };
            } else if (region.id === 'forest') {
              colors = {
                pulse: 'bg-emerald-500/30',
                glow: 'bg-emerald-500/20',
                glowActive: 'bg-emerald-500/40',
                core: 'bg-emerald-100',
                coreBorder: 'border-emerald-600',
                coreActiveBorder: 'border-emerald-500',
                text: 'text-emerald-500',
                border: 'border-emerald-900/50'
              };
            }

            return (
              <div
                key={region.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${region.x}%`, top: `${region.y}%` }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkerClick(region);
                  }}
                  className="group relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10"
                >
                  {/* Pulse Effect */}
                  <div className={`absolute inset-0 rounded-full animate-ping ${colors.pulse}`}></div>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-full blur-md transition-all duration-500 ${selectedRegion?.id === region.id ? `scale-150 ${colors.glowActive}` : `group-hover:scale-125 ${colors.glow}`}`}></div>
                  
                  {/* Pin Core */}
                  <div className={`relative w-3 h-3 md:w-4 md:h-4 rounded-full border-2 shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 ${selectedRegion?.id === region.id ? `bg-white scale-125 ${colors.coreActiveBorder}` : `${colors.core} ${colors.coreBorder} group-hover:bg-white`}`}></div>
                  
                  {/* Label (Only visible on hover or select) */}
                  <div className={`absolute top-full mt-2 whitespace-nowrap pointer-events-none transition-all duration-300 ${selectedRegion?.id === region.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                    <span className={`px-2 py-1 bg-black/80 text-xs font-cinzel border rounded shadow-lg backdrop-blur-sm ${colors.text} ${colors.border}`}>
                      {region.name}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Vignette Overlay for atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0.9)_100%)]"></div>
      
      {/* Decorative Border Frame */}
      <div className="absolute inset-0 pointer-events-none border border-yellow-900/30"></div>
      <div className="absolute top-4 left-6 text-white/20 font-cinzel text-xs tracking-[0.5em] pointer-events-none">LUMENHART KINGDOM</div>

      {/* Scrolling News Ticker */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/80 border-t border-yellow-900/50 backdrop-blur-md z-20 overflow-hidden flex items-center">
        <div className="whitespace-nowrap animate-marquee flex items-center gap-8 text-xs font-myeongjo text-yellow-500/80 px-4">
          {NEWS_ITEMS.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-700"></span>
              {item}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {NEWS_ITEMS.map((item, index) => (
            <span key={`dup-${index}`} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-700"></span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
