import { Logo, Wordmark } from '../Logo';
import { BRAND } from '../../lib/brand';
import type { PostData } from '../PostForm';
import { motion, AnimatePresence } from 'framer-motion';

export function SunsetBold(data: PostData) {
  const propertyType = data.propertyType || "4 BHK Luxury Villa, Ansal Golf City";
  const location = data.location || "Sushant Golf City, Lucknow";
  const price = data.price || "₹2.5 Cr onwards";
  const highlights = data.highlights && data.highlights.length > 0 ? data.highlights : ["3000 sq.ft", "Corner plot", "Ready to move"];
  
  const fade = (val: string | string[]) => (!val || val.length === 0) ? "opacity-40" : "opacity-100";

  return (
    <div 
      className="text-[#FAF6F1] p-16 h-[1350px] w-[1080px] flex flex-col justify-between overflow-hidden relative font-sans"
      style={{
        background: data.photoDataUrl ? 'none' : 'linear-gradient(145deg, #B8695A 0%, rgba(138,62,49,0.9) 100%)',
        backgroundColor: data.photoDataUrl ? '#000' : '#B8695A',
        transformStyle: 'preserve-3d'
      }}
    >
      {data.photoDataUrl && (
        <>
          <img src={data.photoDataUrl} className="absolute inset-0 w-full h-full object-cover z-0" alt="Property" />
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#B8695A]/80 to-[#8A3E31]/95 mix-blend-multiply" />
          <div className="absolute inset-0 z-0 bg-[#B8695A]/30" />
        </>
      )}
      {/* Header */}
      <div className="flex items-center justify-start gap-8 relative z-10" style={{ transform: 'translateZ(40px)' }}>
        <Logo size={72} variant="ivory" />
        <Wordmark size={72} variant="ivory" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center mt-12 relative z-10 px-8" style={{ transform: 'translateZ(60px)' }}>
        <div className="bg-[#FAF6F1]/20 backdrop-blur-md border border-[#FAF6F1]/30 p-16 rounded-[3rem] shadow-2xl flex flex-col gap-10">
          <motion.h2 
            key={price}
            initial={data.price ? { opacity: 0, x: 20 } : false}
            animate={{ opacity: 1, x: 0 }}
            className={`text-[10rem] font-black tracking-tighter text-[#FAF6F1] leading-none drop-shadow-xl transition-opacity duration-300 ${fade(data.price)}`}
            style={{ textWrap: 'balance', wordBreak: 'break-word' }}
          >
            {price}
          </motion.h2>
          
          <div className="flex flex-col gap-6">
            <motion.h3 
              key={propertyType}
              initial={data.propertyType ? { opacity: 0, x: -20 } : false}
              animate={{ opacity: 1, x: 0 }}
              className={`text-7xl font-bold leading-tight text-[#FAF6F1] drop-shadow-md transition-opacity duration-300 ${fade(data.propertyType)}`}
              style={{ textWrap: 'balance' }}
            >
              {propertyType}
            </motion.h3>
            <motion.p 
              key={location}
              initial={data.location ? { opacity: 0, x: -20 } : false}
              animate={{ opacity: 1, x: 0 }}
              className={`text-4xl text-[#2B2420] font-bold uppercase tracking-widest transition-opacity duration-300 ${fade(data.location)}`}
              style={{ textWrap: 'balance' }}
            >
              {location}
            </motion.p>
          </div>
          
          {/* Highlights */}
          {highlights.length > 0 && (
            <motion.div className={`flex flex-wrap gap-4 mt-8 transition-opacity duration-300 ${fade(data.highlights)}`}>
              <AnimatePresence mode="popLayout">
                {highlights.map((h, i) => (
                  <motion.span 
                    key={h + i}
                    initial={data.highlights ? { opacity: 0, scale: 0 } : false}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: 'spring', bounce: 0.5, delay: data.highlights ? i * 0.1 : 0 }}
                    className="px-8 py-4 bg-[#2B2420] text-[#FAF6F1] font-black rounded-full text-3xl tracking-wide shadow-lg"
                  >
                    {h}
                  </motion.span>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer Area */}
      <div className="flex justify-between items-center text-4xl font-bold tracking-wider text-[#FAF6F1] relative z-10 pb-4 px-8 mt-12 opacity-90" style={{ transform: 'translateZ(40px)' }}>
        <p className="drop-shadow-md">{BRAND.contact}</p>
        <p className="drop-shadow-md">{BRAND.website}</p>
      </div>
    </div>
  );
}
