import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  value?: string;
  onChange: (dataUrl?: string) => void;
}

export function ImageUpload({ value, onChange }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col gap-3 relative z-20">
      <div className="flex justify-between items-end">
        <label className="text-xs font-bold text-[#7A6A63] uppercase tracking-widest pl-1">Property Photo (Optional)</label>
      </div>

      <AnimatePresence mode="wait">
        {value ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full h-32 rounded-xl overflow-hidden border border-[#D9CEC0] bg-[#FAF6F1] group"
          >
            <img src={value} alt="Property Upload" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => onChange(undefined)}
                className="bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm transition-colors flex items-center gap-2 px-4 text-sm font-medium"
              >
                <X className="w-4 h-4" /> Remove Photo
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => inputRef.current?.click()}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragging ? 'border-[#B8695A] bg-[#B8695A]/5' : 'border-[#D9CEC0] bg-[#FAF6F1]/50 hover:bg-[#FAF6F1]'
            }`}
          >
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/webp"
              className="hidden" 
              ref={inputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFile(e.target.files[0]);
                }
              }}
            />
            <div className={`p-3 rounded-full mb-2 ${isDragging ? 'bg-[#B8695A]/20 text-[#B8695A]' : 'bg-[#F3EDE5] text-[#7A6A63]'}`}>
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-[#2B2420]">Click or drag to upload</p>
            <p className="text-xs text-[#7A6A63] mt-1">JPG, PNG, WEBP</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
