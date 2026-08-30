import { Logo, Wordmark } from '../Logo';
import { BRAND } from '../../lib/brand';
import type { PostData } from '../PostForm';
import { motion, AnimatePresence } from 'framer-motion';

export function IvoryMinimal(data: PostData) {
  const propertyType = data.propertyType || "4 BHK Luxury Villa, Ansal Golf City";
  const location = data.location || "Sushant Golf City, Lucknow";
  const price = data.price || "₹2.5 Cr onwards";
  const highlights = data.highlights && data.highlights.length > 0 ? data.highlights : ["3000 sq.ft", "Corner plot", "Ready to move"];
  
  const fade = (val: string | string[]) => (!val || val.length === 0) ? "opacity-40" : "opacity-100";

  return (
    <div 
      className="bg-[#FAF6F1] text-[#2B2420] p-16 h-[1350px] w-[1080px] flex flex-col justify-between overflow-hidden font-sans border-[12px] border-[#F3EDE5] relative"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-8 mt-12" style={{ transform: 'translateZ(40px)' }}>
        <Logo size={80} variant="ink" />
        <Wordmark size={64} variant="ink" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 w-full px-12" style={{ transform: 'translateZ(60px)' }}>
        {data.photoDataUrl && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-[460px] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(43,36,32,0.1)] mb-4"
          >
            <img src={data.photoDataUrl} className="w-full h-full object-cover" alt="" />
          </motion.div>
        )}
        
        {!data.photoDataUrl && <div className="w-16 h-1 bg-[#B8695A] mb-4"></div>}
        
        <motion.h3 
          key={propertyType}
          initial={data.propertyType ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          className={`text-7xl font-extralight tracking-tight leading-snug px-8 text-[#2B2420] transition-opacity duration-300 ${fade(data.propertyType)}`}
          style={{ textWrap: 'balance' }}
        >
          {propertyType}
        </motion.h3>
        <motion.p 
          key={location}
          initial={data.location ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          className={`text-3xl text-[#7A6A63] uppercase tracking-[0.2em] font-medium transition-opacity duration-300 ${fade(data.location)}`}
          style={{ textWrap: 'balance' }}
        >
          {location}
        </motion.p>
        <motion.h2 
          key={price}
          initial={data.price ? { opacity: 0, scale: 1.1 } : false}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-[9rem] font-bold text-[#2B2420] mt-8 tracking-tighter transition-opacity duration-300 ${fade(data.price)}`}
          style={{ textWrap: 'balance', wordBreak: 'break-word', lineHeight: '0.9' }}
        >
          {price}
        </motion.h2>
      </div>

      {/* Footer Area */}
      <div className="flex flex-col gap-16 items-center w-full" style={{ transform: 'translateZ(40px)' }}>
        {/* Highlights */}
        {highlights.length > 0 && (
          <motion.div className={`flex flex-wrap justify-center gap-4 transition-opacity duration-300 ${fade(data.highlights)}`}>
            <AnimatePresence mode="popLayout">
              {highlights.map((h, i) => (
                <motion.span 
                  key={h + i}
                  initial={data.highlights ? { opacity: 0, y: 10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: data.highlights ? i * 0.1 : 0 }}
                  className="px-8 py-4 bg-[#2B2420]/5 rounded-full text-3xl text-[#2B2420] tracking-wide font-medium"
                >
                  {h}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Contact Footer */}
        <div className="w-full flex justify-between items-center text-3xl text-[#7A6A63] tracking-wide font-medium pb-8 px-8 border-t border-[#2B2420]/10 pt-10">
          <p>{BRAND.contact}</p>
          <p>{BRAND.website}</p>
        </div>
      </div>
    </div>
  );
}
