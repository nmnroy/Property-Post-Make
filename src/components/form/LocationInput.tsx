import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Building, Map } from 'lucide-react';

const LOCATIONS = [
  { locality: 'Sushant Golf City', city: 'Lucknow', state: 'Uttar Pradesh' },
  { locality: 'Gomti Nagar', city: 'Lucknow', state: 'Uttar Pradesh' },
  { locality: 'Hazratganj', city: 'Lucknow', state: 'Uttar Pradesh' },
  { locality: 'Bandra West', city: 'Mumbai', state: 'Maharashtra' },
  { locality: 'Andheri East', city: 'Mumbai', state: 'Maharashtra' },
  { locality: 'Powai', city: 'Mumbai', state: 'Maharashtra' },
  { locality: 'Koramangala', city: 'Bengaluru', state: 'Karnataka' },
  { locality: 'Indiranagar', city: 'Bengaluru', state: 'Karnataka' },
  { locality: 'Whitefield', city: 'Bengaluru', state: 'Karnataka' },
  { locality: 'Connaught Place', city: 'New Delhi', state: 'Delhi' },
  { locality: 'Vasant Vihar', city: 'New Delhi', state: 'Delhi' },
  { locality: 'Hauz Khas', city: 'New Delhi', state: 'Delhi' },
  { locality: 'Salt Lake', city: 'Kolkata', state: 'West Bengal' },
  { locality: 'Banjara Hills', city: 'Hyderabad', state: 'Telangana' },
  { locality: 'Jubilee Hills', city: 'Hyderabad', state: 'Telangana' },
  { locality: 'Viman Nagar', city: 'Pune', state: 'Maharashtra' },
  { locality: 'Koregaon Park', city: 'Pune', state: 'Maharashtra' },
  { locality: 'Navrangpura', city: 'Ahmedabad', state: 'Gujarat' }
];

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export function LocationInput({ value, onChange }: Props) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  
  // The structured data
  const [selectedLocality, setSelectedLocality] = useState(LOCATIONS[0]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize from external value
  useEffect(() => {
    if (value && !isInitialized) {
      const match = LOCATIONS.find(loc => value.includes(loc.locality) || value.includes(loc.city));
      if (match) {
        setSelectedLocality(match);
        setQuery(`${match.locality}, ${match.city}`);
      } else {
        setQuery(value);
      }
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  // Sync out
  useEffect(() => {
    if (!isInitialized) return;
    if (selectedLocality && query.includes(selectedLocality.locality)) {
      onChange(`${selectedLocality.locality}, ${selectedLocality.city}`);
    } else {
      onChange(query);
    }
  }, [query, selectedLocality, isInitialized]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLocations = LOCATIONS.filter(loc => 
    loc.locality.toLowerCase().includes(query.toLowerCase()) || 
    loc.city.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const handleSelect = (loc: typeof LOCATIONS[0]) => {
    setSelectedLocality(loc);
    setQuery(`${loc.locality}, ${loc.city}`);
    setIsOpen(false);
    if (!isInitialized) setIsInitialized(true);
  };

  const detectLocation = () => {
    setIsDetecting(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setIsDetecting(false);
      return;
    }
    
    // Simulate delay for Geocoding API
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        () => {
          // Mock success mapping to a default city for demo
          handleSelect(LOCATIONS[3]); // Bandra West, Mumbai
          setIsDetecting(false);
        },
        () => {
          alert("Unable to retrieve your location. Please check browser permissions.");
          setIsDetecting(false);
        }
      );
    }, 1000);
  };

  const isFloating = focused || query.length > 0;

  return (
    <div className="flex flex-col gap-3 relative z-40" ref={dropdownRef}>
      
      <div className="relative group w-full">
        <motion.label 
          initial={false}
          animate={{
            y: isFloating ? -28 : 16,
            scale: isFloating ? 0.85 : 1,
            color: focused ? '#B8695A' : (query.length > 0 ? '#7A6A63' : '#A39994'),
            x: isFloating ? 4 : 16
          }}
          transition={{ duration: 0.2, type: "tween", ease: "easeOut" }}
          className="absolute origin-left pointer-events-none font-medium z-10 uppercase tracking-widest"
        >
          Search Location
        </motion.label>
        
        <motion.div
          animate={{
            scale: focused ? 1.02 : 1,
            boxShadow: focused ? '0 0 0 1px #B8695A, 0 0 20px rgba(184,105,90,0.15)' : '0 0 0 1px #D9CEC0, 0 0 0 rgba(184,105,90,0)'
          }}
          transition={{ duration: 0.2 }}
          className="relative rounded-xl overflow-hidden bg-[#FAF6F1] backdrop-blur-sm mt-3 flex items-center"
        >
          <MapPin className={`w-5 h-5 ml-4 ${focused ? 'text-[#B8695A]' : 'text-[#7A6A63]'}`} />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              if (!isInitialized) setIsInitialized(true);
            }}
            onFocus={() => {
              setFocused(true);
              if (query.length > 0) setIsOpen(true);
            }}
            onBlur={() => setFocused(false)}
            placeholder={focused ? "Area, locality, or city..." : ''}
            className="w-full px-3 py-4 bg-transparent border-none focus:outline-none focus:ring-0 text-[#2B2420] placeholder:text-[#A39994] transition-colors"
          />
          <button 
            onClick={detectLocation}
            disabled={isDetecting}
            className="pr-4 pl-2 h-full flex items-center text-[#B8695A] hover:text-[#2B2420] transition-colors disabled:opacity-50"
            title="Detect my location"
          >
            <Navigation className={`w-5 h-5 ${isDetecting ? 'animate-pulse' : ''}`} />
          </button>
        </motion.div>

        {/* Autocomplete Dropdown */}
        <AnimatePresence>
          {isOpen && filteredLocations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-[#F3EDE5]/95 backdrop-blur-2xl border border-[#D9CEC0] rounded-xl shadow-[0_20px_40px_rgba(43,36,32,0.15)] overflow-hidden z-50"
            >
              <div className="p-2 flex flex-col gap-1">
                {filteredLocations.map((loc, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(loc)}
                    className="w-full flex flex-col gap-0.5 px-4 py-2.5 rounded-lg hover:bg-[#2B2420]/5 transition-colors text-left"
                  >
                    <span className="font-medium text-[#2B2420]">{loc.locality}</span>
                    <span className="text-xs text-[#7A6A63]">{loc.city}, {loc.state}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Readonly City & State Fields */}
      <div className="flex gap-4 mt-2">
        <div className="flex-1 bg-[#F3EDE5]/60 border border-[#D9CEC0] rounded-xl p-3 flex items-center gap-3">
          <Building className="w-5 h-5 text-[#A39994]" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-[#7A6A63] font-bold">City</span>
            <span className="text-sm font-medium text-[#2B2420]">{selectedLocality?.city || '—'}</span>
          </div>
        </div>
        <div className="flex-1 bg-[#F3EDE5]/60 border border-[#D9CEC0] rounded-xl p-3 flex items-center gap-3">
          <Map className="w-5 h-5 text-[#A39994]" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-[#7A6A63] font-bold">State</span>
            <span className="text-sm font-medium text-[#2B2420]">{selectedLocality?.state || '—'}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
