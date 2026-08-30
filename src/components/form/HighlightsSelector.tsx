import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Sparkles } from 'lucide-react';
import type { PostData } from '../PostForm';

const ALL_SUGGESTIONS = [
  "Corner Plot", "Ready to Move", "Under Construction", "Gated Community", 
  "Sea View", "Park Facing", "Vaastu Compliant", "Modular Kitchen", 
  "Private Pool", "Clubhouse Access", "24x7 Security", "Power Backup", 
  "Covered Parking", "Pet Friendly", "Furnished", "Semi-Furnished",
  "1200 sq.ft", "1800 sq.ft", "3000 sq.ft", "5000+ sq.ft"
];

// Heuristics engine
const getSmartSuggestions = (propertyType: string, priceStr: string) => {
  const pType = propertyType.toLowerCase();
  
  // Parse price roughly to Lakhs to determine tier
  let priceLakhs = 50;
  const crMatch = priceStr.match(/₹([\d.]+)\s*Cr/);
  const lMatch = priceStr.match(/₹([\d.]+)\s*Lakh/);
  if (crMatch) priceLakhs = parseFloat(crMatch[1]) * 100;
  else if (lMatch) priceLakhs = parseFloat(lMatch[1]);

  const isLuxury = pType.includes('villa') || pType.includes('penthouse') || pType.includes('farmhouse') || priceLakhs > 200;
  const isBudget = pType.includes('studio') || priceLakhs < 50;
  const isPlot = pType.includes('plot') || pType.includes('land');
  const isCommercial = pType.includes('commercial') || pType.includes('office') || pType.includes('shop');

  let scored = ALL_SUGGESTIONS.map(tag => {
    let score = 0;
    const t = tag.toLowerCase();

    // Plot rules (absolute restrictions)
    if (isPlot) {
      if (t.includes('furnished') || t.includes('kitchen') || t.includes('pool') || t.includes('parking') || t.includes('pet')) {
        return { tag, score: -100 }; // Exclude
      }
      if (t.includes('sq.ft') || t.includes('corner') || t.includes('gated')) score += 10;
    }

    // Commercial rules
    if (isCommercial) {
      if (t.includes('kitchen') || t.includes('pet') || t.includes('vaastu')) return { tag, score: -100 };
      if (t.includes('security') || t.includes('parking') || t.includes('power backup') || t.includes('sq.ft')) score += 10;
    }

    // Luxury rules
    if (isLuxury) {
      if (t.includes('pool') || t.includes('clubhouse') || t.includes('sea view') || t.includes('park facing')) score += 10;
      if (t.includes('5000+ sq.ft') || t.includes('3000 sq.ft')) score += 5;
    }

    // Budget/Studio rules
    if (isBudget) {
      if (t.includes('ready to move') || t.includes('furnished') || t.includes('covered parking')) score += 10;
      if (t.includes('1200 sq.ft') || t.includes('1800 sq.ft')) score += 5;
    }

    // Baseline boosts
    if (t.includes('ready to move') && !isPlot) score += 2;
    
    return { tag, score };
  });

  // Filter out negative scores and sort by score descending
  return scored
    .filter(s => s.score > -50)
    .sort((a, b) => b.score - a.score)
    .map(s => s.tag);
};

interface Props {
  value: string[];
  onChange: (val: string[]) => void;
  context: PostData;
}

export function HighlightsSelector({ value, onChange, context }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from external value
  useEffect(() => {
    if (value && value.length > 0 && !isInitialized) {
      setSelected(value);
      setIsInitialized(true);
    } else if ((!value || value.length === 0) && !isInitialized) {
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  // Sync to external state
  useEffect(() => {
    if (!isInitialized) return;
    onChange(selected);
  }, [selected, isInitialized]);

  const maxHighlights = 5;
  const canAdd = selected.length < maxHighlights;

  const suggestions = getSmartSuggestions(context.propertyType, context.price)
    .filter(tag => !selected.includes(tag))
    .slice(0, 10); // Show top 10 relevant

  const handleAdd = (tag: string) => {
    if (!canAdd) return;
    setSelected([...selected, tag]);
  };

  const handleRemove = (tagToRemove: string) => {
    setSelected(selected.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && customInput.trim()) {
      e.preventDefault();
      const cleaned = customInput.trim().replace(/,/g, '');
      if (cleaned && !selected.includes(cleaned)) {
        handleAdd(cleaned);
      }
      setCustomInput('');
    }
  };

  return (
    <div className="flex flex-col gap-4 relative z-20">
      <div className="flex justify-between items-end">
        <label className="text-xs font-bold text-[#7A6A63] uppercase tracking-widest pl-1">Highlights & Features</label>
        <span className={`text-xs font-bold ${selected.length === maxHighlights ? 'text-[#B8695A]' : 'text-[#7A6A63]'}`}>
          {selected.length} / {maxHighlights} Max
        </span>
      </div>

      {/* Selected Highlights Container */}
      <div className="min-h-[50px] bg-[#FAF6F1] backdrop-blur-sm border border-[#D9CEC0] rounded-xl p-3 flex flex-wrap gap-2 items-center">
        <AnimatePresence mode="popLayout">
          {selected.length === 0 && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="text-[#7A6A63] text-sm italic px-2"
            >
              No highlights selected yet...
            </motion.span>
          )}
          {selected.map((tag) => (
            <motion.div
              key={tag}
              layout
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#B8695A]/20 border border-[#B8695A]/40 text-[#B8695A] rounded-lg text-sm font-medium shadow-[0_2px_10px_rgba(184,105,90,0.15)] group"
            >
              {tag}
              <button 
                onClick={() => handleRemove(tag)}
                className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-[#B8695A]/20 transition-colors opacity-70 group-hover:opacity-100"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Custom Input inside the selected box */}
        {canAdd && (
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type and press Enter..."
            className="flex-1 min-w-[120px] bg-transparent border-none focus:ring-0 text-sm text-[#2B2420] placeholder:text-[#A39994] px-2 py-1 outline-none"
          />
        )}
      </div>

      {/* Smart Suggestions Pool */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#7A6A63] font-bold pl-1">
          <Sparkles className="w-3 h-3 text-[#B8695A]" />
          Smart Suggestions
        </div>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {suggestions.map((tag) => (
              <motion.button
                key={tag}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => handleAdd(tag)}
                disabled={!canAdd}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F3EDE5]/60 hover:bg-[#B8695A]/10 border border-[#D9CEC0] hover:border-[#B8695A]/30 rounded-lg text-sm text-[#7A6A63] hover:text-[#B8695A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-3 h-3" />
                {tag}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
