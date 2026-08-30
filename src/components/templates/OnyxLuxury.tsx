import { Logo, Wordmark } from '../Logo';
import { BRAND } from '../../lib/brand';
import type { PostData } from '../PostForm';
import { motion, AnimatePresence } from 'framer-motion';

export function OnyxLuxury(data: PostData) {
  const propertyType = data.propertyType || "4 BHK Luxury Villa, Ansal Golf City";
  const location = data.location || "Sushant Golf City, Lucknow";
  const price = data.price || "₹2.5 Cr onwards";
  const highlights = data.highlights && data.highlights.length > 0 ? data.highlights : ["3000 sq.ft", "Corner plot", "Ready to move"];
  
  const fade = (val: string | string[]) => (!val || val.length === 0) ? "opacity-40" : "opacity-100";

  return (
    <div 
      className="text-[#FAF6F1] p-16 h-[1350px] w-[1080px] flex flex-col justify-between overflow-hidden relative font-sans"
      style={{ transformStyle: 'preserve-3d', backgroundColor: data.photoDataUrl ? '#000' : '#2B2420' }}
    >
      {data.photoDataUrl && (
        <>
          <img src={data.photoDataUrl} className="absolute inset-0 w-full h-full object-cover z-0" alt="Property" />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#2B2420] via-[#2B2420]/90 to-[#2B2420]/40 mix-blend-multiply" />
          <div className="absolute inset-0 z-0 bg-[#2B2420]/60" />
        </>
      )}

      {/* Header */}
      <div className="flex items-center gap-6 relative z-10" style={{ transform: 'translateZ(40px)' }}>
        <Logo size={64} variant="clay" />
        <Wordmark size={64} variant="clay" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center px-12 gap-12 mt-16 relative z-10" style={{ transform: 'translateZ(60px)' }}>
        {/* Location & Property Type */}
        <div className="flex flex-col gap-4">
          <motion.p 
            key={location}
            initial={data.location ? { opacity: 0, x: -20 } : false}
            animate={{ opacity: 1, x: 0 }}
            className={`text-4xl text-[#B8695A] uppercase tracking-[0.2em] transition-opacity duration-300 ${fade(data.location)}`}
            style={{ textWrap: 'balance' }}
          >
            {location}
          </motion.p>
          <div className="w-24 h-[1px] bg-[#B8695A]/50 my-2"></div>
          <motion.h3 
            key={propertyType}
            initial={data.propertyType ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            className={`text-7xl font-light leading-snug transition-opacity duration-300 ${fade(data.propertyType)}`}
            style={{ textWrap: 'balance' }}
          >
            {propertyType}
          </motion.h3>
        </div>

        {/* Price */}
        <div className="mt-8">
          <motion.h2 
            key={price}
            initial={data.price ? { opacity: 0, scale: 0.9, y: 20 } : false}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className={`text-[9.5rem] font-serif font-medium text-[#B8695A] leading-none tracking-tighter drop-shadow-sm transition-opacity duration-300 ${fade(data.price)}`}
            style={{ textWrap: 'balance', wordBreak: 'break-word', lineHeight: '0.9' }}
          >
            {price}
          </motion.h2>
        </div>
      </div>

      {/* Footer Area */}
      <div className="flex flex-col gap-10 mt-auto relative z-10" style={{ transform: 'translateZ(40px)' }}>
        {/* Highlights */}
        {highlights.length > 0 && (
          <motion.div 
            className={`flex flex-wrap gap-4 transition-opacity duration-300 ${fade(data.highlights)}`}
          >
            <AnimatePresence mode="popLayout">
              {highlights.map((h, i) => (
                <motion.span 
                  key={h + i}
                  initial={data.highlights ? { opacity: 0, scale: 0.8 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: data.highlights ? i * 0.1 : 0 }}
                  className="px-8 py-4 rounded-full text-3xl text-[#B8695A] border border-[#B8695A] tracking-wide"
                >
                  {h}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="w-full h-[1px] bg-[#B8695A]/30 mt-6"></div>

        {/* Contact Footer */}
        <div className="flex justify-between items-center text-3xl text-[#B8695A] tracking-wider font-light pb-4">
          <p>{BRAND.contact}</p>
          <p>{BRAND.website}</p>
        </div>
      </div>
    </div>
  );
}
