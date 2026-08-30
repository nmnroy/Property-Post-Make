import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export function PriceSlider({ value, onChange }: Props) {
  // We'll use 0-100 for the internal range slider
  const [sliderValue, setSliderValue] = useState(50);
  const [isOnwards, setIsOnwards] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Map 0-100 to 20(L) to 1000(L) [10 Cr] logarithmically
  const min = 20;
  const max = 1000;

  const calculatePriceLakhs = (pct: number) => {
    // Math.pow(max/min, pct/100)
    if (pct === 0) return min;
    if (pct === 100) return max;
    return min * Math.pow(max / min, pct / 100);
  };

  const formatPrice = (lakhs: number, isMax: boolean) => {
    if (isMax) return '₹10 Cr+';
    if (lakhs < 100) {
      // Round to nearest 1 Lakh
      return `₹${Math.round(lakhs)} Lakh`;
    } else {
      // Round to nearest 0.01 Cr
      const cr = lakhs / 100;
      // Truncate cleanly (e.g. 1.20 -> 1.2, 1.00 -> 1)
      const formatted = Number(cr.toFixed(2)).toString();
      return `₹${formatted} Cr`;
    }
  };

  // Reverse mapping for initialization
  const calculatePercentage = (lakhs: number) => {
    if (lakhs <= min) return 0;
    if (lakhs >= max) return 100;
    // log(lakhs/min) / log(max/min) = pct/100
    return (Math.log(lakhs / min) / Math.log(max / min)) * 100;
  };

  // Parse external string on init
  const lastEmittedRef = useRef<string>('');

  // Parse external string on init or when explicitly overridden by parent
  useEffect(() => {
    if (!value) {
      if (!isInitialized) setIsInitialized(true);
      return;
    }

    // If the incoming value exactly matches what we last sent up, ignore it to prevent loops
    if (isInitialized && value === lastEmittedRef.current) {
      return;
    }

    setIsOnwards(value.includes('onwards'));
    
    let lakhs = 50; // default
    const crMatch = value.match(/₹([\d.]+)\s*Cr/);
    const lMatch = value.match(/₹([\d.]+)\s*Lakh/);
    
    if (crMatch) {
      lakhs = parseFloat(crMatch[1]) * 100;
    } else if (lMatch) {
      lakhs = parseFloat(lMatch[1]);
    }
    
    setSliderValue(calculatePercentage(lakhs));
    setIsInitialized(true);
  }, [value, isInitialized]);

  const currentLakhs = calculatePriceLakhs(sliderValue);
  const formattedString = formatPrice(currentLakhs, sliderValue === 100);
  const finalOutput = `${formattedString}${isOnwards ? ' onwards' : ''}`;

  useEffect(() => {
    if (!isInitialized) return;
    lastEmittedRef.current = finalOutput;
    onChange(finalOutput);
  }, [sliderValue, isOnwards, isInitialized]); // We compute from state directly

  return (
    <div className="flex flex-col gap-5 relative z-30 bg-[#F3EDE5]/60 p-5 rounded-2xl border border-[#D9CEC0]">
      
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <label className="text-xs font-bold text-[#7A6A63] uppercase tracking-widest pl-1 mb-1">Price Range</label>
          <div className="flex items-baseline gap-2 relative h-10 w-48">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={formattedString} // Animate when the string changes
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, position: 'absolute' }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="text-3xl font-bold text-[#2B2420]"
              >
                {formattedString}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <button 
          onClick={() => setIsOnwards(!isOnwards)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            isOnwards ? 'bg-[#B8695A]/20 text-[#B8695A] border border-[#B8695A]/30' : 'bg-[#FAF6F1] text-[#7A6A63] border border-[#D9CEC0] hover:text-[#2B2420]'
          }`}
        >
          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isOnwards ? 'border-[#B8695A] bg-[#B8695A]' : 'border-gray-400'}`}>
            {isOnwards && <Check className="w-3 h-3 text-[#FAF6F1]" />}
          </div>
          'Onwards'
        </button>
      </div>

      <div className="relative h-6 flex items-center group mt-2">
        {/* Native range slider for accessibility and pure interaction */}
        <input 
          type="range"
          min="0"
          max="100"
          step="any"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
        />
        
        {/* Custom Track Background */}
        <div className="w-full h-2 bg-[#D9CEC0] rounded-full overflow-hidden relative z-0">
          {/* Custom Track Fill */}
          <motion.div 
            className="h-full bg-gradient-to-r from-[#B8695A] to-[#E8C9BE]"
            style={{ width: `${sliderValue}%` }}
            layout
          />
        </div>

        {/* Custom Thumb */}
        <motion.div 
          className="absolute h-5 w-5 bg-[#FAF6F1] rounded-full shadow-[0_0_10px_rgba(184,105,90,0.3)] border-2 border-[#B8695A] z-10 flex items-center justify-center pointer-events-none group-active:scale-125 transition-transform duration-200"
          style={{ left: `calc(${sliderValue}% - 10px)` }}
          layout
        >
          <div className="w-1.5 h-1.5 bg-[#B8695A] rounded-full opacity-0 group-active:opacity-100 transition-opacity" />
          {/* Thumb Glow on drag */}
          <div className="absolute inset-0 bg-[#B8695A]/30 rounded-full blur-md opacity-0 group-active:opacity-100 transition-opacity scale-150" />
        </motion.div>
      </div>
      
      {/* Scale Labels */}
      <div className="flex justify-between text-[10px] text-[#7A6A63] font-bold tracking-wider px-1">
        <span>20 LAKH</span>
        <span>10 CR+</span>
      </div>

    </div>
  );
}
