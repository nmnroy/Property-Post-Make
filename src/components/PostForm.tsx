import { motion } from 'framer-motion';
import { PropertyTypeSelector } from './form/PropertyTypeSelector';
import { LocationInput } from './form/LocationInput';
import { PriceSlider } from './form/PriceSlider';
import { HighlightsSelector } from './form/HighlightsSelector';
import { ImageUpload } from './form/ImageUpload';

export type TemplateType = 'onyx' | 'ivory' | 'sunset';

export interface PostData {
  template: TemplateType;
  propertyType: string;
  location: string;
  price: string;
  highlights: string[];
  photoDataUrl?: string;
}

interface PostFormProps {
  data: PostData;
  onChange: (data: PostData) => void;
}

const TEMPLATES: { id: TemplateType; name: string }[] = [
  { id: 'onyx', name: 'Onyx Luxury' },
  { id: 'ivory', name: 'Ivory Minimal' },
  { id: 'sunset', name: 'Sunset Bold' },
];

const computeDefaultPrice = (propStr: string): string => {
  if (!propStr) return '₹50 Lakh onwards';
  const lower = propStr.toLowerCase();
  
  const isVilla = lower.includes('villa') || lower.includes('independent') || lower.includes('penthouse') || lower.includes('farmhouse');
  const isCommercial = lower.includes('plot') || lower.includes('land') || lower.includes('commercial') || lower.includes('office') || lower.includes('shop') || lower.includes('retail');
  
  if (isCommercial) {
    return '₹1.2 Cr onwards';
  }

  let baseLakhs = 50;
  if (lower.includes('studio') || lower.includes('1 bhk')) {
    baseLakhs = 40;
  } else if (lower.includes('2 bhk')) {
    baseLakhs = 80;
  } else if (lower.includes('3 bhk')) {
    baseLakhs = 150;
  } else if (lower.includes('4 bhk')) {
    baseLakhs = 250;
  } else if (lower.includes('5+ bhk')) {
    baseLakhs = 450;
  }

  if (isVilla) {
    baseLakhs = Math.floor(baseLakhs * 1.6); // slight bump for premium types
  }

  if (baseLakhs < 100) {
    return `₹${Math.round(baseLakhs)} Lakh onwards`;
  } else {
    return `₹${Number((baseLakhs / 100).toFixed(2)).toString()} Cr onwards`;
  }
};

export function PostForm({ data, onChange }: PostFormProps) {
  
  const handleFieldChange = (field: keyof PostData, value: string | string[]) => {
    const newData = { ...data, [field]: value };
    if (field === 'propertyType' && typeof value === 'string') {
      newData.price = computeDefaultPrice(value);
    }
    onChange(newData);
  };

  return (
    <div className="bg-[#F3EDE5] p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgba(184,105,90,0.06)] border border-[#D9CEC0] flex flex-col gap-10 relative z-10">
      
      {/* Template Selector */}
      <div className="relative z-10">
        <h3 className="text-xs font-bold text-[#7A6A63] mb-4 uppercase tracking-widest">Select Design Template</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TEMPLATES.map((tmpl) => (
            <motion.button
              key={tmpl.id}
              onClick={() => onChange({ ...data, template: tmpl.id })}
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 25px rgba(184,105,90,0.1)' }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-4 rounded-xl font-medium text-sm transition-colors ${data.template !== tmpl.id ? 'bg-[#FAF6F1] border border-[#D9CEC0] text-[#7A6A63]' : 'text-[#B8695A]'}`}
            >
              {data.template === tmpl.id && (
                <motion.div 
                  layoutId="activeTemplate"
                  className="absolute inset-0 bg-[#B8695A]/10 border border-[#B8695A] rounded-xl shadow-[0_0_15px_rgba(184,105,90,0.2)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tmpl.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input Fields Container */}
      <div className="flex flex-col gap-8 relative z-50">
        <PropertyTypeSelector 
          value={data.propertyType} 
          onChange={(val) => handleFieldChange('propertyType', val)} 
        />
        
        <LocationInput 
          value={data.location} 
          onChange={(val) => handleFieldChange('location', val)} 
        />
        
        <PriceSlider 
          value={data.price} 
          onChange={(val) => handleFieldChange('price', val)} 
        />
        
        <HighlightsSelector 
          value={data.highlights} 
          context={data}
          onChange={(val) => handleFieldChange('highlights', val)} 
        />
        
        <ImageUpload 
          value={data.photoDataUrl}
          onChange={(val) => handleFieldChange('photoDataUrl', val as string)}
        />
      </div>
      
    </div>
  );
}
