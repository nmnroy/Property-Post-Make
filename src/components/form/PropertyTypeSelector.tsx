import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Home, Hotel, Warehouse, Trees, Briefcase, Store, ChevronDown } from 'lucide-react';

const PROPERTY_TYPES = [
  { id: 'apartment', name: 'Apartment/Flat', icon: Building2, type: 'residential' },
  { id: 'villa', name: 'Villa', icon: Home, type: 'residential' },
  { id: 'house', name: 'Independent House', icon: Home, type: 'residential' },
  { id: 'penthouse', name: 'Penthouse', icon: Hotel, type: 'residential' },
  { id: 'studio', name: 'Studio Apartment', icon: Building2, type: 'studio' },
  { id: 'builder', name: 'Builder Floor', icon: Building2, type: 'residential' },
  { id: 'farmhouse', name: 'Farmhouse', icon: Trees, type: 'residential' },
  { id: 'plot', name: 'Plot/Land', icon: Warehouse, type: 'commercial' },
  { id: 'commercial', name: 'Commercial Space', icon: Briefcase, type: 'commercial' },
  { id: 'office', name: 'Office Space', icon: Briefcase, type: 'commercial' },
  { id: 'shop', name: 'Shop/Retail', icon: Store, type: 'commercial' },
];

const CONFIGURATIONS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'];

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export function PropertyTypeSelector({ value, onChange }: Props) {
  const [propType, setPropType] = useState<typeof PROPERTY_TYPES[0] | null>(null);
  const [config, setConfig] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Flag to prevent the initial empty state from wiping out valid external data
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only set internal state from external value once or if internal is empty
    if (value && !isInitialized) {
      const matchedType = PROPERTY_TYPES.find(pt => value.includes(pt.name));
      if (matchedType) {
        setPropType(matchedType);
        const matchedConfig = CONFIGURATIONS.find(c => value.includes(c));
        if (matchedConfig) setConfig(matchedConfig);
      }
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isInitialized) return; // Don't wipe external state before initialization

    if (propType) {
      if (propType.type === 'commercial' || propType.type === 'studio') {
        onChange(propType.name);
      } else if (config) {
        onChange(`${config} ${propType.name}`);
      } else {
        onChange(propType.name);
      }
    } else {
      onChange('');
    }
  }, [propType, config, isInitialized]);

  const handleSelectType = (pt: typeof PROPERTY_TYPES[0]) => {
    setPropType(pt);
    if (pt.type === 'commercial') setConfig('');
    if (pt.type === 'studio') setConfig('');
    setIsOpen(false);
    if (!isInitialized) setIsInitialized(true);
  };

  return (
    <div className="flex flex-col gap-3 relative z-50">
      <label className="text-xs font-bold text-[#7A6A63] uppercase tracking-widest pl-1">Property & Type</label>
      
      {/* Type Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.99 }}
          className={`w-full flex items-center justify-between px-4 py-4 rounded-xl bg-[#FAF6F1] backdrop-blur-sm border ${isOpen ? 'border-[#B8695A] shadow-[0_0_15px_rgba(184,105,90,0.15)]' : 'border-[#D9CEC0]'} transition-all text-left group`}
        >
          {propType ? (
            <div className="flex items-center gap-3 text-[#2B2420]">
              <propType.icon className="w-5 h-5 text-[#B8695A]" />
              <span className="font-medium">{propType.name}</span>
            </div>
          ) : (
            <span className="text-[#7A6A63] font-medium">Select property type...</span>
          )}
          <ChevronDown className={`w-5 h-5 text-[#7A6A63] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#B8695A]' : 'group-hover:text-[#2B2420]'}`} />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-[#F3EDE5]/95 backdrop-blur-2xl border border-[#D9CEC0] rounded-xl shadow-[0_20px_40px_rgba(43,36,32,0.15)] overflow-hidden max-h-[300px] overflow-y-auto"
            >
              <div className="p-2 flex flex-col gap-1">
                {PROPERTY_TYPES.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => handleSelectType(pt)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left ${propType?.id === pt.id ? 'bg-[#B8695A]/10 text-[#B8695A]' : 'hover:bg-[#2B2420]/5 text-[#2B2420]'}`}
                  >
                    <pt.icon className={`w-4 h-4 ${propType?.id === pt.id ? 'text-[#B8695A]' : 'text-[#7A6A63]'}`} />
                    <span className="font-medium">{pt.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Configuration Segmented Control */}
      <AnimatePresence>
        {propType?.type === 'residential' && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 p-1.5 bg-[#FAF6F1] backdrop-blur-sm rounded-xl border border-[#D9CEC0]">
              {CONFIGURATIONS.map(c => (
                <button
                  key={c}
                  onClick={() => setConfig(c)}
                  className={`flex-1 min-w-[60px] py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    config === c 
                      ? 'bg-[#B8695A] text-[#FAF6F1] shadow-[0_0_15px_rgba(184,105,90,0.2)]' 
                      : 'text-[#7A6A63] hover:text-[#2B2420] hover:bg-[#2B2420]/5'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
